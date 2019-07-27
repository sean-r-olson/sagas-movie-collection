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
}

function* fetchDetails(action) {
    try {
        // Save the resonse from the server in a variable
        const response = yield Axios.get(`/movies/${action.payload.id}`);
        // Then we can pass the response data to the reducer
        yield put ({type: 'SET_DETAILS', payload: response.data});
        console.log(response.data);
    } catch (error) {
        console.log('Error getting movies', error);
        alert('Could not get movie details at this time. Try again later');
    }
}

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

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}

const movieDescription = (state = {}, action) => {
    if ('SET_DETAILS' === action.type) {
        return action.payload;
    }
    return state;
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
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
