import * as React from 'react';
import PropTypes from 'prop-types';

// HOC
import compose from 'src/shared/hoc/compose';
import withUserLogin from 'src/shared/hoc/withUserLogin';
import { withRouter, useParams } from 'react-router-dom';

// Components
import { Helmet } from 'react-helmet';
import Loading from 'src/app/common-ui/Loading';

// Contexts
import { UserInfoContext } from 'src/shared/context/UserInfo';

// APIs
import { apiGetContestInfo, apiGetContestCredential } from 'src/api';

// Utils and constants
import cx from 'classnames';
import { API_PROGRESS, ERROR_MAP } from 'src/shared/constants';

import styles from './enter.scss';

function EnterPage() {
  const { userInfo } = React.useContext(UserInfoContext);
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    error: null,
    error_msg: null,
  });
  const [contestCredential, setContestCredential] = React.useState({
    username: '',
    password: '',
  });

  // Route params
  const { contestName } = useParams();

  React.useEffect(() => {
    // Get contest info
    const fetchInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ });
      const { code, data } = await apiGetContestInfo({ token: userInfo.token, contestName });

      if (code) {
        setApiState({ progress: API_PROGRESS.FAILED });
        setApiState({
          progress: API_PROGRESS.FAILED,
          error: code,
          error_msg: ERROR_MAP[code],
        });
      } else if (!!data && !!data.contest.can_enter) {
        const { code, data } = await apiGetContestCredential(contestName);

        if (code || !data.contest_username || !data.contest_password) {
          setApiState({ progress: API_PROGRESS.FAILED });
          setApiState({
            progress: API_PROGRESS.FAILED,
            error: code,
            error_msg: ERROR_MAP[code],
          });
        } else {
          setApiState({ progress: API_PROGRESS.SUCCESS });
          setContestCredential({
            username: data.contest_username,
            password: data.contest_password,
          });
        }
      }
    };

    fetchInfo();
  }, []);

  return (
    <>
      <Helmet>
        <title>Vào thi</title>
      </Helmet>
      {apiState.progress === API_PROGRESS.REQ ? (
        <Loading />
      ) : apiState.progress === API_PROGRESS.FAILED ? (
        <div className={styles.container}>
          <div className={styles.title}>Vào thi</div>
          <div className={styles.error}>{apiState.error_msg}</div>
        </div>
      ) : (
        apiState.progress === API_PROGRESS.SUCCESS && (
          <div className={styles.container}>
            <div className={styles.title}>Vào thi</div>
            <div className={styles.enterContest}>
              <div className={styles.text}>
                1. Truy cập vào địa chỉ:&nbsp;
                <a
                  className={styles.linkDecoration}
                  href="https://contest.freecontest.net"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://code.fyt.freecontest.net
                </a>
              </div>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.text}>2. Đăng nhập với thông tin đăng nhập như sau:</div>
              <ul className={cx(styles.info, styles.text)}>
                <li className={styles.lstInfo}>
                  Username: <span className={styles.credText}>{contestCredential.username}</span>
                </li>
                <li className={styles.lstInfo}>
                  Password: <span className={styles.credText}>{contestCredential.password}</span>
                </li>
              </ul>
            </div>
          </div>
        )
      )}
    </>
  );
}

EnterPage.propTypes = {};

export default compose(withRouter, withUserLogin(true))(EnterPage);
