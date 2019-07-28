import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';


class EditDetails extends Component {

  

  render() {
    return (
      <div>
         <h1 className="App-header">Edit Details</h1>
         <button onClick={this.cancel}>Cancel</button>
         <button onClick={this.save}>Save</button>
         <form>
           <input type="text" placeholder="Edit Movie Title"></input>
           <br/>
           <textarea type="text" placeholder="Edit Movie Description"></textarea>
         </form>
      </div>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps) (EditDetails);