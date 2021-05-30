/* eslint-disable react/prop-types */
import * as React from 'react';
import cx from 'classnames';

import styles from './style.scss';
import IconFC from 'src/app/common-ui/Icons/IconFC';

import IconBanner from 'src/assets/images/bannerlogo.png';
import IconUsers from 'src/assets/images/icon-users.png';
import IconMedal from 'src/assets/images/icon-medal.png';

function LazyImage({ src, alt, placeholder, className, imageClassName, ...rest }) {
  const [isLoaded, setIsLoaded] = React.useState(null);

  return (
    <>
      {(isLoaded === null || isLoaded === true) && (
        <div className={cx(styles.container, className)}>
          <img
            className={cx(styles.image, imageClassName, !isLoaded && styles.invisible)}
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(false)}
            {...rest}
          />
          <div className={cx(styles.container_child)}>
            <div className={cx(styles.container_child_logo)}>
              <div className={cx(styles.container_child_cnt)}>
                <p>
                  <b>5 năm</b>
                </p>
                <p>Tổ chức các kỳ thi</p>
              </div>
            </div>
            <div className={cx(styles.container_child_users)}>
              <div className={cx(styles.container_child_cnt)}>
                <p>
                  <b>3800+</b>
                </p>
                <p>Thành viên</p>
              </div>
            </div>
            <div className={cx(styles.container_child_medal)}>
              <div className={cx(styles.container_child_cnt)}>
                <p>
                  <b>Nền tảng lập trình thi đấu</b>
                </p>
                <p>hàng đầu Việt Nam</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoaded && (
        <div className={cx(styles.container, className)}>
          <IconFC className={cx(styles.placeholderImage)} />
        </div>
      )}
    </>
  );
}

export default LazyImage;
