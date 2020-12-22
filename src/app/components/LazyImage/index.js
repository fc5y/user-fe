/* eslint-disable react/prop-types */
import * as React from 'react';
import cx from 'classnames';

import styles from './style.scss';
import placeholderImage from 'assets/images/logo_placeholder.png';

function LazyImage({ src, alt, placeholder, className, imageClassName, ...rest }) {
  const [isLoaded, setIsLoaded] = React.useState(null);

  return (
    <>
      {(isLoaded === null || isLoaded === true) && (
        <div className={styles.container}>
          <img
            className={cx(styles.image, className, !isLoaded && styles.invisible)}
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(false)}
            {...rest}
          />
        </div>
      )}
      {!isLoaded && (
        <div className={styles.container}>
          <img
            className={cx(styles.placeholderImage, imageClassName)}
            src={placeholderImage}
            alt={alt}
            {...rest}
          />
        </div>
      )}
    </>
  );
}

export default LazyImage;
