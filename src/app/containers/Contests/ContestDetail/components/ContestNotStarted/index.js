import * as React from 'react';

// Hook
import { useParams, useHistory } from 'react-router-dom';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Components
import Clock from 'src/app/components/Clock';
import { PrimaryButton } from 'src/app/common-ui/Button';

// Utils
import styled from 'styled-components';
import { makeUrl } from 'src/utils/url';

// Constants
import { ROUTE_CONTEST_REGISTER } from 'src/app/routes/constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Button = styled(PrimaryButton)`
  margin-top: 40px;
`;

function ContestNotStarted() {
  const history = useHistory();
  const { contestName } = useParams();
  const { contestInfo } = React.useContext(ContestInfoContext);

  return (
    <Container>
      <Clock endTime={contestInfo[contestName].start_time} />
      <Button onClick={() => history.push(makeUrl(ROUTE_CONTEST_REGISTER, { contestName }))}>
        Đăng ký
      </Button>
    </Container>
  );
}

export default ContestNotStarted;
