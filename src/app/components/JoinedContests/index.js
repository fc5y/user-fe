import React, { useState } from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';

import { get } from '../../../utils/fetchUtils';

const pastContestsPerPage = 2;

function getPastContestsOfPage(numberOfItems, itemsPerPage, currentPage) {
  if (currentPage <= 0 || currentPage > Math.ceil(numberOfItems / itemsPerPage)) return [0, 0];
  if (Math.floor(numberOfItems / itemsPerPage) >= currentPage) {
    return [itemsPerPage * (currentPage - 1) + 1, currentPage * itemsPerPage];
  } else {
    return [(Math.ceil(numberOfItems / itemsPerPage) - 1) * itemsPerPage + 1, numberOfItems];
  }
}

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

function JoinedContests({ token }) {
  const [pastContests, setPastContests] = useState([]);
  const [page, setPage] = useState(1);
  const pagesList = [];
  const [from, to] = splitPages(pastContests.length, pastContestsPerPage, page);
  for (let i = from; i <= to; i += 1) pagesList.push(i);
  get(
    // Waiting for 'get joined contests' Api
    `https://test.api.freecontest.net/api/v1/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    true,
  ).then((res) => setPastContests(res.data));
  const [begin, end] = getPastContestsOfPage(pastContests.length, pastContestsPerPage, page);
  console.log(begin);
  console.log(end);
  const trList = pastContests.map((contest, index) =>
    index >= begin - 1 && index <= end - 1 ? (
      <tr className={styles.rowContest} key={contest.id}>
        <th>{index + 1}</th>
        <th>{contest.username}</th>
        <th>{contest.full_name}</th>
        <th>{contest.email}</th>
      </tr>
    ) : (
      ''
    ),
  );
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
          <b>Trang</b>
          {pagesList[0] !== 1 ? <b>...</b> : ''}
          <span>
            {pagesList.map((index) => (
              <b
                key={index}
                style={page === index ? { color: 'red' } : {}}
                onClick={() => setPage(index)}
              >
                {index}
              </b>
            ))}
          </span>
          {pagesList[pagesList.length - 1] !==
          Math.ceil(pastContests.length / pastContestsPerPage) ? (
            <b>...</b>
          ) : (
            ''
          )}
        </span>
      </div>
    </div>
  );
}
JoinedContests.propTypes = {
  token: PropTypes.any,
};

export default JoinedContests;
