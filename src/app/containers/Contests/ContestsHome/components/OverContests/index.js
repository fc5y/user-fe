import * as React from 'react';

// Utils
import styled from 'styled-components';

// Components
import Table from 'src/app/common-ui/Table';
import { DropDownButton } from 'src/app/common-ui/DropdownButton';

const Container = styled.div`
  width: var(--contest-table-width);
  margin-top: 20px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
`;

const TABLE_CONFIG = {
  colWidths: [null, 130, 130, 100, 250],
  colNames: ['contestName', 'day', 'hour', 'numberOfParticipants', 'contestFiles'],
  titles: ['Kỳ thi', 'Ngày', 'Giờ', 'Số thí sinh', 'Tư liệu kỳ thi'],
  data: Array(5).fill({
    contestName: (
      <div onClick={() => console.log('click')} type="button">
        Free Contest 999
      </div>
    ),
    day: '30/12/2015',
    hour: '19:30 - 22:30',
    numberOfParticipants: '200',
    contestFiles: (
      <DropDownButton
        dropList={[
          {
            text: 'Đề bài',
            onClick: () => console.log('a'),
          },
          {
            text: 'Bộ test',
            onClick: () => console.log('a'),
          },
        ]}
      >
        Xem tự liệu kỳ thi
      </DropDownButton>
    ),
  }),
};

function OverContests() {
  return (
    <Container>
      <Title>Đã diễn ra</Title>
      <Table
        border
        background
        config={TABLE_CONFIG}
        pageSize={{
          rowPerPageText: 'kỳ thi/trang',
          onClickRowPerPage: (num) => console.log(num),
        }}
        pagination={{
          numberOfPages: 10,
          onClickPage: (num) => console.log(num),
        }}
      />
    </Container>
  );
}

export default OverContests;
