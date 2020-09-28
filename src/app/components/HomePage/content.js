import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import styles from './content.scss';

import BtnLoginAndSignup from '../Button/btnLoginAndSignup';
import BtnJoin from '../Button/btnJoin';
import BtnDisabled from '../Button/btnDisabled';

function Content({ uname, disabled }) {
  return (
    <div className={styles.content}>
      <div className={styles.title}>FYT Code Cup</div>
      <div className={styles.dayOne}>
        <p>Ngày 1: 19:30 - 22:30 10/10/2020</p>
      </div>
      <div className={styles.dayTwo}>
        <p>Ngày 2: 19:30 - 22:30 11/10/2020</p>
      </div>
      <div className={styles.alert}>
        {uname === '' ? 'Để tham gia thi, bạn cần tạo tài khoản' : ''}
        {uname !== '' && disabled === 'true'
          ? 'Trang kỳ thi sẽ chỉ được bật một ít phút trước khi kỳ thi bắt đầu'
          : ''}
        {uname !== '' && disabled !== 'true'
          ? 'Để tham gia thi, bạn chỉ cần nhấn vào nút “Vào thi”'
          : ''}
      </div>
      <div className={styles.btn}>
        {uname === '' ? <BtnLoginAndSignup /> : ''}
        {uname !== '' && disabled === 'true' ? <BtnDisabled /> : ''}
        {uname !== '' && disabled !== 'true' ? <BtnJoin /> : ''}
      </div>
    </div>
  );
}

Content.propTypes = {
  uname: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
};

export default Content;
