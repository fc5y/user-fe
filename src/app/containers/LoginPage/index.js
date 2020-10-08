import React from 'react';

// APIs
import { apiLogin } from '../../../api/authentication';

// HOC
import { withRouter, Redirect } from 'react-router-dom';
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

function LoginPage() {
  const [apiProgress, setApiProgress] = React.useState(API_PROGRESS.INIT);
  const { userInfo } = React.useContext(UserInfoContext);
  const [data, setData] = React.useState({
    // null: pristine (user has not changed the value)
    // empty string: non-pristine (user has changed the value)
    username: '',
    password: '',
  });

  const [popupState, setPopupState] = React.useState(false);
  const [redirectState, setRedirectState] = React.useState(false);

  const handleChange = React.useCallback((name, value) => {
    setData({ ...data, [name]: value });
  });

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const { username, password } = data;
      if (!username || !password) {
        setPopupState(true);
        return;
      }
      console.log(data);
      setApiProgress(API_PROGRESS.REQ);
      if (__USE_BACKUP_API__) {
        const { apiData } = await apiLogin({ username, password });
        console.log(apiData);
        if (!apiData.data || !apiData.data.token) {
          setPopupState(true);
          setApiProgress(API_PROGRESS.FAILED);
        } else {
          userInfo.setUserInfo({ ...userInfo.userInfo, userInfo: apiData.data.token });
          // eslint-disable-next-line react/prop-types
          setRedirectState(true);
        }
      } else {
        const { apiData } = await apiLogin({ username, password });
        console.log(apiData);
        if (!apiData || !apiData.token) {
          setPopupState(true);
          setApiProgress(API_PROGRESS.FAILED);
        } else {
          userInfo.setUserInfo({ ...userInfo.userInfo, userInfo: apiData.token });
          // eslint-disable-next-line react/prop-types
          setRedirectState(true);
        }
      }
    },
    [data],
  );

  const handleClosePopup = React.useCallback(() => {
    setPopupState(false);
  });

  return (
    <MainPanel.Container>
      {redirectState ? <Redirect to="/" /> : ''}
      {popupState ? (
        <Popup
          onClose={handleClosePopup}
          title="Đăng nhập không thành công"
          content="Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại."
          buttonText="OK"
          variant="error"
        />
      ) : (
        ''
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

export default withUserNotLogin(withRouter(LoginPage));
