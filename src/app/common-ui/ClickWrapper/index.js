import React from 'react';
import PropTypes from 'prop-types';

function ClickWrapper({ children, onClickOutside, exclude = [] }) {
  const childrenRef = React.useRef(null);

  const handleClickOutside = (event) => {
    if (
      !!childrenRef &&
      !!childrenRef.current &&
      !childrenRef.current.contains(event.target) &&
      exclude.every((e) => !!e && !e.contains(event.target))
    ) {
      typeof onClickOutside === 'function' && onClickOutside();
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return <div ref={childrenRef}>{children}</div>;
}

ClickWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  exclude: PropTypes.arrayOf(PropTypes.any),
};

export default ClickWrapper;
