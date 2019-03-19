import React, { Component } from 'react';
import { container } from './styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/lobby').then(({ data }) => {
      this.setState({
        rooms: data.data,
      });
    });
  }

  render() {
    return (
      <div className={container}>
        {this.state.rooms.length > 0
          ? this.state.rooms.map(room => {
              return (
                <div>
                  <Link to={'/video/' + room._id}>{room.roomname}</Link>
                </div>
              );
            })
          : ''}
      </div>
    );
  }
}

export default Home;
