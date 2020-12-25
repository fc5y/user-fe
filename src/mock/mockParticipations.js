/* eslint-disable no-use-before-define */
export const resContestGetParticipations = ({ offset, limit }) => {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          code: 0,
          data: {
            total: participations.length,
            participations: participations.slice(offset, offset + limit),
            server_time: Date.now() / 1000,
          },
        }),
      1000,
    ),
  );
};

const participations = Array(100).fill({
  username: 'xuanquang1999',
  contest_name: 'free-contest-131',
  contest_title: 'Free Contest 131',
  contest_total_participations: 234,
  is_hidden: false,
  rating: 1306,
  rating_change: -56,
  score: 545,
  rank_in_contest: 49,
});
