import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import {takeEvery, put} from 'redux-saga/effects';
import Axios from 'axios';
import createSagaMiddleware from 'redux-saga';

// ---------------------------------------------------SAGAS-------------------------------------------------------

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchMovies);
    yield takeEvery('FETCH_DETAILS', fetchDetails);
    yield takeEvery('EDIT_DETAILS', editDetails);
}

// send axios get to server to get movies from db 
// send response (array of movies) to SET_MOVIES reducer to be stored in redux store 
function* fetchMovies() {
    try {
        // Save the resonse from the server in a variable
        const response = yield Axios.get('/movies');
        // Then we can pass the response data to the reducer
        yield put ({type: 'SET_MOVIES', payload: response.data});
        console.log(response.data);
    } catch (error) {
        console.log('Error getting movies', error);
        alert('Could not get data at this time. Try again later');
    }
}

// send axios get to server
//      -- with targeted id
// send response (object with details of selected movie) to SET_DETAILS reducer to be stored in redusStore
function* fetchDetails(action) {
    try {
        const response = yield Axios.get(`/movies/${action.payload.id}`);
        yield put ({type: 'SET_DETAILS', payload: response.data});
        console.log(response.data);
    } catch (error) {
        console.log('Error getting movies', error);
        alert('Could not get movie details at this time. Try again later');
    }
}

// send axios put to server
//      -- with targeted id of selected movie 
//      -- & object to be updated
// run fetch movies again to receive updated movie list
function* editDetails(action) {
    try {
        yield Axios.put(`movies/update/${action.payload.movie_id}`, action.payload);
        yield put ({type: 'FETCH_MOVIES'});
    } catch (error) {
        console.log('error updating movie details', error);
        alert('Could not update movie details at this time');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//  ---------------------------------------------------REDUCERS-------------------------------------------------------

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store movie id, name(genre), title, description
const movieDescription = (state = {}, action) => {
    if ('SET_DETAILS' === action.type) {
        return action.payload;
    }
    return state;
}

// ------- stored genre with movie details reducer ---------
//
// // Used to store the movie genres
// const genres = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_TAGS':
//             return action.payload;
//         default:
//             return state;
//     }
// }

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        movieDescription
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
