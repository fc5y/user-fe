import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Common UI
import IconWarning from 'src/app/common-ui/Icons/IconWarning';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px;

  width: 100%;

  background: #ffffff;
  border: 1px solid #ff9816;
  box-sizing: border-box;
  box-shadow: 0px 0px 12px rgba(255, 152, 22, 0.15);
  border-radius: 4px;
`;

const IconContainer = styled.div`
  margin-left: 0;
  padding-right: 28px;
`;

const Content = styled.div``;

export default function AlertWarning({ content }) {
  return (
    <Container>
      <IconContainer>
        <IconWarning />
      </IconContainer>
      <Content>{content}</Content>
    </Container>
  );
}

AlertWarning.propTypes = {
  content: PropTypes.any,
};
