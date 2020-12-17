import * as React from 'react';

// Utils
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-weight: 600;
  color: var(--black60);
  margin: 5px;
`;

function ContestJustEnded() {
  return (
    <Container>
      <Text>Kỳ thi vừa mới kết thúc</Text>
      <Text>Tài liệu kỳ thi sẽ được đăng lên trong chốc lát</Text>
    </Container>
  );
}

export default ContestJustEnded;
