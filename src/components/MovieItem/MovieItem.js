import React, {Component} from 'react';
import '../App/App.css';
 
class MovieItem extends Component {

    handleClick = () => {
        console.log('clicked movie', this.props.item.id); 
    }

  render() {
      console.log(this.props.item);
        let item = this.props.item;
        return (
          <span onClick={this.handleClick} className="movies" key={item.id}> 
            <img src={item.poster} alt="movies"/>
            <h3>{item.title}</h3>
            <p className="description">{item.description}</p>
          </span>
        );
  }
}

export default MovieItem;