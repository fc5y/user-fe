import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  background: #ffffff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;

  border: 2px solid #67adda;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
  border-radius: 4px;
`;

const Square = styled.div`
  width: 128px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 1 128px;
`;

const Line1 = styled.div`
  font-weight: 600;
  font-size: 38px;
  line-height: 60px;
  color: #076daf;
`;

const Line2 = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.6);
`;

const Separator = styled.div`
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;
  padding-bottom: 40px;
  color: #1c83c6;
  transition: opacity 100ms;
`;

export default function Clock({ endTime }) {
  const date1 = new Date(Date.now());
  const date2 = new Date(endTime * 1000);
  const delta = Math.max(date2 - date1, 0);

  const dd = Math.floor(delta / 24 / 60 / 60 / 1000);
  const hh = Math.floor(delta / 60 / 60 / 1000) % 24;
  const mm = Math.floor(delta / 60 / 1000) % 60;
  const ss = Math.floor(delta / 1000) % 60;

  const [showSeparator, setShowSeparator] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => setShowSeparator((value) => !value), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <Square>
        <Line1>{('0' + dd).slice(-2)}</Line1>
        <Line2>Ngày</Line2>
      </Square>
      <Separator style={{ opacity: showSeparator ? '100%' : '0%' }}>:</Separator>
      <Square>
        <Line1>{('0' + hh).slice(-2)}</Line1>
        <Line2>Giờ</Line2>
      </Square>
      <Separator style={{ opacity: showSeparator ? '100%' : '0%' }}>:</Separator>
      <Square>
        <Line1>{('0' + mm).slice(-2)}</Line1>
        <Line2>Phút</Line2>
      </Square>
      <Separator style={{ opacity: showSeparator ? '100%' : '0%' }}>:</Separator>
      <Square>
        <Line1>{('0' + ss).slice(-2)}</Line1>
        <Line2>Giây</Line2>
      </Square>
    </Container>
  );
}

Clock.propTypes = {
  endTime: PropTypes.number,
};
