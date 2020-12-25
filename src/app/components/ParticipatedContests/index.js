import React, { useState, useEffect } from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Components
import Table from 'src/app/common-ui/Table';

// Utils
import { makeUrl } from 'src/utils/url';
import styled from 'styled-components';

// Apis
import { apiGetParticipations } from 'src/api';
import Skeleton from 'src/app/common-ui/Skeleton';

// Contants
import { TB_CONFIG } from './config';
import { ROUTE_CONTEST } from 'src/app/routes/constants';
import { API_PROGRESS } from 'src/shared/constants';

// Styles
const ContestTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
  color: var(--primary-default);
  cursor: pointer;
`;

let totalContests = 0;

function ParticipatedContests({ username }) {
  const [apiState, setApiState] = useState({
    progress: API_PROGRESS.INIT,
    code: null,
    msg: null,
  });
  const [tableConfig, setTableConfig] = useState(TB_CONFIG);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const history = useHistory();

  // Helper function to format table data
  const formatTableData = (data) => {
    return data.map((d) => {
      return {
        line: 1,
        contestName: (
          <ContestTitle
            onClick={() => history.push(makeUrl(ROUTE_CONTEST, { contestName: d.contest_name }))}
          >
            {d.contest_title || ''}
          </ContestTitle>
        ),
        ranking: parseInt(d.rank_in_contest, 10),
        rating: parseInt(d.rating, 10),
      };
    });
  };

  useEffect(() => {
    setApiState({
      progress: API_PROGRESS.REQ,
    });
    apiGetParticipations({ username }).then(
      (res) => {
        // Don't forget to handle errors
        totalContests = res.data.total;
        setTableConfig({ ...tableConfig, data: formatTableData(res.data.participations) });
      },
      [currentPageSize, currentPage],
    );
  });

  return (
    <Table
      border
      background
      config={tableConfig}
      Skeleton={false}
      isAddingNewRows={false}
      pageSize={{
        rowPerPageText: 'kỳ thi/trang',
        onClickRowPerPage: (size) => {
          setCurrentPageSize(size);
        },
      }}
      pagination={{
        numberOfPages: Math.ceil(totalContests / currentPageSize),
        onClickPage: (num) => setCurrentPage(num),
      }}
    />
  );
}
ParticipatedContests.propTypes = {
  username: PropTypes.any,
};

export default ParticipatedContests;
