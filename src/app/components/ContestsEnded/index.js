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
import ContestActionButton from 'src/app/components/ContestActionButton';

// Constants
import { ROUTE_CONTEST } from 'src/app/routes/constants';

import { TABLE_CONFIG } from './config';

const Container = styled.div`
  max-width: var(--contest-table-max-width);
  min-width: var(--contest-table-min-width);
  width: 100%;
  margin-top: 10px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
  margin-top: 0;
  color: var(--black60);
`;

const ContestTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
  color: var(--primary-default);
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoContestWrapper = styled.div`
  max-width: var(--contest-table-max-width);
  width: 100%;
  background: #fff;
  color: var(--black60);
  text-align: center;
  border: 1px solid var(--black06);
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
  padding: 20px 0;
  margin-bottom: 20px;
`;

function ContestsEnded({
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
      return {
        contestName: (
          <ContestTitle
            onClick={() => history.push(makeUrl(ROUTE_CONTEST, { contestName: d.name }))}
          >
            {d.title || ''}
          </ContestTitle>
        ),
        day: startDate,
        hour: startAndEndTime,
        numberOfParticipants: parseInt(d.total_participations, 10),
        actions: (
          <ButtonWrapper>
            <ContestActionButton contestInfo={d} buttonWidth="200" />
          </ButtonWrapper>
        ),
      };
    });
  };

  return (
    <Container>
      <Title>Các kỳ thi đã diễn ra</Title>
      {!isLoading && contests && !contests.length ? (
        <NoContestWrapper>Không có kỳ thi nào đã diễn ra</NoContestWrapper>
      ) : (
        <Table
          border
          background
          config={tableConfig}
          showSkeleton={isLoading}
          isAddingNewRows={isAddingNewRows}
          pageSize={
            !!onClickPageSize && {
              rowPerPageText: 'kỳ thi/trang',
              onClickRowPerPage: (size) => {
                setCurrentLimit(size);
                onClickPageSize(size);
              },
            }
          }
          pagination={
            !!onClickPageNumber && {
              numberOfPages: Math.ceil(totalContests / currentLimit),
              onClickPage: (num) => onClickPageNumber(num),
            }
          }
        />
      )}
    </Container>
  );
}

ContestsEnded.propTypes = {
  contests: PropTypes.any,
  isLoading: PropTypes.bool,
  isAddingNewRows: PropTypes.bool,
  totalContests: PropTypes.number,
  onClickPageSize: PropTypes.func,
  onClickPageNumber: PropTypes.func,
};

export default ContestsEnded;
