import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';

import styles from './content.scss';

import BtnLoginAndSignup from '../Button/BtnLoginAndSignup';
import BtnJoin from '../Button/BtnJoin';
import BtnDisabled from '../Button/BtnDisabled';
import md from './Info.md';

function Content({ username, disabled }) {
  return (
    <div className={styles.content}>
      <div className={styles.title}>FYT Code Cup</div>
      <div className={styles.info}>
        <Markdown source={md} escapeHtml={false} />
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

Content.propTypes = {
  username: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Content;
