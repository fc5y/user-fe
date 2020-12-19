/* eslint-disable no-use-before-define */
import * as React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useHistory } from 'react-router-dom';

// Utils
import styled from 'styled-components';
import { formatContestTime } from 'src/utils/contest';
import { makeUrl } from 'src/utils/url';

// Components
import Table from 'src/app/common-ui/Table';
import { DropDownButton } from 'src/app/common-ui/DropdownButton';

// Constants
import { ROUTE_CONTEST } from 'src/app/routes/constants';

import { TABLE_CONFIG } from './config';

const Container = styled.div`
  max-width: var(--contest-table-max-width);
  min-width: var(--contest-table-min-width);
  margin: 20px 10px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
  margin-top: 0;
`;

const ContestTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
  color: var(--primary-default);
  cursor: pointer;
`;

function EndedContests({
  isLoading,
  contests,
  onClickPageSize,
  onClickPageNumber,
  totalContests,
  isAddingNewRows,
}) {
  const [tableConfig, setTableConfig] = React.useState(TABLE_CONFIG);
  const [currentLimit, setCurrentLimit] = React.useState(10);
  const history = useHistory();

  React.useEffect(() => {
    setTableConfig({ ...tableConfig, data: formatTableData(contests) });
  }, [isLoading, contests]);

  // Helper function to format table data
  const formatTableData = (data) => {
    return data.map((d) => {
      const { startDate, startAndEndTime } = formatContestTime(d);
      const openLink = (link) =>
        window.open(link || 'about:blank', '_blank', 'noopener noreferrer');

      return {
        contestName: (
          <ContestTitle
            onClick={() => history.push(makeUrl(ROUTE_CONTEST, { contestName: d.contest_name }))}
          >
            {d.contest_title || ''}
          </ContestTitle>
        ),
        day: startDate,
        hour: startAndEndTime,
        numberOfParticipants: parseInt(d.total_participation, 10),
        actions: (
          <DropDownButton
            dropList={[
              {
                text: 'Đề bài',
                onClick: () => openLink(d.materials.statements_url),
              },
              {
                text: 'Bộ test',
                onClick: () => openLink(d.materials.test_data_url),
              },
              {
                text: 'Bảng điểm',
                onClick: () => openLink(d.materials.ranking_url),
              },
              {
                text: 'Lời giải',
                onClick: () => openLink(d.materials.editorial_url),
              },
              {
                text: 'Bài giải',
                onClick: () => openLink(d.materials.solution_url),
              },
            ]}
          >
            Xem tự liệu kỳ thi
          </DropDownButton>
        ),
      };
    });
  };

  if (!isLoading && contests && !contests.length) {
    return null;
  }

  return (
    <Container>
      <Title>Các kỳ thi đã diễn ra</Title>
      <Table
        border
        background
        config={tableConfig}
        showSkeleton={isLoading}
        isAddingNewRows={isAddingNewRows}
        pageSize={{
          rowPerPageText: 'kỳ thi/trang',
          onClickRowPerPage: (size) => {
            setCurrentLimit(size);
            onClickPageSize(size);
          },
        }}
        pagination={{
          numberOfPages: Math.ceil(totalContests / currentLimit),
          onClickPage: (num) => onClickPageNumber(num),
        }}
      />
    </Container>
  );
}

EndedContests.propTypes = {
  contests: PropTypes.any,
  isLoading: PropTypes.bool,
  isAddingNewRows: PropTypes.bool,
  totalContests: PropTypes.number,
  onClickPageSize: PropTypes.func,
  onClickPageNumber: PropTypes.func,
};

export default EndedContests;
