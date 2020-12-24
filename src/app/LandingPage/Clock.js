/* eslint-disable react/prop-types */
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #ffffff;
  border: 2px solid #67adda;
  box-sizing: border-box;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
  border-radius: 4px;

  display: flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
`;

const Square = styled.div`
  width: 128px;
  height: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 1 128px;
`;

const Line1 = styled.div`
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;
  color: #076daf;
`;

const Line2 = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.6);
`;

const Separator = styled.div`
  font-weight: 600;
  font-size: 48px;
  line-height: 60px;
  padding-bottom: 24px;
  color: #1c83c6;
  transition: opacity 100ms;
`;

export default function Clock({ current }) {
  const [now, setNow] = React.useState(new Date());
  const [showSeparator, setShowSeparator] = React.useState(false);

  const delta = new Date('2021-01-01T00:00:00.000+07:00') - now;

  const dd = delta > 0 ? Math.floor(delta / 24 / 60 / 60 / 1000) : 0;
  const hh = delta > 0 ? Math.floor(delta / 60 / 60 / 1000) % 24 : 0;
  const mm = delta > 0 ? Math.floor(delta / 60 / 1000) % 60 : 0;
  const ss = delta > 0 ? Math.floor(delta / 1000) % 60 : 0;

  React.useEffect(() => {
    setNow(current);
  }, [current]);

  React.useEffect(() => {
    setInterval(() => {
      setShowSeparator((value) => !value);
      setNow((now) => new Date(now.getTime() + 1000));
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (delta === 0) {
      window.location.reload();
    }
  }, [delta]);

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
