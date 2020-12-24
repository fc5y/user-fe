/* eslint-disable react/prop-types */
import * as React from 'react';
import styled from 'styled-components';
import Clock from './Clock';
import IconFC from 'src/app/common-ui/Icons/IconFC';

const Container = styled.div`
  max-width: 1200px;
  min-width: 720px;
  width: 100%;
  margin: 0 auto;
`;

const IconWrapper = styled.div`
  width: 100%;
  margin: 60px auto;
  display: flex;
  justify-content: center;
`;

const Icon = styled(IconFC)`
  width: 100px;
  height: 100px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
`;

const BigCard = styled(Card)`
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Line1 = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: #3f96ce;
  margin-top: 36px;
  margin-bottom: 24px;
`;

const Line2 = styled.div`
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;
  text-align: center;
  color: #076daf;
  margin-bottom: 36px;
`;

const Line3 = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ClockContainer = styled.div`
  width: fit-content;
  max-width: 100%;
`;

function LandingPage({ serverTime }) {
  return (
    <Container>
      <IconWrapper>
        <Icon fill="#1c83c6" />
      </IconWrapper>
      <BigCard>
        <Line1>Chào đón trang web mới của Free Contest</Line1>
        <Line2>freecontest.net</Line2>
        <ClockContainer>
          <Clock current={serverTime} />
        </ClockContainer>
        <Line3>Ra mắt ngày 01/01/2021</Line3>
      </BigCard>
    </Container>
  );
}

export default LandingPage;
