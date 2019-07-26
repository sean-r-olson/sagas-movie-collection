import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';


class MovieList extends Component {

  render() {
    return (
      <div>
         <h1>Movies</h1>
      </div>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps) (MovieList);