import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PopupFailed from './PopupFailed';
import styles from './login.scss';
import Header from '../NavBar/Header';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      userPassword: '',
      linkTo: '',
      isPopup: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup(newLink) {
    this.setState({
      linkTo: newLink,
      isPopup: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let userInfo = [];
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

    const { username, userPassword } = this.state;
    console.log(userInfo.username);
    console.log(userInfo.userPassword);
    console.log(username);
    console.log(userPassword);
    if (username !== userInfo.username || userPassword !== userInfo.userPassword) {
      this.setState({
        linkTo: <PopupFailed closePopup={this.closePopup} />,
        isPopup: true,
      });
    } else {
      this.setState({
        linkTo: <Redirect to="/" />,
      });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { linkTo, isPopup } = this.state;
    return (
      <div>
        <Header username="" />
        <div className={styles.login}>
          <form onSubmit={this.handleSubmit}>
            <h5 className={styles.titleContent}>Đăng nhập:</h5>
            <div className={styles.username}>
              <small className={styles.usernameSmall}>Tên đăng nhập</small> <br />
              <input
                className={styles.usernameInput}
                type="text"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.password}>
              <small className={styles.passwordSmall}>Mật khẩu</small> <br />
              <input
                className={styles.passwordInp}
                type="password"
                name="userPassword"
                onChange={this.handleChange}
              />
            </div>
            <button className={styles.loginBtn} type="submit">
              Đăng nhập
            </button>
          </form>
        </div>
        <div className={isPopup ? styles.overlay : ''} />
        {linkTo}
      </div>
    );
  }
}

export default LoginPage;
