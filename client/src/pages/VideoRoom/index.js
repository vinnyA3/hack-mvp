import React, { Component, Fragment } from 'react';
import {
  container,
  main,
  sidebar,
  chatWindow,
  message,
  message__text,
  message__avatar,
} from './styles';
import axios from 'axios';

const defaultRoom = 'main';

const renderChat = chat_messages =>
  chat_messages.map(({ _id, username, text }) => (
    <div key={_id || 'asdfa'} className={message}>
      <div className={message__avatar} />
      <section className={message__text}>
        <h3>{username}</h3>
        <p>{text}</p>
      </section>
    </div>
  ));

class VideoRoom extends Component {
  constructor() {
    super();
    this.state = {
      roomname: null,
      video_url: null,
      chat_messages: [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/lobby/${defaultRoom}`).then(({ data }) => {
      const { roomname, chat_messages } = data[0];
      this.setState({
        roomname,
        chat_messages,
      });
    });
  }

  render() {
    return (
      <Fragment>
        <main className={main}>
          <h3>Hello World!!</h3>
        </main>
        <aside className={sidebar}>
          <div className={chatWindow}>
            {this.state.chat_messages.length > 0
              ? renderChat(this.state.chat_messages)
              : ''}
          </div>
        </aside>
      </Fragment>
    );
  }
}

export default VideoRoom;
