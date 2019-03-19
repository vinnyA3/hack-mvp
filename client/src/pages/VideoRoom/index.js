import React, { Component } from 'react';
import { container } from './styles';

const VideoRoom = () => (
  <div className={container}>
    <h1>Hello from VideoRoom!!</h1>
  </div>
);

const renderChat = ({ chat_messages }) => {
  return chat_messages.map(({ username, text }) => {
    return (
      <div>
        <span>{username}</span>
        <p>{text}</p>
      </div>
    );
  });
};

class VideoRoom extends Component {
  constructor() {
    super();
    this.state = {
      video_url: null,
      chat_messages: [],
    };
  }

  render() {
    return (
      <Fragment>
        {this.state.chat_messages.length > 0
          ? renderChat(this.state.chat_messages)
          : ''}
      </Fragment>
    );
  }
}

export default VideoRoom;
