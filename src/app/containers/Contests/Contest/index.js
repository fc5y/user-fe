import * as React from 'react';

// HOC
import { useParams } from 'react-router-dom';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Utils
import styled from 'styled-components';
import { getErrorMessage } from 'src/utils/getErrorMessage';

// Constants
import { API_PROGRESS } from 'src/shared/constants';

// Components
import Loading from 'src/app/common-ui/Loading';
import ErrorContent from './components/ErrorContent';

const ContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: var(--content-width);
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
  color: var(--primary-default);
  font-weight: bold;
  font-size: 44px;
  margin-bottom: 20px;
`;

const ContestTime = styled.div`
  color: var(--black60);
`;

function Contest() {
  const { contestName } = useParams();
  const { getContestInfo } = React.useContext(ContestInfoContext);
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

  return (
    <ContainerWrapper>
      {apiState.progress === API_PROGRESS.FAILED ? (
        <ErrorContent content={getErrorMessage(apiState)} />
      ) : apiState.progress === API_PROGRESS.SUCCESS ? (
        <Container>
          <ContestTitle>Free Contest 121</ContestTitle>
          <ContestTime>28/11/2020 19:30 - 22:30</ContestTime>
        </Container>
      ) : (
        <Loading />
      )}
    </ContainerWrapper>
  );
}

export default Contest;
