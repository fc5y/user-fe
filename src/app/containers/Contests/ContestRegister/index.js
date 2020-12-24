import * as React from 'react';
import { Helmet } from 'react-helmet';

// HOC
import withUserLogin from 'src/shared/hoc/withUserLogin';

// Hook
import { useParams } from 'react-router-dom';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Components
import RegisterFrom from './components/RegisterForm';
import ErrorContent from './components/ErrorContent';
import Loading from 'src/app/common-ui/Loading';

// Constants and utils
import { getContestStatus } from 'src/utils/contest';
import { API_PROGRESS, CONTEST_STATUS, API_ERROR } from 'src/shared/constants';
import { getErrorMessage } from 'src/utils/getErrorMessage';

function ContestRegister() {
  const { contestName } = useParams();
  const { getContestInfoByName, contestInfo } = React.useContext(ContestInfoContext);
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    code: null,
    msg: null,
  });

  React.useEffect(() => {
    const fetchContestInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ });
      const { code, msg, data } = await getContestInfoByName({ contestName });

      if (code || !data) {
        setApiState({
          progress: API_PROGRESS.FAILED,
          code,
          msg,
        });
        return null;
      }

      const status = getContestStatus(data.contest, data.server_time);
      if (status === CONTEST_STATUS.JUST_ENDED || status === CONTEST_STATUS.ENDED) {
        setApiState({ progress: API_PROGRESS.FAILED, code: API_ERROR.CONTEST_OVER, msg: null });
      } else {
        setApiState({ progress: API_PROGRESS.SUCCESS, code: null, msg: null });
      }
    };

    fetchContestInfo();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {(contestInfo && contestInfo[contestName] && contestInfo[contestName].contest_title) ||
            'Đăng ký kỳ thi'}
        </title>
      </Helmet>
      {(() => {
        switch (apiState.progress) {
          case API_PROGRESS.SUCCESS:
            return <RegisterFrom />;
          case API_PROGRESS.FAILED:
            return <ErrorContent content={getErrorMessage(apiState)} />;
          default:
            return <Loading />;
        }
      })()}
    </>
  );
}

export default withUserLogin(true)(ContestRegister);
