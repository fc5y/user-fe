/* eslint-disable react/prop-types */
import * as React from 'react';

// Utils
import cx from 'classnames';
import styles from './style.scss';

export default function ButtonContestDocument(props) {
  const openLink = (link) => window.open(link || 'about:blank', '_blank', 'noopener noreferrer');
  return (
    <div className={cx(styles.stylebtn)}>
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.9958 10.5H20V8.25C20 7.00781 19.1042 6 18 6H11.3333L8.66667 3H2C0.895833 3 0 4.00781 0 5.25V18.75C0 19.9922 0.895833 21 2 21H18.6667C19.3542 21 19.9958 20.6016 20.3625 19.9406L23.6917 13.9406C24.525 12.4453 23.5667 10.5 21.9958 10.5ZM2 5.53125C2 5.37656 2.1125 5.25 2.25 5.25H7.8375L10.5042 8.25H17.75C17.8875 8.25 18 8.37656 18 8.53125V10.5H6.33333C5.63333 10.5 4.98333 10.9125 4.62083 11.5875L2 16.4719V5.53125ZM18.6667 18.75H3L6.21667 12.75H22L18.6667 18.75Z"
            fill="#1C83C6"
          />
        </svg>
      </div>
      <div onClick={() => openLink(props.linkUrl)}>
        <p>{props.content}</p>
      </div>
    </div>
  );
}
