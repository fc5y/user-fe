/* eslint-disable react/prop-types */
import * as React from 'react';

// Icons
import IconFolder from 'src/app/common-ui/Icons/IconFolder';

// Utils
import cx from 'classnames';
import styles from './style.scss';

export default function ButtonContestDocument(props) {
  const openLink = (link) => window.open(link || 'about:blank', '_blank', 'noopener noreferrer');
  return (
    <div className={cx(styles.stylebtn)} onClick={() => openLink(props.linkUrl)}>
      <div>
        <IconFolder />
      </div>
      <div>
        <p>{props.content}</p>
      </div>
    </div>
  );
}
