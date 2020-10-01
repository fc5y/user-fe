import React, { Component } from 'react';

import checkImage from '../../../assets/images/vector 1.png';

import styles from './signup.scss';
import Success from './Success';
import Failed from './Failed';
import Header from '../NavBar/Header';

let isSuccess = 0;
let isPopup = false;
let chkPassword = true;
const testPassword = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$');
const testEmail = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$');
let isMatchPassword = true;
let chkFullname = true;
let chkUsername = true;
let chkEmail = true;
let chkAddress = true;
let chkSchool = true;
let chkAgreed = true;

const ShowError = ({ chk, s1, s2 }) => {
  if (chk) {
    return s1;
  }
  return s2;
};

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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
  }

  handleChange(event) {
    const name = [event.target.name];
    let value = [event.target.value];
    if (name[0] === 'isStudent') {
      value = Boolean(value[0] === 'true');
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
    chkFullname = fullname[0] !== '' && fullname[0] !== undefined;
    chkUsername = username[0] !== '' && username[0] !== undefined;
    chkEmail = testEmail.test(email[0]);
    chkPassword = testPassword.test(userPassword[0]);
    isMatchPassword = userPassword[0] === confirmUserPassword[0];
    chkAddress = address[0] !== '' && address[0] !== undefined;
    chkSchool = school[0] !== '' && school[0] !== undefined;
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
    isPopup = true;
    this.forceUpdate();
  }

  handlePopup() {
    if (isPopup) {
      isPopup = false;
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
          <Success
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
      return <Failed />;
    }
    return '';
  }

  render() {
    const { isAgreed } = this.state;
    return (
      <div>
        <Header username="" />
        <div className={styles.signupForm}>
          <div className={isPopup === true ? styles.popup : ''}>{this.handlePopup()}</div>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.titleBar}>
              <h5>Đăng ký tham gia FYT Code Cup</h5>
              <div className={styles.reminder}>
                <p>Để tham gia FYT Code Cup, hãy đăng ký trước 19:30 ngày 09/10/2020 bạn nhé!</p>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.fullname}>
                <small>Họ và tên</small> <br />
                <input type="text" name="fullname" onChange={this.handleChange} />
                <div className={styles.errorMessage}>
                  <ShowError chk={chkFullname} s1="" s2="Xin vui lòng điền thông tin" />
                </div>
                <div>
                  <small>Tên đăng nhập</small> <br />
                  <input type="text" name="username" onChange={this.handleChange} />
                  <div className={styles.errorMessage}>
                    <ShowError chk={chkUsername} s1="" s2="Xin vui lòng điền thông tin" />
                  </div>
                  <div>
                    <small>Email</small> <br />
                    <input type="text" name="email" onChange={this.handleChange} />
                    <div className={styles.errorMessage}>
                      <ShowError chk={chkEmail} s1="" s2="Xin vui lòng nhập email hợp lệ" />
                    </div>
                    <div>
                      <small>Mật khẩu</small> <br />
                      <input type="password" name="userPassword" onChange={this.handleChange} />
                      <div className={styles.errorMessage}>
                        <ShowError
                          chk={chkPassword}
                          s1=""
                          s2="Mật khẩu phải có ít nhất 8 kí tự, bao gồm một chữ cái, một chữ số"
                        />
                      </div>
                      <div>
                        <small>Xác nhận mật khẩu</small> <br />
                        <input
                          type="password"
                          name="confirmUserPassword"
                          onChange={this.handleChange}
                        />
                        <div className={styles.errorMessage}>
                          <ShowError chk={isMatchPassword} s1="" s2="Mật khẩu không trùng" />
                        </div>
                        <div>
                          <small>Địa chỉ (để xác nhận giải thưởng)</small> <br />
                          <input type="text" name="address" onChange={this.handleChange} />
                          <div className={styles.errorMessage}>
                            <ShowError chk={chkAddress} s1="" s2="Xin vui lòng điền thông tin" />
                          </div>
                          <div>
                            <small>Trường</small> <br />
                            <input type="text" name="school" onChange={this.handleChange} />
                            <div className={styles.errorMessage}>
                              <ShowError chk={chkSchool} s1="" s2="Xin vui lòng điền thông tin" />
                            </div>
                            <div className={styles.inputRadio}>
                              <small>Hình thức tham gia</small> <br />
                              <input
                                type="radio"
                                name="participationForm"
                                value="0"
                                defaultChecked
                                onChange={this.handleChange}
                              />
                              <span>Chính thức</span>
                              <br />
                              <input
                                type="radio"
                                name="participationForm"
                                value="1"
                                onChange={this.handleChange}
                              />
                              <span>Không chính thức (không xét giải, ẩn khỏi bảng điểm)</span>
                              <div className={styles.isStudent}>
                                <small>
                                  Bạn có đang là học sinh/sinh viên chính thức trong trường?
                                </small>
                                <br />
                                <input
                                  type="radio"
                                  name="isStudent"
                                  value="true"
                                  defaultChecked
                                  onChange={this.handleChange}
                                />
                                <span>Có</span>
                                <br />
                                <input
                                  type="radio"
                                  name="isStudent"
                                  value="false"
                                  onChange={this.handleChange}
                                />
                                <span>Không</span>
                                <div className={styles.isAgreed}>
                                  {isAgreed ? (
                                    <div
                                      role="button"
                                      className={styles.checked}
                                      onClick={this.handleCheck}
                                      onKeyDown={this.handleCheck}
                                      tabIndex="0"
                                    >
                                      <img src={checkImage} alt="checked" />
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
                                  <span>
                                    Tôi đã đọc và đồng ý với quy chế thi của
                                    <span style={{ color: '#1C83C6' }}>FYT Code Cup</span>
                                    <div className={styles.errorMessage}>
                                      <ShowError
                                        chk={chkAgreed}
                                        s1=""
                                        s2="Bạn cần đọc và đồng ý với quy chế thi"
                                      />
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit">Tạo tài khoản</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupPage;
