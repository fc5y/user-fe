import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

function Form({ children }) {
  return <form className={styles.form}>{children}</form>;
}

Form.propTypes = {
  children: PropTypes.node,
};

function FieldSet({ children }) {
  return <fieldset className={styles.fieldset}>{children}</fieldset>;
}

FieldSet.propTypes = {
  children: PropTypes.node,
};

function ButtonGroup({ children }) {
  return <div className={styles.buttonGroup}>{children}</div>;
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
};

export { Form, FieldSet, ButtonGroup };
