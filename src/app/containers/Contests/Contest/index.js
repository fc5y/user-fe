import * as React from 'react';

// HOC
import { useParams } from 'react-router-dom';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Utils
import styled from 'styled-components';
import { formatContestTime, getContestStatus } from 'src/utils/contest';
import { getErrorMessage } from 'src/utils/getErrorMessage';

// Constants
import { API_PROGRESS, CONTEST_STATUS } from 'src/shared/constants';

// Components
import Loading from 'src/app/common-ui/Loading';
import ErrorContent from './components/ErrorContent';
import ContestEnded from './components/ContestEnded';
import ContestJustEnded from './components/ContestJustEnded';
import ContestNotStarted from './components/ContestNotStarted';
import ContestStarting from './components/ContestStarting';

const ContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 650px;
  margin-top: 30px;
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
  border-radius: 4px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContestTitle = styled.div`
  color: var(--primary-dark);
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
`;

const ContestTime = styled.div`
  color: var(--black60);
  font-size: 16px;
  margin-bottom: 5px;
`;

function Contest() {
  const { contestName } = useParams();
  const { getContestInfo, contestInfo } = React.useContext(ContestInfoContext);
  const [contestStatus, setContestStatus] = React.useState(CONTEST_STATUS.UNSET);
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
        setApiState({ progress: API_PROGRESS.FAILED, code, msg });
      } else {
        setApiState({ progress: API_PROGRESS.SUCCESS, code: null, msg: null });
      }
    };

    fetchContestInfo();
  }, []);

  React.useEffect(() => {
    setContestStatus(getContestStatus(contestInfo && contestInfo[contestName]));
  }, [contestInfo, contestName]);

  return (
    <ContainerWrapper>
      {apiState.progress === API_PROGRESS.FAILED ? (
        <ErrorContent content={getErrorMessage(apiState)} />
      ) : apiState.progress === API_PROGRESS.SUCCESS ? (
        <Container>
          <ContestTitle>
            {(contestInfo[contestName] && contestInfo[contestName].contest_title) || contestName}
          </ContestTitle>
          <ContestTime>{formatContestTime(contestInfo[contestName]).startAndEndTime}</ContestTime>
          {(() => {
            switch (contestStatus) {
              case CONTEST_STATUS.NOT_STARTED:
                return <ContestNotStarted />;
              case CONTEST_STATUS.STARTING:
                return <ContestStarting />;
              case CONTEST_STATUS.JUST_ENDED:
                return <ContestJustEnded />;
              case CONTEST_STATUS.ENDED:
                return <ContestEnded />;
              default:
                return null;
            }
          })()}
        </Container>
      ) : (
        <Loading />
      )}
    </ContainerWrapper>
  );
}

export default Contest;
