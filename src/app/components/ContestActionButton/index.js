/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';

// Hook
import useContestCountDown from 'src/shared/hook/useContestCountDown';
import { useHistory } from 'react-router-dom';

// Context
import { UserInfoContext } from 'src/shared/context/UserInfo';
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Utils
import styled from 'styled-components';
import { getRemainingTimeObj } from 'src/utils/time';

// Constants
import { ROUTE_CONTEST_ENTER, ROUTE_CONTEST_REGISTER } from 'src/app/routes/constants';
import { CONTEST_STATUS, CONTEST_MATERIALS_KEY_MAP } from 'src/shared/constants';
import { makeUrl } from 'src/utils/url';

// Components
import * as Buttons from '../../common-ui/Button';
import { PrimaryDropDownButton, DropDownButton } from '../../common-ui/DropdownButton';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.buttonWidth ? `${props.buttonWidth}px` : 'unset')};
`;

const PrimaryButton = styled(Buttons.PrimaryButton)`
  width: 100%;
  min-width: 160px;
  min-height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SecondaryButton = styled(Buttons.SecondaryButton)`
  width: 100%;
  min-width: 160px;
  min-height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

function RegisterButton({ remainingText, withTime, buttonWidth, disabled, ...otherProps }) {
  return (
    <ButtonWrapper buttonWidth={buttonWidth}>
      <PrimaryButton disabled={disabled} onClick={() => {}} {...otherProps}>
        <PrimaryText>{disabled ? 'Đã đăng ký' : 'Đăng ký'}</PrimaryText>
        {withTime && <SecondaryText>{remainingText}</SecondaryText>}
      </PrimaryButton>
    </ButtonWrapper>
  );
}

function EnterContestButton({ remainingText, withTime, buttonWidth, ...otherProps }) {
  return (
    <ButtonWrapper buttonWidth={buttonWidth}>
      <SecondaryButton {...otherProps}>
        <PrimaryText>Vào thi</PrimaryText>
        {withTime && <SecondaryText>{remainingText}</SecondaryText>}
      </SecondaryButton>
    </ButtonWrapper>
  );
}

function MaterialButton({ materials, type, buttonWidth }) {
  const openLink = (link) => window.open(link || 'about:blank', '_blank', 'noopener noreferrer');
  const allMaterial = materials.filter((m) => m.name === 'all_materials_url');
  const dropList = materials
    .filter((m) => m.name !== 'all_materials_url')
    .map((m) => ({
      text: CONTEST_MATERIALS_KEY_MAP[m.name],
      onClick: () => openLink(m.value),
    }));

  return (
    <ButtonWrapper buttonWidth={buttonWidth}>
      {type === 'primary' ? (
        <PrimaryDropDownButton
          dropList={dropList}
          onClickAllMaterials={() => openLink(allMaterial[0].value)}
        >
          Xem tư liệu kỳ thi
        </PrimaryDropDownButton>
      ) : (
        <DropDownButton
          dropList={dropList}
          onClickAllMaterials={() => openLink(allMaterial[0].value)}
        >
          Xem tư liệu kỳ thi
        </DropDownButton>
      )}
    </ButtonWrapper>
  );
}

export default function ContestActionButton({
  contestInfo,
  onChangeToStarting,
  withTime = true,
  buttonWidth,
  materialButtonType,
}) {
  const { userInfo } = React.useContext(UserInfoContext);
  const { myParticipationMap, contestServerTime } = React.useContext(ContestInfoContext);
  const history = useHistory();
  const isRegistered = !!myParticipationMap[contestInfo.name];
  const { count, status } = useContestCountDown({
    userInfo,
    contestInfo,
    contestServerTime,
    onChangeToStarting,
  });

  // Return nothing if user hasn't been fetched
  if (!userInfo.isFetched || status === CONTEST_STATUS.UNSET) {
    return <div />;
  }

  if (status === CONTEST_STATUS.ENDED) {
    return (
      <MaterialButton
        type={materialButtonType}
        materials={contestInfo.materials}
        buttonWidth={buttonWidth}
      />
    );
  } else if (status === CONTEST_STATUS.JUST_ENDED) {
    return null;
  } else if (!isRegistered || !userInfo.username) {
    return (
      <RegisterButton
        withTime={withTime}
        remainingText={getRemainingTimeObj(count).timeString}
        buttonWidth={buttonWidth}
        onClick={() => {
          history.push(makeUrl(ROUTE_CONTEST_REGISTER, { contestName: contestInfo.name }));
        }}
      />
    );
  } else if (status === CONTEST_STATUS.NOT_STARTED && isRegistered) {
    return (
      <RegisterButton
        withTime={withTime}
        disabled
        remainingText={getRemainingTimeObj(count).timeString}
        buttonWidth={buttonWidth}
      >
        Đã đăng ký
      </RegisterButton>
    );
  } else if (status === CONTEST_STATUS.STARTING) {
    return (
      <EnterContestButton
        withTime={withTime}
        remainingText={getRemainingTimeObj(count).timeString}
        buttonWidth={buttonWidth}
        onClick={() => {
          history.push(makeUrl(ROUTE_CONTEST_ENTER, { contestName: contestInfo.name }));
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
  withTime: PropTypes.any,
  buttonWidth: PropTypes.any,
};
