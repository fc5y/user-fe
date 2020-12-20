import * as React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useHistory } from 'react-router-dom';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Utils
import styled from 'styled-components';
import { getContestStatus, formatContestTime } from 'src/utils/contest';
import { makeUrl } from 'src/utils/url';

// Constants
import { ROUTE_CONTEST } from 'src/app/routes/constants';
import { CONTEST_STATUS, RANKING_LINK } from 'src/shared/constants';

// Components
import { Button } from 'src/app/common-ui/Button';
import ContestActionButton from '../ContestActionButton';

const Container = styled.div`
  max-width: var(--contest-table-max-width);
  min-width: var(--contest-table-min-width);
  margin: 20px 10px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  color: var(--black60);
  margin: 20px 0;
`;

const Row = styled.div`
  width: 100%;
  padding: 18px 12px;
  background-color: #fff;
  border: 1px solid var(--black06);
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const RightInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContestTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: var(--primary-default);
  cursor: pointer;
  margin-bottom: 5px;
`;

const ContestTime = styled.div`
  font-size: 16px;
  color: var(--black60);
  margin-bottom: 5px;
`;

const RankingButton = styled(Button)`
  margin-right: 10px;
  height: 54px;
`;

const InfoWrapper = styled.div`
  font-weight: 600;
`;

const ParticipantNumber = styled.span`
  padding: 0;
  color: var(--black60);
  margin-left: 10px;
`;

const NotStartedText = styled.span`
  padding: 0;
  color: #00bb61;
`;
const StartingText = styled.span`
  padding: 0;
  color: #fc1622;
`;
const JustEndedText = styled.span`
  padding: 0;
  color: var(--secondary-default);
`;
const EndedText = styled.span`
  padding: 0;
  color: var(--black60);
`;

function ContestsOfToday({ contests }) {
  const { contestServerTime } = React.useContext(ContestInfoContext);
  const history = useHistory();

  // Keep a map of "show" state of ranking button based on contest name
  const [showRankingButton, setShowRankingButton] = React.useState({});

  // React.useEffect(() => {
  //   const curStatus = getContestStatus(contest, contestServerTime);
  //   setStatus(curStatus);
  // }, []);

  if (!contests || !Array.isArray(contests) || !contests.length) {
    return null;
  }

  const getContestInfo = (status, num) => {
    if (!status) return null;

    return (
      <InfoWrapper>
        {(() => {
          switch (status) {
            case CONTEST_STATUS.NOT_STARTED:
              return <NotStartedText>• Sắp diễn ra</NotStartedText>;
            case CONTEST_STATUS.STARTING:
              return <StartingText>• Đang diễn ra</StartingText>;
            case CONTEST_STATUS.JUST_ENDED:
              return <JustEndedText>• Vừa mới kết thúc</JustEndedText>;
            case CONTEST_STATUS.ENDED:
              return <EndedText>• Đã kết thúc</EndedText>;
            default:
              return null;
          }
        })()}
        <ParticipantNumber>• {num} thí sinh</ParticipantNumber>
      </InfoWrapper>
    );
  };

  return (
    <Container>
      <Title>Hôm nay</Title>
      {contests.map((contest) => {
        const status = getContestStatus(contest, contestServerTime);

        return (
          <Row key={contest.contest_name}>
            <LeftInfo>
              <ContestTitle
                onClick={() =>
                  history.push(makeUrl(ROUTE_CONTEST, { contestName: contest.contest_name }))
                }
              >
                {contest.contest_title}
              </ContestTitle>
              <ContestTime>{formatContestTime(contest).fullTime}</ContestTime>
              {getContestInfo(status, contest.total_participation)}
            </LeftInfo>
            <RightInfo>
              {(status === CONTEST_STATUS.STARTING ||
                (status === CONTEST_STATUS.NOT_STARTED &&
                  showRankingButton[contest.contest_name])) && (
                <RankingButton
                  onClick={() => window.open(RANKING_LINK, '_blank', 'noopener noreferrer')}
                >
                  Bảng điểm
                </RankingButton>
              )}
              <ContestActionButton
                contestInfo={contest}
                onChangeToStarting={() =>
                  setShowRankingButton({ ...showRankingButton, [contest.contest_name]: true })
                }
              />
            </RightInfo>
          </Row>
        );
      })}
    </Container>
  );
}

ContestsOfToday.propTypes = {
  contests: PropTypes.any,
};

export default ContestsOfToday;
