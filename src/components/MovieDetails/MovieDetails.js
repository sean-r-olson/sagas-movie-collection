import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';


class MovieDetails extends Component {

  homePage = () => {
    this.props.history.push('/');
  }

  editDetails = () => {
    this.props.history.push('/edit');
  }

  render() {
    console.log(this.props.reduxStore.movieDescription)
    return (
      <>
        <h1 className="App-header">Movie Details</h1>
     <div className="movieDetails">
        <button onClick={this.homePage}>Back to Movie List</button>
        <button onClick={this.editDetails}>Edit Details</button>
        <h3>{this.props.reduxStore.movieDescription.title}</h3>
        <p>{this.props.reduxStore.movieDescription.description}</p>
        <p>{this.props.reduxStore.movieDescription.name}</p>
      </div>
      </>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps) (MovieDetails);