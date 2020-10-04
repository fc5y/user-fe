import React, { Component } from 'react';

import checkImage from '../../../assets/images/vector 1.png';

import styles from './signup.scss';
import PopupSuccess from './PopupSuccess';
import PopupFailed from './PopupFailed';
import Header from '../NavBar/Header';
import InputText from '../InputText';

const testPassword = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$');
const testEmail = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$');

class SignupPage extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      username: '',
      email: '',
      userPassword: '',
      confirmUserPassword: '',
      address: '',
      school: '',
      participationForm: '0',
      isStudent: true,
      isAgreed: false,
      isMatchPassword: true,
      chkFullname: true,
      chkUsername: true,
      chkEmail: true,
      chkAddress: true,
      chkSchool: true,
      chkAgreed: true,
      isSuccess: 0,
      isPopup: false,
      chkPassword: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  handleChange(event) {
    const { name } = event.target;
    let { value } = event.target;
    if (name === 'isStudent') {
      value = Boolean(value === 'true');
    }
    this.setState({
      [name]: value,
    });
  }

  handleCheck() {
    const { isAgreed } = this.state;
    this.setState({
      isAgreed: !isAgreed,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      fullname,
      username,
      email,
      userPassword,
      confirmUserPassword,
      address,
      school,
      isAgreed,
    } = this.state;
    let {
      chkFullname,
      chkUsername,
      chkEmail,
      chkPassword,
      isMatchPassword,
      chkAddress,
      chkSchool,
      isSuccess,
      chkAgreed,
    } = this.state;
    chkFullname = fullname !== '' && fullname !== undefined;
    chkUsername = username !== '' && username !== undefined;
    chkEmail = testEmail.test(email);
    chkPassword = testPassword.test(userPassword);
    isMatchPassword = userPassword === confirmUserPassword;
    chkAddress = address !== '' && address !== undefined;
    chkSchool = school !== '' && school !== undefined;
    chkAgreed = isAgreed;
    isSuccess =
      chkFullname &&
      chkUsername &&
      chkEmail &&
      chkPassword &&
      isMatchPassword &&
      chkAddress &&
      chkSchool &&
      chkAgreed;
    this.setState({
      chkFullname,
      chkUsername,
      chkEmail,
      chkPassword,
      isMatchPassword,
      chkAddress,
      chkSchool,
      isSuccess,
      chkAgreed,
      isPopup: true,
    });
  }

  closePopup() {
    this.setState({
      isPopup: false,
    });
  }

  handlePopup() {
    const { isPopup, isSuccess } = this.state;
    if (isPopup) {
      if (isSuccess) {
        const {
          fullname,
          username,
          email,
          userPassword,
          confirmUserPassword,
          address,
          school,
          participationForm,
          isAgreed,
          isStudent,
        } = this.state;
        return (
          <PopupSuccess
            fullname={fullname}
            username={username}
            email={email}
            userPassword={userPassword}
            confirmUserPassword={confirmUserPassword}
            address={address}
            school={school}
            participationForm={participationForm}
            isAgreed={isAgreed}
            isStudent={isStudent}
          />
        );
      }
      return <PopupFailed closePopup={this.closePopup} />;
    }
    return '';
  }

  render() {
    const {
      isAgreed,
      fullname,
      username,
      email,
      userPassword,
      confirmUserPassword,
      address,
      school,
      chkFullname,
      chkUsername,
      chkEmail,
      chkPassword,
      isMatchPassword,
      chkAddress,
      chkSchool,
      chkAgreed,
      isPopup,
    } = this.state;
    return (
      <div>
        <Header username="" />
        <div className={isPopup === true ? styles.overlay : ''}>{this.handlePopup()}</div>
        <div className={styles.container}>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.formContent}>
              <div className={styles.titleBar}>
                <h5>Đăng ký tham gia FYT Code Cup</h5>
                <div className={styles.reminder}>
                  <span className={styles.reminderContent}>
                    Để tham gia FYT Code Cup, hãy đăng ký trước 19:30 ngày 09/10/2020 bạn nhé!
                  </span>
                </div>
              </div>
              <div className={styles.content}>
                <InputText
                  label="Họ và tên"
                  type="text"
                  id="fullname-id"
                  name="fullname"
                  labelStyle={styles.formLabel}
                  value={fullname}
                  isNotError={chkFullname}
                  errorMessage="Xin vui lòng điền thông tin"
                  errorStyle={styles.errorMessage}
                  onChange={this.handleChange}
                />
                <InputText
                  label="Tên đăng nhập"
                  type="text"
                  id="username-id"
                  name="username"
                  labelStyle={styles.formLabel}
                  value={username}
                  isNotError={chkUsername}
                  errorMessage="Xin vui lòng điền thông tin"
                  errorStyle={styles.errorMessage}
                  onChange={this.handleChange}
                />
                <InputText
                  label="Email"
                  type="text"
                  id="email-id"
                  name="email"
                  labelStyle={styles.formLabel}
                  value={email}
                  isNotError={chkEmail}
                  errorMessage="Xin vui lòng nhập email hợp lệ"
                  errorStyle={styles.errorMessage}
                  onChange={this.handleChange}
                />
                <InputText
                  label="Mật khẩu"
                  type="password"
                  id="userPassword-id"
                  name="userPassword"
                  labelStyle={styles.formLabel}
                  value={userPassword}
                  isNotError={chkPassword}
                  errorMessage="Mật khẩu phải có ít nhất 8 kí tự, bao gồm một chữ cái, một chữ số"
                  errorStyle={styles.errorMessage}
                  onChange={this.handleChange}
                />
                <InputText
                  label="Xác nhận mật khẩu"
                  type="password"
                  id="confirmUserPassword-id"
                  name="confirmUserPassword"
                  labelStyle={styles.formLabel}
                  value={confirmUserPassword}
                  isNotError={isMatchPassword}
                  errorMessage="Mật khẩu không trùng"
                  errorStyle={styles.errorMessage}
                  onChange={this.handleChange}
                />
                <InputText
                  label="Địa chỉ (để xác nhận giải thưởng)"
                  type="text"
                  id="address-id"
                  name="address"
                  labelStyle={styles.formLabel}
                  value={address}
                  isNotError={chkAddress}
                  errorMessage="Xin vui lòng điền thông tin"
                  errorStyle={styles.errorMessage}
                  onChange={this.handleChange}
                />
                <InputText
                  label="Trường"
                  type="text"
                  id="school-id"
                  name="school"
                  labelStyle={styles.formLabel}
                  value={school}
                  isNotError={chkSchool}
                  errorMessage="Xin vui lòng điền thông tin"
                  errorStyle={styles.errorMessage}
                  onChange={this.handleChange}
                />
                <div className={styles.inputRadio}>
                  <small className={styles.formLabel}>Hình thức tham gia</small>
                  <ul className={styles.option}>
                    <li>
                      <input
                        type="radio"
                        name="participationForm"
                        value="0"
                        defaultChecked
                        onChange={this.handleChange}
                      />
                      <span className={styles.inputRadioContent}>Chính thức</span>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="participationForm"
                        value="1"
                        onChange={this.handleChange}
                      />
                      <span className={styles.inputRadioContent}>
                        Không chính thức (không xét giải, ẩn khỏi bảng điểm)
                      </span>
                    </li>
                  </ul>
                </div>
                <div className={styles.isStudent}>
                  <small className={styles.formLabel}>
                    Bạn có đang là học sinh/sinh viên chính thức trong trường?
                  </small>
                  <ul className={styles.option}>
                    <li>
                      <input
                        type="radio"
                        name="isStudent"
                        value="true"
                        defaultChecked
                        onChange={this.handleChange}
                      />
                      <span className={styles.inputRadioContent}>Có</span>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="isStudent"
                        value="false"
                        onChange={this.handleChange}
                      />
                      <span className={styles.inputRadioContent}>Không</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.isAgreed}>
                  {isAgreed ? (
                    <div
                      role="button"
                      className={styles.checked}
                      onClick={this.handleCheck}
                      onKeyDown={this.handleCheck}
                      tabIndex="0"
                    >
                      <img className={styles.checkImg} src={checkImage} alt="checked" />
                    </div>
                  ) : (
                    <div
                      role="button"
                      className={styles.unchecked}
                      onClick={this.handleCheck}
                      onKeyDown={this.handleCheck}
                      tabIndex="0"
                    >
                      <span />
                    </div>
                  )}
                  <span className={styles.isAgreedContent}>
                    Tôi đã đọc và đồng ý với quy chế thi của
                    <span className={styles.specialText}> FYT Code Cup</span>
                    <div className={styles.errorMessage}>
                      {!chkAgreed ? 'Bạn cần đọc và đồng ý với quy chế thi' : ''}
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <button className={styles.submitBtn} type="submit">
              Tạo tài khoản
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupPage;
