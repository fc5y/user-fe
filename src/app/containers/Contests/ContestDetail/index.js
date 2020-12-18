import * as React from 'react';
import { Helmet } from 'react-helmet';

// Hook
import useContestCountDown from 'src/shared/hook/useContestCountDown';

// HOC
import { useParams } from 'react-router-dom';

// Context
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Utils
import styled from 'styled-components';
import { formatContestTime } from 'src/utils/contest';
import { getErrorMessage } from 'src/utils/getErrorMessage';

// Constants
import { API_PROGRESS, CONTEST_STATUS, RANKING_LINK } from 'src/shared/constants';

// Components
import { Button } from 'src/app/common-ui/Button';
import Clock from 'src/app/components/Clock';
import Loading from 'src/app/common-ui/Loading';
import ErrorContent from './components/ErrorContent';
import IconWarning from 'src/app/common-ui/Icons/IconWarning';
import ContestStatusText from 'src/app/components/ContestStatusText';
import ContestActionButton from 'src/app/components/ContestActionButton';

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
  margin-bottom: 10px;
`;

const ContestStatus = styled(ContestStatusText)`
  margin-bottom: 35px;
`;

const ContestActionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContestFooterWrapper = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RankingButton = styled(Button)`
  margin-left: 10px;
  height: 42px;
`;

const Icon = styled(IconWarning)`
  width: 20px;
  height: 20px;
`;

const Text = styled.div`
  font-weight: 600;
  color: var(--black60);
  margin: 5px;
`;

function ContestDetail() {
  const { contestName } = useParams();
  const { userInfo } = React.useContext(UserInfoContext);
  const { getContestInfoByName, contestInfo, contestServerTime } = React.useContext(
    ContestInfoContext,
  );
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    code: null,
    msg: null,
  });
  const { count, status } = useContestCountDown({
    userInfo,
    contestInfo: contestInfo[contestName],
    contestServerTime,
  });

  React.useEffect(() => {
    const fetchContestInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ });
      const { code, msg } = await getContestInfoByName({ contestName });

      if (code) {
        setApiState({
          progress: API_PROGRESS.FAILED,
          code,
          msg,
        });
        setApiState({ progress: API_PROGRESS.FAILED, code, msg });
        console.log('ok');
      } else {
        console('fuck');
        setApiState({ progress: API_PROGRESS.SUCCESS, code: 1, msg: null });
      }
    };

    fetchContestInfo();
  }, []);

  return (
    <ContainerWrapper>
      <Helmet>
        <title>
          {(contestInfo && contestInfo[contestName] && contestInfo[contestName].contest_title) ||
            'Các kỳ thi'}
        </title>
      </Helmet>
      {apiState.progress === API_PROGRESS.FAILED ? (
        <ErrorContent content={getErrorMessage(apiState)} />
      ) : apiState.progress === API_PROGRESS.SUCCESS ? (
        <Container>
          <ContestTitle>
            {(contestInfo[contestName] && contestInfo[contestName].contest_title) || contestName}
          </ContestTitle>
          <ContestTime>{formatContestTime(contestInfo[contestName]).fullTimeWithUTC}</ContestTime>
          <ContestStatus
            status={status}
            numberOfParticipants={contestInfo[contestName].total_participation}
          />
          {(() => {
            switch (status) {
              case CONTEST_STATUS.NOT_STARTED:
              case CONTEST_STATUS.STARTING:
              case CONTEST_STATUS.JUST_ENDED:
                return (
                  <ContestActionWrapper>
                    <Clock count={count} />
                    {(status === CONTEST_STATUS.NOT_STARTED ||
                      status === CONTEST_STATUS.STARTING) && (
                      <ContestFooterWrapper>
                        <ContestActionButton
                          contestInfo={contestInfo[contestName]}
                          withTime={false}
                        />
                        {status === CONTEST_STATUS.STARTING && (
                          <RankingButton
                            onClick={() =>
                              window.open(RANKING_LINK, '_blank', 'noopener noreferrer')
                            }
                          >
                            Bảng điểm
                          </RankingButton>
                        )}
                      </ContestFooterWrapper>
                    )}
                    {status === CONTEST_STATUS.JUST_ENDED && (
                      <ContestFooterWrapper>
                        <Icon />
                        <Text>Tư liệu kỳ thi sẽ được đăng lên trong ít phút nữa</Text>
                      </ContestFooterWrapper>
                    )}
                  </ContestActionWrapper>
                );
              case CONTEST_STATUS.ENDED:
                return (
                  <ContestActionButton
                    contestInfo={contestInfo[contestName]}
                    withTime={false}
                    materialButtonType="primary"
                    buttonWidth="240"
                  />
                );
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

export default ContestDetail;
