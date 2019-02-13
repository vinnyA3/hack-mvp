import React, { Component } from 'react';
import axios from 'axios';
import styles from './styles.scss';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    };
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      // get geo location and set state
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        // make api request
        axios
          .get(`/api/location/?long=${longitude}&lat=${latitude}`)
          .then(({ data }) => {
            const loc = data.results.split(',');
            this.setState(currentState => ({
              location: loc[1] + loc[2],
            }));
          })
          .catch(err => console.error(err));
      });
    }
  }

  render() {
    return this.state.location ? (
      <div className={styles.location}>
        <a href="#">Deliver to {this.state.location}</a>
      </div>
    ) : (
      ''
    );
  }
}

export default Location;
