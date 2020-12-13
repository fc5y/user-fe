import React from 'react';
import PropTypes from 'prop-types';

function ClickWrapper({ children, onClickOutside }) {
  const childrenRef = React.useRef(null);

  const handleClickOutside = (event) => {
    if (!!childrenRef && !!childrenRef.current && !childrenRef.current.contains(event.target)) {
      typeof onClickOutside === 'function' && onClickOutside();
      event.stopPropagation();
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return <div ref={childrenRef}>{children}</div>;
}

ClickWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onClickOutside: PropTypes.func.isRequired,
};

export default ClickWrapper;
