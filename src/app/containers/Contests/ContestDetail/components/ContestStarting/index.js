import * as React from 'react';

// Hook
import { useParams, useHistory } from 'react-router-dom';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Components
import Clock from 'src/app/components/Clock';
import { SecondaryButton } from 'src/app/common-ui/Button';

// Utils
import styled from 'styled-components';
import { makeUrl } from 'src/utils/url';

// Constants
import { ROUTE_CONTEST_ENTER } from 'src/app/routes/constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Title = styled.div`
  color: var(--black60);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Button = styled(SecondaryButton)`
  margin-top: 5px;
`;

function ContestStarting() {
  const history = useHistory();
  const { contestName } = useParams();
  const { contestInfo } = React.useContext(ContestInfoContext);

  return (
    <Container>
      <Title>Kỳ thi sẽ kết thúc sau:</Title>
      <Clock endTime={contestInfo[contestName].start_time + contestInfo[contestName].duration} />
      <Button onClick={() => history.push(makeUrl(ROUTE_CONTEST_ENTER, { contestName }))}>
        Vào thi
      </Button>
    </Container>
  );
}

export default ContestStarting;
