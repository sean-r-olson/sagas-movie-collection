import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  movies: {
    // padding: '10px',
    // // margin: '5px',
    // border: 'solid #222 2px',
    // backgroundColor: 'rgb(236, 229, 214)',
    // display: 'inline-block',
    // boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
  },
  image: {
    // padding: '10px',
    // height: '330px',
    // width: '220px',
  }
})

class MovieList extends Component {
    
    // run a dispatch to index.js to fetch movies from db (to render to DOM)
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_MOVIES' })
    }

    // on click of div
    //    -- send dispatch with clicked item as payload
    //    -- route to /details 
    routeToDetails = (item) => {
      console.log('in route To DETAILS', item)
       this.props.dispatch({ type: 'FETCH_DETAILS', payload: item})
        this.props.history.push('/details'); 
    }

  render() {
    const {classes} = this.props;
    return (
      <>
        <h1 className="App-header">Movie List</h1>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            
           {this.props.reduxStore.movies.map(item => {
          return (
                <Grid item xs={4} className="movies"
                    // className="container-fluid" 
                    onClick={(event) => this.routeToDetails(item)} key={item.id}>
                        <img src={item.poster} alt="movies" className="hvr-grow"/>
                        {/* <p >{item.description}</p> */}
                </Grid>
          )})}
          </Grid>
          </Grid>
        </>
    )
  }
}

// declare mapStateToProps to access reducers
const mapStateToProps = (reduxStore) => ({
    reduxStore
})

// connect to reducers with mapStateToProps, export comp to be used in other comps
export default withStyles(styles)(connect(mapStateToProps)(MovieList));
