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

// Contants
import { TB_CONFIG } from './config';
import { ROUTE_CONTEST } from 'src/app/routes/constants';

// Styles
const ContestTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
  color: var(--primary-default);
  cursor: pointer;
`;

function ParticipatedContests({ username, rating }) {
  const [tableConfig, setTableConfig] = useState(TB_CONFIG);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const history = useHistory();
  const [totalContests, setTotalContests] = useState(0);
  // Helper function to format table data
  const formatTableData = (data) => {
    return data.map((d, i) => {
      return {
        index: i + 1 + (currentPage - 1) * currentPageSize,
        contestName: (
          <ContestTitle
            onClick={() => history.push(makeUrl(ROUTE_CONTEST, { contestName: d.name }))}
          >
            {d.title || ''}
          </ContestTitle>
        ),
        ranking: `${
          rating === '—' || rating === null || rating === undefined ? '–' : d.rank_in_contest
        }/${d.contest_total_participations}`,
        rating:
          rating === '—' || rating === null || rating === undefined ? (
            '–'
          ) : (
            <>
              {d.rating}
              <span
                className={
                  parseInt(d.rating_change, 10) < 0 ? styles.ratingRed : styles.ratingGreen
                }
              >
                ({d.rating_change})
              </span>
            </>
          ),
      };
    });
  };

  useEffect(() => {
    apiGetParticipations({
      username,
      offset: (currentPage - 1) * currentPageSize,
      limit: currentPageSize,
    }).then((res) => {
      setTotalContests(res.data.total);
      setTableConfig({ ...tableConfig, data: formatTableData(res.data.participations) });
    });
  }, [currentPageSize, currentPage]);

  return (
    <Table
      background
      config={tableConfig}
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
  rating: PropTypes.any,
};

export default ParticipatedContests;
