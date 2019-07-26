import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';


// import components
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import EditDetails from '../EditDetails/EditDetails';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
            <Route path = '/' component = {MovieList} />
            <Route path = '/details' component = {MovieDetails} />
            <Route path = '/edit' component = {EditDetails} />
        </Router>
      </div>
    );
  }
}

export default connect() (App);
