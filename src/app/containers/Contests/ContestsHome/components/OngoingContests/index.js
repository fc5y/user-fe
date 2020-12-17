import * as React from 'react';

// Utils
import styled from 'styled-components';

// Components
import Table from 'src/app/common-ui/Table';

const Container = styled.div`
  width: var(--contest-table-width);
  margin-top: 20px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
`;

const TABLE_CONFIG = {
  numberOfCol: 4,
  columnWidth: [null, 130, 130, 100, 250],
  colNames: ['contestName', 'day', 'hour', 'numberOfParticipants', 'contestFiles'],
  titles: ['Kỳ thi', 'Ngày', 'Giờ', 'Số thí sinh', 'Tư liệu kỳ thi'],
  data: [
    {
      contestName: (
        <div onClick={() => console.log('click')} type="button">
          Free Contest 999
        </div>
      ),
      day: '30/12/2015',
      hour: '19:30 - 22:30',
      numberOfParticipants: '200',
      contestFiles: 'Tư liệu kỳ thi',
    },
    {
      contestName: (
        <div onClick={() => console.log('click')} type="button">
          Free Contest 999
        </div>
      ),
      day: '30/12/2015',
      hour: '19:30 - 22:30',
      numberOfParticipants: '200',
      contestFiles: 'Tư liệu kỳ thi',
    },
    {
      contestName: (
        <div onClick={() => console.log('click')} type="button">
          Free Contest 999
        </div>
      ),
      day: '30/12/2015',
      hour: '19:30 - 22:30',
      numberOfParticipants: '200',
      contestFiles: 'Tư liệu kỳ thi',
    },
  ],
};

function OngoingContests() {
  return (
    <Container>
      <Title>Sắp/đang diễn ra</Title>
      <Table border background config={TABLE_CONFIG} />
    </Container>
  );
}

export default OngoingContests;
