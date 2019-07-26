import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';

class MovieList extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_MOVIES' })
    }

  render() {
      console.log(this.props.reduxStore.movies);
    return (
      <div>
         <h1 className="App-header">Movies</h1>
             {this.props.reduxStore.movies.map(item => (
                 <div className="movies" key={item.id}> 
                 <img src={item.poster} alt="movies"/>
                 <br/>
                 <h3>{item.title}</h3>
                 <h4> Description: </h4>
                 <p className="description">{item.description}</p>
                 </div>
             ))}
      </div>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps) (MovieList);