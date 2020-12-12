import * as React from 'react';
// import PropTypes from 'prop-types';

// HOC
import compose from 'src/shared/hoc/compose';
import withUserLogin from 'src/shared/hoc/withUserLogin';
import { withRouter, useParams } from 'react-router-dom';

// Components
import { Helmet } from 'react-helmet';
import Loading from 'src/app/common-ui/Loading';
import { PrimaryButton } from 'src/app/common-ui/Button';

// Contexts
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// APIs
import { apiGetContestCredential } from 'src/api';

// Utils and constants
import cx from 'classnames';
import { API_PROGRESS, CONTEST_LINK } from 'src/shared/constants';
import { getErrorMessage } from 'src/utils/getErrorMessage';

import styles from './enter.scss';

function EnterPage() {
  const { userInfo } = React.useContext(UserInfoContext);
  const { contestInfo, getContestInfo } = React.useContext(ContestInfoContext);
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
    const fetchInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ });

      // Get contest info
      const { code, msg } = await getContestInfo({ token: userInfo.token, contestName });

      if (code) {
        setApiState({ progress: API_PROGRESS.FAILED });
        setApiState({
          progress: API_PROGRESS.FAILED,
          error: code,
          error_msg: msg,
        });
        return;
      }

      // Get contest credential
      const {
        code: credApiCode,
        data: credApiData,
        msg: credApiMsg,
      } = await apiGetContestCredential(contestName);
      if (credApiCode || !credApiData.contest_username || !credApiData.contest_password) {
        setApiState({ progress: API_PROGRESS.FAILED });
        setApiState({
          progress: API_PROGRESS.FAILED,
          error: credApiCode,
          error_msg: credApiMsg,
        });
      } else {
        setApiState({ progress: API_PROGRESS.SUCCESS });
        setContestCredential({
          username: credApiData.contest_username,
          password: credApiData.contest_password,
        });
      }
    };

    fetchInfo();
  }, []);

  return (
    <>
      <Helmet>
        <title>Vào thi</title>
      </Helmet>
      {(() => {
        switch (apiState.progress) {
          case API_PROGRESS.FAILED:
            return (
              <div className={styles.container}>
                <div className={styles.title}>
                  {(contestInfo[contestName] && contestName) || 'Vào Thi'}
                </div>
                <div className={styles.error}>
                  {getErrorMessage({ code: apiState.error, msg: apiState.error_msg })}
                </div>
              </div>
            );
          case API_PROGRESS.SUCCESS:
            return (
              <div className={styles.container}>
                <div className={styles.title}>
                  {(contestInfo[contestName] && contestName) || 'Vào Thi'}
                </div>
                <div className={styles.enterContest}>
                  <div className={styles.text}>
                    1. Truy cập vào địa chỉ:&nbsp;
                    <a
                      className={styles.linkDecoration}
                      href={CONTEST_LINK}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {CONTEST_LINK}
                    </a>
                  </div>
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.text}>2. Đăng nhập với thông tin đăng nhập như sau:</div>
                  <ul className={cx(styles.info, styles.text)}>
                    <li className={styles.lstInfo}>
                      Username:
                      <span className={styles.credText}> {contestCredential.username}</span>
                    </li>
                    <li className={styles.lstInfo}>
                      Password:
                      <span className={styles.credText}> {contestCredential.password}</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.buttonWrapper}>
                  <PrimaryButton
                    className={styles.button}
                    onClick={() => window.open(CONTEST_LINK, '_blank', 'noopener noreferrer')}
                  >
                    Đi tới trang kì thi
                  </PrimaryButton>
                </div>
              </div>
            );
          default:
            return <Loading />;
        }
      })()}
    </>
  );
}

EnterPage.propTypes = {};

export default compose(withRouter, withUserLogin(true))(EnterPage);