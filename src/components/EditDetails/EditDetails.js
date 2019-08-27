import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';

class EditDetails extends Component {

  // declare state to send as dispatch 
  state = {
      movieDetails: {
      movie_id: this.props.reduxStore.movieDescription.movie_id,
      title: this.props.reduxStore.movieDescription.title,
      description: this.props.reduxStore.movieDescription.description,
    }
  }

  // capture input values in:
  //    -- input field (edit title)
  //    -- textarea (edit description)
  // set state to capture values 
  handleChange = (propertyName, event) => {
    this.setState({
      movieDetails: {
        ...this.state.movieDetails,
        movie_id: this.props.reduxStore.movieDescription.movie_id,
        [propertyName]: event.target.value
      } 
    })
  }

  // on click of save button:
  //    -- send state with new values as dispatch
  //    -- alert user details have been edited successfully
  //    -- send user back to home page ('/')
  saveDetails = (event) => {
    event.preventDefault();
    console.log(this.state.movieDetails)
    this.props.dispatch({type: 'EDIT_DETAILS', payload: this.state.movieDetails})
    alert('Success Editing Movie Details!');
    this.props.history.push('/');
  }

  // on click of cancel, send user back to details page ('/details')
  cancelEdit = () => {
    this.props.history.push('/details');
  }

  // on click of back to movie list, send user back to home page ('/')
  homePage = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <>
      <h1 className="App-header">Edit Details: {this.props.reduxStore.movieDescription.title}</h1>
        <div className="movieDetails">
          <form onSubmit={this.saveDetails}>
            <button onClick={this.homePage}>Back to Movie List</button>
            <button onClick={this.cancelEdit}>Cancel</button>
            <button>Save</button>
            <br/>
            <input
            type="text"
            // value={this.state.movieDetails.title}
            placeholder="Edit Movie Title"
            onChange={(event) => this.handleChange('title', event)} 
            />
            <br/>
            <textarea
            // value={this.state.movieDetails.description} 
            type="text" placeholder="Edit Movie Description" 
            onChange={(event) => this.handleChange('description', event)} 
            />
        </form>
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
export default connect(mapStateToProps) (EditDetails);