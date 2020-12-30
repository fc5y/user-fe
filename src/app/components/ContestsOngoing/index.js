/* eslint-disable no-use-before-define */
import * as React from 'react';
import PropTypes from 'prop-types';

// Context
import { UserInfoContext } from 'src/shared/context/UserInfo';

// Hook
import { useHistory } from 'react-router-dom';

// Utils
import styled from 'styled-components';
import { formatContestTime } from 'src/utils/contest';
import { makeUrl } from 'src/utils/url';

// Components
import Table from 'src/app/common-ui/Table';
import ContestActionButton from 'src/app/components/ContestActionButton';

// Constants
import { ROUTE_CONTEST } from 'src/app/routes/constants';

import { TABLE_CONFIG } from './config';

const Container = styled.div`
  max-width: var(--contest-table-max-width);
  min-width: var(--contest-table-min-width);
  width: 100%;
  margin-top: 10px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
  margin-top: 0;
  color: var(--black60);
`;

const ContestTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
  color: var(--primary-default);
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

function ContestsOnGoing({ isLoading, contests }) {
  const [tableConfig, setTableConfig] = React.useState(TABLE_CONFIG);
  const { userInfo } = React.useContext(UserInfoContext);
  const history = useHistory();

  React.useEffect(() => {
    setTableConfig({ ...tableConfig, data: formatTableData(contests) });
  }, [isLoading, contests, userInfo]);

  // Helper function to format table data
  const formatTableData = (data) => {
    return data.map((d) => {
      const { startDate, startAndEndTime } = formatContestTime(d);

      return {
        contestName: (
          <ContestTitle
            onClick={() => history.push(makeUrl(ROUTE_CONTEST, { contestName: d.contest_name }))}
          >
            {d.contest_title || ''}
          </ContestTitle>
        ),
        day: startDate,
        hour: startAndEndTime,
        numberOfParticipants: parseInt(d.total_participations, 10),
        actions: (
          <ButtonWrapper>
            <ContestActionButton buttonWidth="200" contestInfo={d} />
          </ButtonWrapper>
        ),
      };
    });
  };

  return (
    <Container>
      <Title>Các kỳ thi sắp/đang diễn ra</Title>
      {!isLoading && contests && !contests.length ? (
        <NoContestWrapper>Không có kỳ thi nào sắp/đang diễn ra</NoContestWrapper>
      ) : (
        <Table border background config={tableConfig} showSkeleton={isLoading} />
      )}
    </Container>
  );
}

ContestsOnGoing.propTypes = {
  contests: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default ContestsOnGoing;
