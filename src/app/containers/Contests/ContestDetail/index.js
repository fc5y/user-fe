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
import cx from 'classnames';
import styles from './style.scss';

// Constants
import {
  API_PROGRESS,
  CONTEST_STATUS,
  RANKING_LINK,
  CONTEST_MATERIALS_KEY_MAP,
} from 'src/shared/constants';

// Components
import { Button, PrimaryButton } from 'src/app/common-ui/Button';
import Clock from 'src/app/components/Clock';
import Loading from 'src/app/common-ui/Loading';
import ErrorContent from 'src/app/components/ErrorContent';
import IconWarning from 'src/app/common-ui/Icons/IconWarning';
import ContestStatusText from 'src/app/components/ContestStatusText';
import ContestActionButton from 'src/app/components/ContestActionButton';
import ButtonContestDocument from 'src/app/components/ButtonContestDocument';

const ContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 650px;
  margin-top: 48px;
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
    erorr: null,
    error_msg: null,
  });
  const { count, status } = useContestCountDown({
    userInfo,
    contestInfo: contestInfo[contestName],
    contestServerTime,
  });

  React.useEffect(() => {
    const fetchContestInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ });
      const { erorr, error_msg } = await getContestInfoByName({ contestName });

      if (erorr) {
        setApiState({
          progress: API_PROGRESS.FAILED,
          erorr,
          error_msg,
        });
        setApiState({ progress: API_PROGRESS.FAILED, erorr, error_msg });
      } else {
        setApiState({ progress: API_PROGRESS.SUCCESS, erorr: null, error_msg: null });
      }
    };

    fetchContestInfo();
  }, []);

  return (
    <ContainerWrapper>
      <Helmet>
        <title>
          {(contestInfo && contestInfo[contestName] && contestInfo[contestName].title) ||
            'Các kỳ thi'}
        </title>
      </Helmet>
      {apiState.progress === API_PROGRESS.FAILED ? (
        <ErrorContent content={getErrorMessage(apiState)} />
      ) : apiState.progress === API_PROGRESS.SUCCESS ? (
        <Container>
          <ContestTitle>
            {(contestInfo[contestName] && contestInfo[contestName].title) || contestName}
          </ContestTitle>
          <ContestTime>{formatContestTime(contestInfo[contestName]).fullTimeWithUTC}</ContestTime>
          <ContestStatus
            status={status}
            numberOfParticipants={contestInfo[contestName].total_participations}
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
                  <div className={cx(styles.documentContestPage)}>
                    <div className={cx(styles.documentContestPage__content)}>
                      <div className={cx(styles.documentContestPage__content__title)}>
                        <div className={cx(styles.line)}>
                          <div></div>
                        </div>
                        <div>
                          <h4> Tư liệu kỳ thi</h4>
                        </div>
                        <div className={cx(styles.line)}>
                          <div></div>
                        </div>
                      </div>
                      <div className={cx(styles.documentContestPage__content__btn)}>
                        <div className={cx(styles.documentContestPage__content__btn__edited)}>
                          {contestInfo[contestName].materials
                            .filter((m) => m.name !== 'all_materials_url')
                            .map((m) => {
                              return (
                                <ButtonContestDocument
                                  content={CONTEST_MATERIALS_KEY_MAP[m.name]}
                                  linkUrl={m.value}
                                  key={m.name}
                                ></ButtonContestDocument>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <div className={cx(styles.actionButton)}>
                      <PrimaryButton
                        onClick={() => {
                          window.open(
                            contestInfo[contestName].materials.filter(
                              (m) => m.name === 'all_materials_url',
                            )[0].value || 'about:blank',
                            '_blank',
                            'noopener noreferrer',
                          );
                        }}
                      >
                        Xem toàn bộ
                      </PrimaryButton>
                    </div>
                  </div>
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
