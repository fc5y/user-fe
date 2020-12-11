import React, { useState, useEffect } from 'react';
import styles from './style.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { get } from '../../../utils/fetchUtils';

const pastContestsPerPage = 10;
let numberOfContests = 0;

function splitPages(numberOfItems, itemsPerPage, page) {
  if (Math.ceil(numberOfItems / itemsPerPage) <= 5) {
    return [1, Math.ceil(numberOfItems / itemsPerPage)];
  } else {
    const [first, last] = [1, Math.ceil(numberOfItems / itemsPerPage)];
    let [from, to] = [page - 2, page + 2];
    if (to > last) {
      from -= to - last;
      to = last;
    } else if (from < first) {
      to += first - from;
      from = first;
    }
    return [from, to];
  }
}

function ParticipatedContests({ token, username }) {
  const [page, setPage] = useState(1);
  const [pastContests, setPastContests] = useState([]);
  useEffect(() => {
    get(
      /*
      `https://test.api.freecontest.net/api/v1/participations?username=${username}&offset=${
        (page - 1) * pastContestsPerPage
      }&limit=${pastContestsPerPage}`, */
      'https://my-json-server.typicode.com/upi05/mock_API_for_Fc5y/participations',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      true,
    ).then((res) => {
      // Don't forget to handle errors
      numberOfContests = res.data.data.total;
      setPastContests(res.data.data.participations);
    });
  }, []);

  const trList = pastContests.map((contest) => (
    <tr className={styles.rowContest} key={contest.id}>
      <th className={styles.tableNumber}>{contest.id}</th>
      <th className={styles.tableContest}>
        <Link to={`/contest/${contest.id}`}>{contest.contest_title}</Link>
      </th>
      <th className={styles.tableRanking}>
        {contest.rank_in_contest}/{contest.contest_total_participations}
      </th>
      <th className={styles.tableRating}>
        {contest.rating}
        <span style={contest.rating_change < 0 ? { color: '#fd424b' } : { color: '#12cf74' }}>
          {' '}
          ({contest.rating_change})
        </span>
      </th>
    </tr>
  ));

  // Generate pages number, need to be modified
  const pagesList = [];
  const [from, to] = splitPages(numberOfContests, pastContestsPerPage, page);
  for (let i = from; i <= to; i += 1) pagesList.push(i);
  return (
    <div className={styles.pastContest}>
      <div className={styles.pastContestTitle}>Các kỳ thi đã đăng ký</div>
      <div className={styles.pastContestContent}>
        <table>
          <tbody>
            <tr>
              <th className={styles.tableNumber}>#</th>
              <th className={styles.tableContest}>Kỳ thi</th>
              <th className={styles.tableRanking}>Thứ hạng</th>
              <th className={styles.tableRating}>Rating</th>
            </tr>
            {trList}
          </tbody>
        </table>
      </div>
      <div className={styles.pastContestPage}>
        <span>
          <strong>Trang</strong>
          {pagesList[0] !== 1 ? <strong>...</strong> : ''}
          <span>
            {pagesList.map((index) => (
              <strong
                key={index}
                style={page === index ? { color: 'red' } : {}}
                onClick={() => setPage(index)}
              >
                {index}
              </strong>
            ))}
          </span>
          {pagesList[pagesList.length - 1] !==
          Math.ceil(pastContests.length / pastContestsPerPage) ? (
            <strong>...</strong>
          ) : (
            ''
          )}
        </span>
      </div>
    </div>
  );
}
ParticipatedContests.propTypes = {
  token: PropTypes.any,
  username: PropTypes.any,
};

export default ParticipatedContests;
