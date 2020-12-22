import * as React from 'react';

// Hook
import useFetchContestInfo from 'src/shared/hook/useFetchContestsInfo';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Components
import OngoingContest from './components/OngoingContests';
import EndedContests from './components/EndedContests';
import ContestsOfToday from 'src/app/components/ContestsOfToday';

// Utils and constants
import styled from 'styled-components';
import { categorizeContestTypes } from 'src/utils/contest';
import { API_PROGRESS } from 'src/shared/constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

function Contests() {
  const [currentLimit, setCurrentLimit] = React.useState(10);
  const [currentOffset, setCurrentOffset] = React.useState(0);
  const [isAddingNewRows, setIsAddingNewRows] = React.useState(false);
  const {
    apiState,
    todayContests,
    onGoingContests,
    endedContests,
    totalContests,
  } = useFetchContestInfo({
    limit: currentLimit,
    offset: currentOffset,
    forceFetch: isAddingNewRows,
    onFetchCompleted: () => setIsAddingNewRows(false),
  });

  return (
    <Container>
      <ContestsOfToday
        isLoading={apiState.progress === API_PROGRESS.REQ && todayContests.length === 0}
        contests={todayContests}
      />
      <OngoingContest
        isLoading={apiState.progress === API_PROGRESS.REQ && onGoingContests.length === 0}
        contests={onGoingContests}
      />
      <EndedContests
        isLoading={apiState.progress === API_PROGRESS.REQ && endedContests.length === 0}
        isAddingNewRows={isAddingNewRows}
        contests={endedContests}
        totalContests={totalContests}
        onClickPageSize={(newSize) => {
          setCurrentLimit(newSize);
          setIsAddingNewRows(() => currentLimit < newSize);
        }}
        onClickPageNumber={(num) => setCurrentOffset((num - 1) * currentLimit)}
      />
    </Container>
  );
}

export default Contests;
