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
         <h1>Movies</h1>
             {this.props.reduxStore.movies.map(item => (
                 <div key={item.id}> 
                 <br/>
                 <img src={item.poster} alt="movies"/>
                 <br/>
                 <h3>{item.title}</h3>
                 {item.description}
                 <br/>
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