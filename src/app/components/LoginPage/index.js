import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Failed from './Failed';
import styles from './login.scss';
import Header from '../NavBar/Header';

let userInfo = [];
let isRedirect = 0;

const HandleRedirect = () => {
  if (isRedirect === 1) {
    isRedirect = 0;
    return <Redirect to="/" />;
  }
  if (isRedirect === 2) {
    isRedirect = 0;
    return <Failed />;
  }
  return '';
};

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      userPassword: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const json = localStorage.getItem('users');
    if (json !== null) {
      let user;
      if (localStorage.users) {
        user = JSON.parse(json);
      }
      if (user) {
        userInfo = user;
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, userPassword } = this.state;
    const name = String(username);
    const pass = String(userPassword);
    if (name !== userInfo.username[0] || pass !== userInfo.userPassword[0]) {
      isRedirect = 2;
    } else {
      isRedirect = 1;
    }
    this.forceUpdate();
  }

  handleChange(event) {
    const name = [event.target.name];
    const value = [event.target.value];
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <Header username="" />
        <div className={isRedirect === 2 ? styles.popup : ''} />
        <div className={styles.login}>
          <form onSubmit={this.handleSubmit}>
            <h5>Đăng nhập:</h5>
            <div className={styles.username}>
              <small>Tên đăng nhập</small> <br />
              <input type="text" name="username" onChange={this.handleChange} />
            </div>
            <div className={styles.password}>
              <small>Mật khẩu</small> <br />
              <input type="password" name="userPassword" onChange={this.handleChange} />
            </div>
            <button type="submit">Đăng nhập</button>
          </form>
        </div>
        <HandleRedirect />
      </div>
    );
  }
}

export default LoginPage;
