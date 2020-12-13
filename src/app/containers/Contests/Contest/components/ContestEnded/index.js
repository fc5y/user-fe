import * as React from 'react';

// Hook
import { useParams } from 'react-router-dom';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Components
import { DropDownButton } from 'src/app/common-ui/DropdownButton';

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

const NumberOfParticipants = styled.span`
  margin-left: 4px;
  font-weight: 600;
  color: var(--primary-default);
`;

const Button = styled(DropDownButton)`
  margin-top: 10px;
`;

function ContestEnded() {
  const { contestName } = useParams();
  const { contestInfo } = React.useContext(ContestInfoContext);

  const openLink = (link) => window.open(link || 'about:blank', '_blank', 'noopener noreferrer');

  return (
    <Container>
      <Text>Kỳ thi đã kết thúc</Text>
      <Text>
        Số thí sinh:
        <NumberOfParticipants>
          {(contestInfo[contestName] && contestInfo[contestName].total_participation) || 0}
        </NumberOfParticipants>
      </Text>
      <Button
        dropList={[
          {
            text: 'Đề bài',
            onClick: () => openLink(contestInfo[contestName].materials.statements_url),
          },
          {
            text: 'Bộ test',
            onClick: () => openLink(contestInfo[contestName].materials.test_data_url),
          },
          {
            text: 'Bảng điểm',
            onClick: () => openLink(contestInfo[contestName].materials.ranking_url),
          },
          {
            text: 'Lời giải',
            onClick: () => openLink(contestInfo[contestName].materials.editorial_url),
          },
          {
            text: 'Bài giải',
            onClick: () => openLink(contestInfo[contestName].materials.solution_url),
          },
        ]}
      >
        Xem tư liệu kỳ thi
      </Button>
    </Container>
  );
}

export default ContestEnded;
