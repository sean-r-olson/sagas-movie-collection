import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';


class EditDetails extends Component {

  render() {
    return (
      <div>
         <h1 className="App-header">Edit Details</h1>
      </div>
    )
  }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps) (EditDetails);