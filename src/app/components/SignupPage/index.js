import React, { Component } from 'react';

import checkImage from '../../../assets/images/vector 1.png';

import styles from './signup.scss';
import PopupSuccess from './PopupSuccess';
import PopupFailed from './PopupFailed';
import Header from '../NavBar/Header';

const testPassword = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$');
const testEmail = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$');

const ShowError = ({ chk, errMess }) => {
  if (!chk) return errMess;
  return '';
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
    this.inputText = this.inputText.bind(this);
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

  inputText(content, inpType, inputName, inputValue, chkType, err) {
    return (
      <div>
        <small>{content}</small> <br />
        <input type={inpType} name={inputName} value={inputValue} onChange={this.handleChange} />
        <div className={styles.errorMessage}>
          <ShowError chk={chkType} errMess={err} />
        </div>
      </div>
    );
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
        <div className={styles.signupForm}>
          <div className={isPopup === true ? styles.overlay : ''}>{this.handlePopup()}</div>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.titleBar}>
              <h5>Đăng ký tham gia FYT Code Cup</h5>
              <div className={styles.reminder}>
                <span className={styles.reminderContent}>
                  Để tham gia FYT Code Cup, hãy đăng ký trước 19:30 ngày 09/10/2020 bạn nhé!
                </span>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.fullname}>
                {this.inputText(
                  'Họ và tên',
                  'text',
                  'fullname',
                  fullname,
                  chkFullname,
                  'Xin vui lòng điền thông tin',
                )}
                <div>
                  {this.inputText(
                    'Tên đăng nhập',
                    'text',
                    'username',
                    username,
                    chkUsername,
                    'Xin vui lòng điền thông tin',
                  )}
                  <div>
                    {this.inputText(
                      'Email',
                      'text',
                      'email',
                      email,
                      chkEmail,
                      'Xin vui lòng nhập email hợp lệ',
                    )}
                    <div>
                      {this.inputText(
                        'Mật khẩu',
                        'password',
                        'userPassword',
                        userPassword,
                        chkPassword,
                        'Mật khẩu phải có ít nhất 8 kí tự, bao gồm một chữ cái, một chữ số',
                      )}
                      <div>
                        {this.inputText(
                          'Xác nhận mật khẩu',
                          'password',
                          'confirmUserPassword',
                          confirmUserPassword,
                          isMatchPassword,
                          'Mật khẩu không trùng',
                        )}
                        <div>
                          {this.inputText(
                            'Địa chỉ (để xác nhận giải thưởng)',
                            'text',
                            'address',
                            address,
                            chkAddress,
                            'Xin vui lòng điền thông tin',
                          )}
                          <div>
                            {this.inputText(
                              'Trường',
                              'text',
                              'school',
                              school,
                              chkSchool,
                              'Xin vui lòng điền thông tin',
                            )}
                            <div className={styles.inputRadio}>
                              <small>Hình thức tham gia</small> <br />
                              <input
                                type="radio"
                                name="participationForm"
                                value="0"
                                defaultChecked
                                onChange={this.handleChange}
                              />
                              <span className={styles.inputRadioContent}>Chính thức</span>
                              <br />
                              <input
                                type="radio"
                                name="participationForm"
                                value="1"
                                onChange={this.handleChange}
                              />
                              <span className={styles.inputRadioContent}>
                                Không chính thức (không xét giải, ẩn khỏi bảng điểm)
                              </span>
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
                                <span className={styles.inputRadioContent}>Có</span>
                                <br />
                                <input
                                  type="radio"
                                  name="isStudent"
                                  value="false"
                                  onChange={this.handleChange}
                                />
                                <span className={styles.inputRadioContent}>Không</span>
                                <div className={styles.isAgreed}>
                                  {isAgreed ? (
                                    <div
                                      role="button"
                                      className={styles.checked}
                                      onClick={this.handleCheck}
                                      onKeyDown={this.handleCheck}
                                      tabIndex="0"
                                    >
                                      <img
                                        className={styles.checkImg}
                                        src={checkImage}
                                        alt="checked"
                                      />
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
                                    <span style={{ color: '#1C83C6' }}> FYT Code Cup</span>
                                    <div className={styles.errorMessage}>
                                      <ShowError
                                        chk={chkAgreed}
                                        errMess="Bạn cần đọc và đồng ý với quy chế thi"
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
