import React from 'react';
import PropTypes from 'prop-types';

// APIs
import { apiLogin } from '../../../api/authentication';

// HOC
import { withRouter } from 'react-router-dom';
import withUserNotLogin from '../../../shared/hoc/withUserNotLogin';
import { UserInfoContext } from '../../../shared/context/UserInfo';

// UI
import * as MainPanel from '../../common-ui/MainPanel';
import * as Form from '../../common-ui/Form';
import LabeledInput from '../../common-ui/LabeledInput';
import * as Button from '../../common-ui/Button';
import Popup from '../../common-ui/Popup';

// Constants
import { API_PROGRESS } from '../../../shared/constants';

function LoginPage({ history }) {
  const [apiProgress, setApiProgress] = React.useState(API_PROGRESS.INIT);
  const [popupState, setPopupState] = React.useState(false);
  const [data, setData] = React.useState({
    // null: pristine (user has not changed the value)
    // empty string: non-pristine (user has changed the value)
    username: null,
    password: null,
  });
  const { userInfo, setUserInfo } = React.useContext(UserInfoContext);

  const handleChange = React.useCallback(
    (name, value) => {
      setData({ ...data, [name]: value });
    },
    [data],
  );

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const { username, password } = data;
      if (!username || !password) {
        setPopupState(true);
        return;
      }

      setApiProgress(API_PROGRESS.REQ);
      const { data: apiData } = await apiLogin({ username, password });
      if (!apiData || !apiData.token) {
        setPopupState(true);
        setApiProgress(API_PROGRESS.FAILED);
      } else {
        setUserInfo({ ...userInfo, token: apiData.token });
        history.push('/');
      }
    },
    [data],
  );

  const handleClosePopup = React.useCallback(() => {
    setPopupState(false);
  }, []);

  return (
    <MainPanel.Container>
      {popupState && (
        <Popup
          onClose={handleClosePopup}
          title="Đăng nhập không thành công"
          content="Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại."
          buttonText="OK"
          variant="error"
          onButtonClick={handleClosePopup}
        />
      )}
      <MainPanel.Title>Đăng nhập</MainPanel.Title>
      <Form.Form>
        <Form.FieldSet>
          <LabeledInput
            label="Tên đăng nhập"
            name="username"
            value={data.username || ''}
            onChange={handleChange}
          />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledInput
            label="Mật khẩu"
            name="password"
            value={data.password || ''}
            onChange={handleChange}
            type="password"
          />
        </Form.FieldSet>
      </Form.Form>
      <Form.ButtonGroup>
        <Button.Primary disabled={apiProgress === API_PROGRESS.REQ} onClick={handleSubmit}>
          Đăng nhập
        </Button.Primary>
      </Form.ButtonGroup>
    </MainPanel.Container>
  );
}

LoginPage.propTypes = {
  history: PropTypes.any,
};

export default withUserNotLogin(withRouter(LoginPage));
