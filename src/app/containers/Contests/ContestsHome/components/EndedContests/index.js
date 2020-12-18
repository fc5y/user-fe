/* eslint-disable no-use-before-define */
import * as React from 'react';

// Hook
import { useHistory } from 'react-router-dom';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Utils
import styled from 'styled-components';
import { formatContestTime } from 'src/utils/contest';
import { makeUrl } from 'src/utils/url';

// Components
import Table from 'src/app/common-ui/Table';
import { DropDownButton } from 'src/app/common-ui/DropdownButton';

// Constants
import { ROUTE_CONTEST } from 'src/app/routes/constants';
import { API_PROGRESS } from 'src/shared/constants';
import { TABLE_CONFIG } from './config';

const Container = styled.div`
  width: var(--contest-table-width);
  margin-top: 20px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
`;

const ContestTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
  color: var(--primary-default);
  cursor: pointer;
`;

function OverContests() {
  const [tableConfig, setTableConfig] = React.useState(TABLE_CONFIG);
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    code: null,
    msg: null,
  });
  const { getAllContestInfo } = React.useContext(ContestInfoContext);
  const history = useHistory();

  React.useEffect(() => {
    const fetchContestsInfo = async () => {
      setApiState({ progress: API_PROGRESS.REQ, code: null, msg: null });
      const { code, data, msg } = await getAllContestInfo({ offset: 0, limit: 10 });

      if (code || !data || !data.contests) {
        setApiState({ progress: API_PROGRESS.FAILED, code, msg });
      } else {
        setTableConfig({ ...tableConfig, data: formatTableData(data.contests) });
        setApiState({ progress: API_PROGRESS.SUCCESS, code: null, msg: null });
      }
    };

    fetchContestsInfo();
  }, []);

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
        contestFiles: (
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

  return (
    <Container>
      <Title>Đã diễn ra</Title>
      <Table
        border
        background
        config={tableConfig}
        showSkeleton={apiState.progress === API_PROGRESS.REQ}
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
