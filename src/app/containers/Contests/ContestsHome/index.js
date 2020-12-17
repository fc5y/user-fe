import * as React from 'react';

// Components
import OngoingContest from './components/OngoingContests';
import OverContests from './components/OverContests';

// Utils
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Contests() {
  return (
    <Container>
      <OngoingContest />
      <OverContests />
    </Container>
  );
}

export default Contests;
