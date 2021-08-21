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
import ErrorContent from 'src/app/components/ErrorContent';
import Loading from 'src/app/common-ui/Loading';

// Constants and utils
import { getContestStatus } from 'src/utils/contest';
import { API_PROGRESS, CONTEST_STATUS, API_ERROR } from 'src/shared/constants';
import { getErrorMessage } from 'src/utils/getErrorMessage';

function ContestRegister() {
  const { contestName } = useParams();
  const { getContestInfoByName, contestInfo, contestServerTime } = React.useContext(
    ContestInfoContext,
  );
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    error: null,
    error_msg: null,
  });

  React.useEffect(() => {
    const fetchContestInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ });
      const { error, error_msg, data } = await getContestInfoByName({
        contestName,
      });

      if (error || !data) {
        setApiState({
          progress: API_PROGRESS.FAILED,
          error,
          error_msg,
        });
        return null;
      }

      const status = getContestStatus(data.contest, contestServerTime);
      if (status === CONTEST_STATUS.JUST_ENDED || status === CONTEST_STATUS.ENDED) {
        setApiState({
          progress: API_PROGRESS.FAILED,
          error: API_ERROR.CONTEST_OVER,
          error_msg: null,
        });
      } else {
        setApiState({ progress: API_PROGRESS.SUCCESS, error: null, error_msg: null });
      }
    };

    fetchContestInfo();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {(contestInfo && contestInfo[contestName] && contestInfo[contestName].title) ||
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
