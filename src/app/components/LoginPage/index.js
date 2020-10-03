import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PopupFailed from './PopupFailed';
import styles from './login.scss';
import Header from '../NavBar/Header';
import PropTypes from 'prop-types';

function InputText(props) {
  const { label, type, id, name, value, hasError, errorMessage, onChange } = props;
  return (
    <div>
      <label className={styles.formLabel} htmlFor={id}>
        {label}
      </label>
      <input type={type} name={name} value={value} id={id} onChange={onChange} />
      <div className={styles.errorMessage}>{hasError ? errorMessage : ''}</div>
    </div>
  );
}

InputText.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

InputText.defaultProps = {
  label: '',
  type: '',
  id: '',
  name: '',
  value: '',
  hasError: false,
  errorMessage: '',
  onChange: null,
};

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
    const { linkTo, isPopup, username, password } = this.state;
    return (
      <div>
        <Header username="" />
        <div className={styles.login}>
          <form onSubmit={this.handleSubmit}>
            <h5 className={styles.titleContent}>Đăng nhập:</h5>

            <InputText
              id="username-input"
              label="Tên đăng nhập"
              type="text"
              name="username"
              value={username}
              hasError={false}
              errorMessage="Bắt buộc"
              onChange={this.handleChange}
            />

            <InputText
              id="password-input"
              label="Mật khẩu"
              type="password"
              name="password"
              value={password}
              hasError={false}
              errorMessage="Bắt buộc"
              onChange={this.handleChange}
            />
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
