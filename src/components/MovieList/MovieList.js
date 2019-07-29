import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';

class MovieList extends Component {
    
    // run a dispatch to index.js to fetch movies from db (to render to DOM)
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_MOVIES' })
    }

    // on click of div
    //    -- send dispatch with clicked item as payload
    //    -- route to /details 
    routeToDetails = (item) => {
      console.log('in route To DETAILS', item)
       this.props.dispatch({ type: 'FETCH_DETAILS', payload: item})
        this.props.history.push('/details'); 
    }

  render() {
    return (
      <div className="movieList">
        <h1 className="App-header">Movie List</h1>
        <table>
        <tbody>
        {this.props.reduxStore.movies.map(item => {
          return (
                <tr onClick={(event) => this.routeToDetails(item)} className="movies" key={item.id}>
                  <td><img className="moviePoster" src={item.poster} alt="movies"/></td>
                  <hr/>
                  <td><p className="description">{item.description}</p></td>
                </tr>
          )})}
          </tbody>
        </table>
      </div>
    )
  }
}

// declare mapStateToProps to access reducers
const mapStateToProps = (reduxStore) => ({
    reduxStore
})

// connect to reducers with mapStateToProps, export comp to be used in other comps
export default connect(mapStateToProps) (MovieList);