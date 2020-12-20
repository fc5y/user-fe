import PropTypes from 'prop-types';

export const commonInputPropTypes = {
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
