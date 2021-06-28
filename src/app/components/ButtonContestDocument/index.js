/* eslint-disable react/prop-types */
import * as React from 'react';

// Utils
import cx from 'classnames';
import styles from './style.scss';

// Assets
import IconFolder from 'src/assets/images/folder.png';

export default function ButtonContestDocument(props) {
  const openLink = (link) => window.open(link || 'about:blank', '_blank', 'noopener noreferrer');
  return (
    <div className={cx(styles.stylebtn)}>
      <div>
        <img src={IconFolder} alt="icon"></img>
      </div>
      <div onClick={() => openLink(props.linkUrl)}>
        <p>{props.content}</p>
      </div>
    </div>
  );
}
