import * as React from 'react';
import IconClose from '../../common-ui/Icons/IconClose';
import styled from 'styled-components';
import IconSuccess from '../../common-ui/Icons/IconSuccess';
const IconWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 100%;
  height: 100%;

  width: 20px;
  height: 20px;
  z-index: 10;
  cursor: pointer;

  @media (max-width: 800px) {
    top: 10px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 100px 60vh;
  max-width: var(--contest-table-max-width);
  min-width: var(--contest-table-min-width);
  width: 200px;
  height: 300px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  box-shadow: 10px 10px 12px rgba(188, 188, 188, 0.25);
  background: white;
`;
const Text = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: var(--black80);
  text-align: center;
  margin-top: 20px;
`;
export default function Donate() {
  const [show, setshow] = React.useState(true);
  return show ? (
    <Wrapper>
      <IconWrapper
        onClick={() => {
          setshow(false);
        }}
      >
        <IconClose />
      </IconWrapper>
      <IconSuccess />
      <Text>Cảm ơn bạn đã ủng hộ</Text>
    </Wrapper>
  ) : null;
}
