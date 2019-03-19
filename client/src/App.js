import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from 'components/navigation';
import Home from 'pages/Home';
import VideoRoom from 'pages/VideoRoom';
import { container, main, sidebar, header, footer } from './app.scss';

const App = () => (
  <Router>
    <div className={container}>
      <header className={header}>
        <Navigation />
      </header>

      <Route path="/" exact component={Home} />
      <Route path="/video" component={VideoRoom} />

      <footer className={footer}>
        <h2>Hello there</h2>
      </footer>
    </div>
  </Router>
);

export default App;
