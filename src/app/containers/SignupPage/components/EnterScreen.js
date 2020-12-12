import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as Form from 'src/app/common-ui/FormFC5Y';
import { PrimaryButton } from 'src/app/common-ui/Button';
import { validate } from '../utils/validators';

const labels = {
  fullname: 'Họ và tên',
  email: 'Email',
  username: 'Tên đăng nhập',
  password: 'Mật khẩu',
  confirmPassword: 'Xác nhận mật khẩu',
  school: 'Trường',
  isTermsAccepted: (
    <span>
      Tôi đã đọc và đồng ý với{' '}
      <Link target="_blank" to="/">
        {/* TODO: fix link */}
        điều khoản của Free Contest
      </Link>
    </span>
  ),
};

function EnterScreen({ submit }) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const updateValue = (name, value) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const defaultProps = (name) => ({
    label: labels[name],
    name,
    value: values[name],
    onChange: (newValue) => updateValue(name, newValue),
    error: errors[name],
  });

  const validateAndSubmit = () => {
    const validation = validate(values);
    setValues(validation.newValues);
    setErrors(validation.errors);
    if (!validation.hasError && !!submit) {
      submit(validation.newValues);
    }
  };

  return (
    <Form.Form>
      <Form.LabeledInput {...defaultProps('fullname')} type="text" />
      <Form.LabeledInput {...defaultProps('email')} type="email" />
      <Form.LabeledInput {...defaultProps('username')} type="text" />
      <Form.LabeledInput {...defaultProps('password')} type="password" />
      <Form.LabeledInput {...defaultProps('confirmPassword')} type="password" />
      <Form.LabeledInput {...defaultProps('school')} type="text" />
      <Form.LabeledCheckbox
        {...defaultProps('isTermsAccepted')}
        valueWhenChecked="checked"
        valueWhenUnchecked=""
      />
      <Form.ButtonGroup>
        <PrimaryButton onClick={validateAndSubmit}>Tạo tài khoản</PrimaryButton>
      </Form.ButtonGroup>
    </Form.Form>
  );
}

EnterScreen.propTypes = {
  submit: PropTypes.func,
};

export default EnterScreen;
