import React from 'react';
import Markdown from 'react-markdown';
import { get } from '../../../utils/fetchUtils';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BtnLoginAndSignup from '../../components/Button/BtnLoginAndSignup';
import BtnJoin from '../../components/Button/BtnJoin';
import BtnDisabled from '../../components/Button/BtnDisabled';
import md from './Info.md';
import styles from './style.scss';

function HomePage({ username, disabled }) {
  React.useEffect(() => {
    get('/get-contest-name/get-contest-name').then(console.log);
  });
  return (
    <div className={styles.content}>
      <div className={styles.title}>FYT Code Cup</div>
      <div className={styles.info}>
        <Markdown source={md} />
        <Link to="/info">Thông tin kỳ thi</Link>
        <br />
        <Link to="/info/rules">Quy chế thi</Link>
      </div>
      <div className={styles.alert}>
        {username === ''
          ? 'Để tham gia thi, bạn cần tạo tài khoản'
          : disabled
          ? 'Trang kỳ thi sẽ chỉ được bật một ít phút trước khi kỳ thi bắt đầu'
          : 'Để tham gia thi, bạn chỉ cần nhấn vào nút “Vào thi”'}
      </div>
      <div className={styles.btn}>
        {username === '' ? <BtnLoginAndSignup /> : disabled ? <BtnDisabled /> : <BtnJoin />}
      </div>
    </div>
  );
}

HomePage.propTypes = {
  username: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default HomePage;
