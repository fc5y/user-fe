import * as React from 'react';

// Hook
import { useHistory, useParams, Link } from 'react-router-dom';

// Context
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// APIs
import { apiRegisterContest } from 'src/api';

// Utils
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { validate } from './validators';
import { makeUrl } from 'src/utils/url';
import { formatContestTime } from 'src/utils/contest';
import { getErrorMessage } from 'src/utils/getErrorMessage';

// Components
import * as Form from 'src/app/common-ui/Form';
import Loading from 'src/app/common-ui/Loading';
import { PrimaryButton } from 'src/app/common-ui/Button';
import { ErrorPopup, SuccessPopup } from 'src/app/common-ui/Popup';

// Constants
import { ROUTE_CONTEST } from 'src/app/routes/constants';
import { API_PROGRESS } from 'src/shared/constants';

const Container = styled.div`
  width: 600px;
  padding: 36px;
  margin: 48px auto;

  border-radius: 6px;

  background-color: white;
  filter: drop-shadow(0px 0px 12px rgba(188, 188, 188, 0.25));
  color: rgba(0, 0, 0, 0.6);
`;

const TitleContainer = styled.div`
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  margin: 5px 0;
  font-size: 24px;
  color: var(--primary-default);
`;

const ContestTitle = styled.div`
  margin: 5px 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-dark);
`;

const ContestTime = styled.div`
  margin: 10px 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;

const labels = {
  fullname: 'Họ và tên',
  username: 'Tên đăng nhập',
  school: 'Trường',
  isTermsAccepted: (
    <span>
      Tôi đã đọc và đồng ý với&nbsp;
      <Link target="_blank" to="/">
        {/* TODO: fix link */}
        điều khoản của Free Contest
      </Link>
    </span>
  ),
};

function ContestRegister() {
  const { userInfo } = React.useContext(UserInfoContext);
  const { contestInfo } = React.useContext(ContestInfoContext);
  const [values, setValues] = React.useState({
    fullname: userInfo.fullname,
    username: userInfo.username,
    school: userInfo.school,
  });
  const [errors, setErrors] = React.useState({});
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    code: null,
    msg: null,
  });
  const { contestName } = useParams();
  const history = useHistory();

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

  const validateAndSubmit = async () => {
    const validation = validate(values);
    setValues(validation.newValues);
    setErrors(validation.errors);

    if (validation.hasError) {
      return;
    }

    setApiState({ progress: API_PROGRESS.REQ, code: null, msg: null });
    const { code, data, msg } = await apiRegisterContest({
      token: userInfo.token,
    });

    if (code || !data) {
      setApiState({ progress: API_PROGRESS.FAILED, code, msg });
    } else {
      setApiState({ progress: API_PROGRESS.SUCCESS, code: null, msg: null });
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Đăng ký kỳ thi</title>
      </Helmet>
      {apiState.progress === API_PROGRESS.REQ ? (
        <Loading />
      ) : apiState.progress === API_PROGRESS.FAILED ? (
        <ErrorPopup
          show
          content={getErrorMessage(apiState)}
          onClose={() =>
            setApiState({
              progress: API_PROGRESS.INIT,
              error: null,
              error_msg: null,
            })
          }
        />
      ) : (
        apiState.progress === API_PROGRESS.SUCCESS && (
          <SuccessPopup
            show
            content="Đăng ký thành công!"
            onClose={() => history.push(makeUrl(ROUTE_CONTEST, { contestName }))}
          />
        )
      )}
      <TitleContainer>
        <Title>Đăng ký kỳ thi</Title>
        <ContestTitle>
          {(contestInfo[contestName] && contestInfo[contestName].contest_title) || contestName}
        </ContestTitle>
        <ContestTime>{formatContestTime(contestInfo[contestName]).fullTime}</ContestTime>
      </TitleContainer>
      <Form.Form>
        <Form.LabeledInput {...defaultProps('username')} type="text" disabled />
        <Form.LabeledInput {...defaultProps('fullname')} type="text" disabled />
        <Form.LabeledInput {...defaultProps('school')} type="text" disabled />
        <Form.LabeledCheckbox
          {...defaultProps('isTermsAccepted')}
          valueWhenChecked="checked"
          valueWhenUnchecked=""
        />
        <Form.ButtonGroup>
          <PrimaryButton onClick={validateAndSubmit}>Đăng ký</PrimaryButton>
        </Form.ButtonGroup>
      </Form.Form>
    </Container>
  );
}

export default ContestRegister;
