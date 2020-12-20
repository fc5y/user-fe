import * as React from 'react';
import PropTypes from 'prop-types';

// Utils
import styled from 'styled-components';

// Component
import { CONTEST_STATUS } from 'src/shared/constants';

const InfoWrapper = styled.div`
  font-weight: 600;
`;

const ParticipantNumber = styled.span`
  padding: 0;
  color: var(--black60);
  margin-left: 10px;
`;

const NotStartedText = styled.span`
  padding: 0;
  color: #00bb61;
`;
const StartingText = styled.span`
  padding: 0;
  color: #fc1622;
`;
const JustEndedText = styled.span`
  padding: 0;
  color: var(--secondary-default);
`;
const EndedText = styled.span`
  padding: 0;
  color: var(--black60);
`;

function ContestStatusText({ status, numberOfParticipants }) {
  return (
    <InfoWrapper>
      {(() => {
        switch (status) {
          case CONTEST_STATUS.NOT_STARTED:
            return <NotStartedText>• Sắp diễn ra</NotStartedText>;
          case CONTEST_STATUS.STARTING:
            return <StartingText>• Đang diễn ra</StartingText>;
          case CONTEST_STATUS.JUST_ENDED:
            return <JustEndedText>• Vừa mới kết thúc</JustEndedText>;
          case CONTEST_STATUS.ENDED:
            return <EndedText>• Đã kết thúc</EndedText>;
          default:
            return null;
        }
      })()}
      <ParticipantNumber>• {numberOfParticipants} thí sinh</ParticipantNumber>
    </InfoWrapper>
  );
}

ContestStatusText.propTypes = {
  status: PropTypes.any,
  numberOfParticipants: PropTypes.number,
};

export default ContestStatusText;
