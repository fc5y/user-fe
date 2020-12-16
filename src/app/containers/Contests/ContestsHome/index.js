import * as React from 'react';

// Components
import Table from 'src/app/common-ui/Table';

const TABLE_CONFIG = {
  numberOfCol: 4,
  colNames: ['contestName', 'day', 'hour', 'numberOfParticipants', 'contestFiles'],
  titles: ['Kỳ thi', 'Ngày', 'Giờ', 'Số thí sinh', 'Tư liệu kỳ thi'],
  data: [
    {
      contestName: 'Free Contest 998',
      day: '30/12/2015',
      hour: '19:30 - 22:30',
      numberOfParticipants: '200',
      contestFiles: 'Tư liệu kỳ thi',
    },
    {
      contestName: 'Free Contest 998',
      day: '30/12/2015',
      hour: '19:30 - 22:30',
      numberOfParticipants: '200',
      contestFiles: 'Tư liệu kỳ thi',
    },
  ],
};

function Contests() {
  return <Table config={TABLE_CONFIG} />;
}

export default Contests;
