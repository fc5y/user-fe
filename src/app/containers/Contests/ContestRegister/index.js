import * as React from 'react';

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
import { API_PROGRESS } from 'src/shared/constants';
import { getErrorMessage } from 'src/utils/getErrorMessage';

function ContestRegister() {
  const { contestName } = useParams();
  const { getContestInfo } = React.useContext(ContestInfoContext);
  const [isRegisterEnable, setIsRegisterEnable] = React.useState(null);
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    code: null,
    msg: null,
  });

  React.useEffect(() => {
    const fetchContestInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ });
      const { code, msg } = await getContestInfo({ contestName });

      if (code) {
        setApiState({
          progress: API_PROGRESS.FAILED,
          code,
          msg,
        });
        setIsRegisterEnable(false);
      } else {
        setApiState({ progress: API_PROGRESS.SUCCESS, code: null, msg: null });
        setIsRegisterEnable(true);
      }
    };

    fetchContestInfo();
  }, []);

  return isRegisterEnable === null ? (
    <Loading />
  ) : isRegisterEnable ? (
    <RegisterFrom />
  ) : (
    <ErrorContent content={getErrorMessage(apiState)} />
  );
}

export default withUserLogin(true)(ContestRegister);
