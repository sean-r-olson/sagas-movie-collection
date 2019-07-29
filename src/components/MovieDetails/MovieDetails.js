import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';


class MovieDetails extends Component {

  // on click of back to movie list, send user back to home page ('/')
  homePage = () => {
    this.props.history.push('/');
  }

  // on click of edit details, send user to edit page ('/edit') 
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
        <hr/>
        <p>{this.props.reduxStore.movieDescription.description}</p>
        <hr/>
        <h5>Genre: {this.props.reduxStore.movieDescription.name}</h5>
        
      </div>
      </>
    )
  }
}

// declare mapStateToProps to access reducers
const mapStateToProps = (reduxStore) => ({
    reduxStore
})

// connect to reducers with mapStateToProps, export comp to be used in other comps
export default connect(mapStateToProps) (MovieDetails);