import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';


class MovieDetails extends Component {

  render() {
    return (
      <div>
         <h1 className="App-header">Movie Details</h1>
      </div>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps) (MovieDetails);