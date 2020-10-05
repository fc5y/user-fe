import React from 'react';

// APIs
import { apiLogin } from '../../../api/authentication';

// HOC
import { withRouter } from 'react-router-dom';
import withUserNotLogin from '../../../shared/hoc/withUserNotLogin';

// Component
import PopupFailed from './PopupFailed';
import InputText from '../../components/InputText';

// Constants
import { API_PROGRESS } from '../../../shared/constants';

import styles from './login.scss';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      showFalsePopup: false,
      apiProgress: API_PROGRESS.INIT,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup() {
    this.setState({ showFalsePopup: false });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;

    if (!username || !password) return;

    this.setState({ apiProgress: API_PROGRESS.REQ });

    if (__USE_BACKUP_API__) {
      const { data } = await apiLogin({ username, password });
      if (!data.data || !data.data.token) {
        this.setState({
          showFalsePopup: true,
          apiProgress: API_PROGRESS.FAILED,
        });
      } else {
        this.context.setUserInfo({ ...this.context.userInfo, token: data.data.token });
        // eslint-disable-next-line react/prop-types
        this.props.history.push('/');
      }
    } else {
      const { data } = await apiLogin({ username, password });
      if (!data || !data.token) {
        this.setState({
          showFalsePopup: true,
          apiProgress: API_PROGRESS.FAILED,
        });
      } else {
        this.context.setUserInfo({ ...this.context.userInfo, token: data.token });
        // eslint-disable-next-line react/prop-types
        this.props.history.push('/');
      }
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form onSubmit={this.handleSubmit}>
            <h5 className={styles.titleContent}>Đăng nhập:</h5>
            <InputText
              label="Tên đăng nhập"
              divStyle={styles.username}
              labelStyle={styles.usernameLabel}
              inputStyle={styles.usernameInput}
              type="text"
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
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <button
              className={styles.loginBtn}
              type="submit"
              disabled={this.state.apiProgress === API_PROGRESS.REQ}
            >
              Đăng nhập
            </button>
          </form>
        </div>
        {this.state.showFalsePopup && (
          <>
            <div className={styles.overlay} />
            <PopupFailed closePopup={this.closePopup} />
          </>
        )}
      </div>
    );
  }
}

export default withUserNotLogin(withRouter(LoginPage));
