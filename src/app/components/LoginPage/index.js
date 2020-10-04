import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PopupFailed from './PopupFailed';
import styles from './login.scss';
import Header from '../NavBar/Header';
import PropTypes from 'prop-types';

function InputText(props) {
  const { label, divStyle, labelStyle, inputStyle, type, id, name, value, onChange } = props;
  return (
    <div className={divStyle}>
      <label className={labelStyle} htmlFor={id}>
        {label}
      </label>
      <input
        className={inputStyle}
        type={type}
        name={name}
        value={value}
        id={id}
        onChange={onChange}
      />
    </div>
  );
}

InputText.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  divStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  inputStyle: PropTypes.string,
};

InputText.defaultProps = {
  label: '',
  type: '',
  id: '',
  name: '',
  value: '',
  onChange: null,
  divStyle: '',
  labelStyle: '',
  inputStyle: '',
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
    const { linkTo, isPopup, username, userPassword } = this.state;
    return (
      <div>
        <Header username="" />
        <div className={styles.container}>
          <form onSubmit={this.handleSubmit}>
            <h5 className={styles.titleContent}>Đăng nhập:</h5>
            <InputText
              label="Tên đăng nhập"
              divStyle={styles.username}
              labelStyle={styles.usernameLabel}
              inputStyle={styles.usernameInput}
              type="text"
              id="input-id"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <InputText
              label="Mật khẩu"
              divStyle={styles.password}
              labelStyle={styles.passwordLabel}
              inputStyle={styles.passwordInp}
              type="password"
              id="password-id"
              name="userPassword"
              value={userPassword}
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
