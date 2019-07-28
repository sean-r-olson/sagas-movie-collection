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
        <h1 className="App-header">Movies</h1>
        <div>
        {this.props.reduxStore.movies.map(item => {
          return (
                 <div onClick={(event) => this.routeToDetails(item)} className="movies" key={item.id}> 
                 <img src={item.poster} alt="movies"/>
                 <h3>{item.title}</h3>
                 <h4> Description: </h4>
                 <p className="description">{item.description}</p>
                 </div>
          )})}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps) (MovieList);