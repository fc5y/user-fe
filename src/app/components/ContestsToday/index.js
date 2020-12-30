/* eslint-disable no-use-before-define */
import * as React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useHistory } from 'react-router-dom';

// Context
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Utils
import styled from 'styled-components';
import { getContestStatus, formatContestTime } from 'src/utils/contest';
import { makeUrl } from 'src/utils/url';

// Constants
import { ROUTE_CONTEST } from 'src/app/routes/constants';
import { CONTEST_STATUS, RANKING_LINK } from 'src/shared/constants';
import { TABLE_CONFIG } from './config';

// Components
import { Button } from 'src/app/common-ui/Button';
import ContestStatusText from '../ContestStatusText';
import ContestActionButton from '../ContestActionButton';
import Table from 'src/app/common-ui/Table';

const Container = styled.div`
  max-width: var(--contest-table-max-width);
  min-width: var(--contest-table-min-width);
  width: 100%;
  margin-top: 10px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  color: var(--black60);
  margin: 20px 0;
`;

const LeftInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 12px 0;
`;

const RightInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
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

const NoContestWrapper = styled.div`
  max-width: var(--contest-table-max-width);
  width: 100%;
  background: #fff;
  color: var(--black60);
  text-align: center;
  border: 1px solid var(--black06);
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
  padding: 20px 0;
  margin-bottom: 20px;
`;

function ContestsToday({ contests, isLoading }) {
  const [tableConfig, setTableConfig] = React.useState(TABLE_CONFIG);
  const { userInfo } = React.useContext(UserInfoContext);
  const { contestServerTime } = React.useContext(ContestInfoContext);
  const history = useHistory();

  // Keep a map of "show" state of ranking button based on contest name
  const [showRankingButton, setShowRankingButton] = React.useState({});

  React.useEffect(() => {
    setTableConfig({ ...tableConfig, data: formatTableData(contests) });
  }, [contests, userInfo, isLoading, showRankingButton]);

  // Helper function to format table data
  const formatTableData = (data) => {
    return data.map((d) => {
      const status = getContestStatus(d, contestServerTime);

      return {
        contestInfos: (
          <LeftInfo>
            <ContestTitle
              onClick={() => history.push(makeUrl(ROUTE_CONTEST, { contestName: d.contest_name }))}
            >
              {d.contest_title}
            </ContestTitle>
            <ContestTime>{formatContestTime(d).fullTime}</ContestTime>
            <ContestStatusText status={status} numberOfParticipants={d.total_participations} />
          </LeftInfo>
        ),
        actions: (
          <RightInfo>
            {(status === CONTEST_STATUS.STARTING ||
              (status === CONTEST_STATUS.NOT_STARTED && showRankingButton[d.contest_name])) && (
              <RankingButton
                onClick={() => window.open(RANKING_LINK, '_blank', 'noopener noreferrer')}
              >
                Bảng điểm
              </RankingButton>
            )}
            <ContestActionButton
              buttonWidth="200"
              contestInfo={d}
              onChangeToStarting={() =>
                setShowRankingButton({ ...showRankingButton, [d.contest_name]: true })
              }
            />
          </RightInfo>
        ),
      };
    });
  };

  return (
    <Container>
      <Title>Hôm nay</Title>
      {!isLoading && contests && !contests.length ? (
        <NoContestWrapper>Không có kỳ thi nào hôm nay</NoContestWrapper>
      ) : (
        <Table border background config={tableConfig} showSkeleton={isLoading} />
      )}
    </Container>
  );
}

ContestsToday.propTypes = {
  contests: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default ContestsToday;
