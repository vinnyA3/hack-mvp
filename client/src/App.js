import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from 'components/navigation';
import Home from 'pages/Home';
import VideoRoom from 'pages/VideoRoom';

const App = () => (
  <Router>
    <Navigation />
    <Fragment>
      <Route path="/" exact component={Home} />
      <Route path="/video" component={VideoRoom} />
    </Fragment>
  </Router>
);

export default App;
