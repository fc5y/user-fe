import * as React from 'react';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Components
import OngoingContest from './components/OngoingContests';
import EndedContests from './components/EndedContests';

// Utils and constants
import styled from 'styled-components';
import { API_PROGRESS } from 'src/shared/constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Contests() {
  const [onGoingContests, setOnGoingContests] = React.useState([]);
  const [endedContests, setEndedContests] = React.useState([]);
  const [currentLimit, setCurrentLimit] = React.useState(10);
  const [currentOffset, setCurrentOffset] = React.useState(0);
  const [isAddingNewRows, setIsAddingNewRows] = React.useState(false);
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    code: null,
    msg: null,
  });
  const { getAllContestInfo, totalContests, contests } = React.useContext(ContestInfoContext);

  // Fetch new contests
  React.useEffect(() => {
    const fetchContestsInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ, code: null, msg: null });
      const { code, data, msg } = await getAllContestInfo({
        offset: currentOffset,
        limit: currentLimit,
      });

      if (code || !data || !data.contests) {
        setIsAddingNewRows(false);
        setApiState({ progress: API_PROGRESS.FAILED, code, msg });
      } else {
        // TODO: Filter this
        setOnGoingContests(data.contests);
        setEndedContests(data.contests);
        setIsAddingNewRows(false);
        setApiState({ progress: API_PROGRESS.SUCCESS, code: null, msg: null });
      }
    };

    fetchContestsInfo();
  }, [currentLimit, currentOffset]);

  // Get contests from old data and show first
  React.useEffect(() => {
    const currentContests = contests
      .slice(currentOffset, currentOffset + currentLimit)
      .filter((c) => !!c);

    if (currentContests.length) {
      // TODO: Filter this
      setOnGoingContests(currentContests);
      setEndedContests(currentContests);
    } else {
      setOnGoingContests([]);
      setEndedContests([]);
    }
  }, [contests, currentLimit, currentOffset]);

  return (
    <Container>
      <OngoingContest
        isLoading={apiState.progress === API_PROGRESS.REQ}
        contests={onGoingContests}
        totalContests={totalContests}
        onClickPageSize={() => {}}
        onClickPageNumber={() => {}}
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
