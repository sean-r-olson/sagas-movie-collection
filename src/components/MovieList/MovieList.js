import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';

class MovieList extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_MOVIES' })
    }

    routeToDetails = (item) => {
      console.log('in route To DETAILS', item)
       this.props.dispatch({ type: 'FETCH_DETAILS', payload: item})
        this.props.history.push('/details'); 
    }

  render() {
    return (
      <div>
        <h1 className="App-header">Movie List</h1>
        <table>
        <tbody>
        {this.props.reduxStore.movies.map(item => {
          return (
                <tr onClick={(event) => this.routeToDetails(item)} className="movies" key={item.id}>
                  <td><img className="moviePoster" src={item.poster} alt="movies"/></td>
                  <br/>
                  <td><p className="description">{item.description}</p></td>
                </tr>
          )})}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps) (MovieList);