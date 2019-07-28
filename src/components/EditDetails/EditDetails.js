import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';

class EditDetails extends Component {

  state = {
      movieDetails: {
      movie_id: this.props.reduxStore.movieDescription.movie_id,
      title: this.props.reduxStore.movieDescription.title,
      description: this.props.reduxStore.movieDescription.description,
    }
  }

  handleChange = (propertyName, event) => {
    this.setState({
      movieDetails: {
        ...this.state.movieDetails,
        movie_id: this.props.reduxStore.movieDescription.movie_id,
        [propertyName]: event.target.value
      }
    })
  }

  saveDetails = (event) => {
    event.preventDefault();
    console.log(this.state.movieDetails)
    this.props.dispatch({type: 'EDIT_DETAILS', payload: this.state.movieDetails})
    alert('Success Editing Movie Details!');
    this.props.history.push('/');
  }

  cancelEdit = () => {
    this.props.history.push('/details');
  }

  homePage = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <>
      <h1 className="App-header">Edit Details {this.props.reduxStore.movieDescription.title}</h1>
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

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps) (EditDetails);