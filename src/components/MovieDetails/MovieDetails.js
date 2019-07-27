import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';


class MovieDetails extends Component {

  render() {
    console.log(this.props.reduxStore.movieDescription)
    return (
      <div>
        <h3>{this.props.reduxStore.movieDescription.title}</h3>
        <p>{this.props.reduxStore.movieDescription.description}</p>
        <p>{this.props.reduxStore.movieDescription.name}</p>
      </div>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps) (MovieDetails);