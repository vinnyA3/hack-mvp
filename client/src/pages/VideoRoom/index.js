import React, { Component, Fragment } from 'react';
import {
  container,
  main,
  sidebar,
  chatWindow,
  settings,
  option,
  messages,
  message,
  message__text,
  message__avatar,
} from './styles';

import axios from 'axios';
import CredentialModal from './components/credentialModal';
import Tooltip from 'components/tooltip';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
const defaultRoom = 'main';

const renderChat = chat_messages =>
  chat_messages.map(({ _id, username, text }) => (
    <div key={_id} className={message}>
      <div className={message__avatar} />
      <section className={message__text}>
        <h3>{username}</h3>
        <p>{text}</p>
      </section>
    </div>
  ));

class VideoRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: null,
      video_url: null,
      user: null,
      user_message: '',
      chat_messages: [],
      showModal: false,
      showTooltip: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.myRef = this.myRef || React.createRef();
    this.secondRef = this.secondRef || React.createRef();
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.handleChat = this.handleChat.bind(this);
  }

  toggleTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip });
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  setUsername(e) {
    e.preventDefault();

    if (this.state.user) {
      return;
    }

    const username = e.target.username.value;

    this.setState({
      user: username,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (!this.state.user) {
      this.setState({ showModal: true });
      return;
    }

    if (this.state.user_message === '') {
      return;
    }

    // emit event
    socket.emit('chat message', {
      username: this.state.user,
      text: this.state.user_message,
    });

    axios
      .post('http://localhost:3000/lobby', {
        roomname: this.state.roomname || 'main',
        message: {
          username: this.state.user || 'pocky',
          text: this.state.user_message,
        },
      })
      .then(({ data }) => {
        this.setState({
          user_message: '',
        });

        this.secondRef.scrollTop = this.secondRef.scrollHeight;
      });
  }

  handleInputChange(e) {
    this.setState({
      user_message: e.target.value,
    });
  }

  handleChat(data) {
    this.setState(prevState => {
      return {
        chat_messages: (prevState.chat_messages.push(data),
        prevState.chat_messages),
      };
    });
  }

  componentDidMount() {
    // connect to socket
    socket.on('chat message', this.handleChat);

    // get props
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
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${this.state.video_url}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          />
        </main>
        <aside className={sidebar}>
          <div className={chatWindow} ref={this.myRef}>
            <div className={settings}>
              <Fragment>
                {!this.state.user ? (
                  <div className={option}>
                    <a onClick={this.toggleTooltip}>
                      <i className="fa fa-user" />
                    </a>
                  </div>
                ) : (
                  <div className={option}>
                    <span>
                      <i className="fa fa-user" />{' '}
                      <span>{this.state.user}</span>
                    </span>
                  </div>
                )}
                <div className={option}>
                  <i className="fa fa-cog" />
                </div>
              </Fragment>
            </div>
            <div id="chat" className={messages}>
              {this.state.chat_messages.length > 0
                ? renderChat(this.state.chat_messages)
                : ''}
            </div>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Message..."
                name="text"
                onChange={this.handleInputChange}
                value={this.state.user_message}
              />
              <input type="submit" />
            </form>
          </div>
        </aside>

        {!this.state.user ? (
          <Tooltip
            open={this.state.showTooltip}
            onClose={this.toggleTooltip}
            myRef={this.myRef}
          >
            <h3>Create a username</h3>
            <form onSubmit={this.setUsername}>
              <input type="text" placeholder="Username" name="username" />
              <button>Login</button>
            </form>
          </Tooltip>
        ) : (
          ''
        )}
        <CredentialModal
          showModal={this.state.showModal}
          onClose={this.toggleModal}
        />
      </Fragment>
    );
  }
}

export default VideoRoom;
