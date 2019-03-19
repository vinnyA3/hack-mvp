import React, { Component, Fragment } from 'react';
import {
  container,
  main,
  sidebar,
  chatWindow,
  settings,
  messages,
  message,
  message__text,
  message__avatar,
} from './styles';

import axios from 'axios';
import CredentialModal from './components/credentialModal';
import Tooltip from 'components/tooltip';

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
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.setUsername = this.setUsername.bind(this);
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
    // axios request to the server to post the message in the chag...
    // format as such
    // message: user_message, lobby name, username

    if (!this.state.user) {
      // if the user does not exist, dont' post and tell user to signup!!
      // using reusable modal class, create a modal for user to login / signup
      this.setState({ showModal: true });
      return;
    }

    axios
      .post('http://localhost:3000/lobby', {
        roomname: this.state.roomname || 'main',
        message: {
          username: this.state.user || 'pocky',
          text: this.state.user_message,
        },
      })
      .then(({ data }) => {
        // for MVP, update the chat messages to show the newest message
        this.setState({
          chat_messages: data.chat_messages,
        });

        console.log(data);
      });
  }

  handleInputChange(e) {
    this.setState({
      user_message: e.target.value,
    });
  }

  componentDidMount() {
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
          <h3>Hello World!!</h3>
        </main>
        <aside className={sidebar}>
          <div className={chatWindow} ref={this.myRef}>
            <div className={settings}>
              <div>
                {!this.state.user ? (
                  <a onClick={this.toggleTooltip}>
                    <i className="fa fa-user" />
                  </a>
                ) : (
                  <span>
                    <i className="fa fa-user" /> <span>{this.state.user}</span>
                  </span>
                )}
                <i className="fa fa-cog" />
              </div>
            </div>
            <div className={messages}>
              {this.state.chat_messages.length > 0
                ? renderChat(this.state.chat_messages)
                : ''}
            </div>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Message..."
                onChange={this.handleInputChange}
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
