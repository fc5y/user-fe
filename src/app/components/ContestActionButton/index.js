/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';

// Hook
import useCountDown from 'src/shared/hook/useCountDown';
import { useHistory } from 'react-router-dom';

// Context
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Utils
import styled from 'styled-components';
import { getContestStatus } from 'src/utils/contest';
import { getRemainingTimeObj } from 'src/utils/time';

// Constants
import { ROUTE_CONTEST_ENTER, ROUTE_CONTEST_REGISTER } from 'src/app/routes/constants';
import { CONTEST_STATUS } from 'src/shared/constants';
import { makeUrl } from 'src/utils/url';

// Components
import * as Buttons from '../../common-ui/Button';
import { DropDownButton } from '../../common-ui/DropdownButton';

const PrimaryButton = styled(Buttons.PrimaryButton)`
  min-width: 200px;
  height: 54px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const SecondaryButton = styled(Buttons.SecondaryButton)`
  min-width: 200px;
  height: 54px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const PrimaryText = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #fff;
`;

const SecondaryText = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #fff;
  margin-top: 5px;
`;

function RegisterButton({ remainingText, disabled, ...otherProps }) {
  return (
    <PrimaryButton disabled={disabled} onClick={() => {}} {...otherProps}>
      <PrimaryText>{disabled ? 'Đã đăng ký' : 'Đăng ký'}</PrimaryText>
      <SecondaryText>{remainingText}</SecondaryText>
    </PrimaryButton>
  );
}

function EnterContestButton({ remainingText, ...otherProps }) {
  return (
    <SecondaryButton {...otherProps}>
      <PrimaryText>Vào thi</PrimaryText>
      <SecondaryText>{remainingText}</SecondaryText>
    </SecondaryButton>
  );
}

function MaterialButton({ materials }) {
  const openLink = (link) => window.open(link || 'about:blank', '_blank', 'noopener noreferrer');
  return (
    <DropDownButton
      dropList={[
        {
          text: 'Đề bài',

          onClick: () => openLink(materials.statements_url),
        },
        {
          text: 'Bộ test',
          onClick: () => openLink(materials.test_data_url),
        },
        {
          text: 'Bảng điểm',
          onClick: () => openLink(materials.ranking_url),
        },
        {
          text: 'Lời giải',
          onClick: () => openLink(materials.editorial_url),
        },
        {
          text: 'Bài giải',
          onClick: () => openLink(materials.solution_url),
        },
      ]}
    >
      Xem tự liệu kỳ thi
    </DropDownButton>
  );
}

export default function ContestActionButton({ contestInfo, onChangeToStarting }) {
  const { userInfo } = React.useContext(UserInfoContext);
  const { myParticipationMap, contestServerTime } = React.useContext(ContestInfoContext);
  const [status, setStatus] = React.useState(CONTEST_STATUS.UNSET);
  const { count, startCountDown, stopCountDown } = useCountDown({
    forceStart: false,
  });
  const history = useHistory();
  const isRegistered = !!myParticipationMap[contestInfo.contest_name];

  React.useEffect(() => {
    if (!userInfo.isFetched) return;

    const curStatus = getContestStatus(contestInfo, contestServerTime);
    setStatus(curStatus);

    if (contestInfo.start_time > contestServerTime) {
      startCountDown(Math.ceil(contestInfo.start_time - contestServerTime));
    } else if (contestInfo.start_time + contestInfo.duration > contestServerTime) {
      startCountDown(Math.ceil(contestInfo.start_time + contestInfo.duration - contestServerTime));
    }
  }, [userInfo]);

  // Handle when count is <= 0
  React.useEffect(() => {
    if (!userInfo.isFetched || status === CONTEST_STATUS.UNSET || count > 0) return;

    if (status === CONTEST_STATUS.NOT_STARTED) {
      setStatus(CONTEST_STATUS.STARTING);
      startCountDown(Math.ceil(contestInfo.duration));
      typeof onChangeToStarting === 'function' && onChangeToStarting();
    } else if (status === CONTEST_STATUS.STARTING) {
      stopCountDown();
    }
  }, [count]);

  // Return nothing if user hasn't been fetched
  if (!userInfo.isFetched || status === CONTEST_STATUS.UNSET) {
    return <div />;
  }

  if (status === CONTEST_STATUS.ENDED) {
    return <MaterialButton materials={contestInfo.materials} />;
  } else if (status === CONTEST_STATUS.JUST_ENDED) {
    return null;
  } else if (!isRegistered || !userInfo.username) {
    return (
      <RegisterButton
        remainingText={getRemainingTimeObj(count).timeString}
        onClick={() => {
          history.push(makeUrl(ROUTE_CONTEST_REGISTER, { contestName: contestInfo.contest_name }));
        }}
      />
    );
  } else if (status === CONTEST_STATUS.NOT_STARTED && isRegistered) {
    return (
      <RegisterButton disabled remainingText={getRemainingTimeObj(count).timeString}>
        Đã đăng ký
      </RegisterButton>
    );
  } else if (status === CONTEST_STATUS.STARTING) {
    return (
      <EnterContestButton
        remainingText={getRemainingTimeObj(count).timeString}
        onClick={() => {
          history.push(makeUrl(ROUTE_CONTEST_ENTER, { contestName: contestInfo.contest_name }));
        }}
      >
        Vào thi
      </EnterContestButton>
    );
  } else {
    return <div />;
  }
}

ContestActionButton.propTypes = {
  contestInfo: PropTypes.any,
  onChangeToStarting: PropTypes.any,
};
