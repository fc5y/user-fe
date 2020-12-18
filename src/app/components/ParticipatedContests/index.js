import React, { useState, useEffect } from 'react';
import styles from './style.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Apis
import { apiGetParticipations } from 'src/api';

const pastContestsPerPage = 10;
let numberOfContests = 0;

// This function lets us know the range of less than 6 indexes, denoting the pages next to that one users 're handling. In which, the page user 're handling is in the middle.
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

function ParticipatedContests({ token }) {
  const [page, setPage] = useState(1);
  const [pastContests, setPastContests] = useState([]);
  useEffect(() => {
    numberOfContests = 0;
    // offset = (page - 1) * pastContestsPerPage
    // limit = pastContestsPerPage
    apiGetParticipations({ token }).then((res) => {
      // Don't forget to handle errors
      numberOfContests = res.data.total;
      setPastContests(res.data.participations);
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
        <span className={contest.rating_change < 0 ? styles.ratingRed : styles.ratingGreen}>
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
          {pagesList[0] !== 1 && <strong>...</strong>}
          <span>
            {pagesList.map((index) => (
              <strong
                key={index}
                className={page === index && styles.indexOfHandlingPage}
                onClick={() => setPage(index)}
              >
                {index}
              </strong>
            ))}
          </span>
          {pagesList[pagesList.length - 1] !==
            Math.ceil(pastContests.length / pastContestsPerPage) && <strong>...</strong>}
        </span>
      </div>
    </div>
  );
}
ParticipatedContests.propTypes = {
  token: PropTypes.any,
};

export default ParticipatedContests;
