/* eslint-disable react/prop-types */
import * as React from 'react';
import cx from 'classnames';

import styles from './style.scss';
import IconFC from 'src/app/common-ui/Icons/IconFC';

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
        </div>
      )}
      {!isLoaded && (
        <div className={cx(styles.container, className)}>
          <IconFC className={cx(styles.placeholderImage, imageClassName)} />
        </div>
      )}
    </>
  );
}

export default LazyImage;
