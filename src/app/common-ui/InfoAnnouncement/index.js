import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Common UI
import IconAnnouncement from 'src/app/common-ui/Icons/IconAnnouncement';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  padding: auto;
  padding-top: 22px;
  padding-bottom: 22px;

  width: 100%;
  max-width: var(--max-content-width);
  min-width: var(--min-content-width);

  background: var(--primary-light);
  box-sizing: border-box;
  border-radius: 4px;
`;

const IconContainer = styled.div`
  min-width: 50px;
  max-width: 50px;
  transform: translateX(5%);
`;

const Content = styled.div`
  text-align: justify;
  font-size: 16px;
  line-height: 25px;
  margin: 0px 10px;
  color: #ffffff;
`;

export default function InfoAnnouncement(props) {
  console.log(props);
  return (
    <Container>
      <IconContainer>
        <IconAnnouncement />
      </IconContainer>
      <Content>{props.children}</Content>
    </Container>
  );
}

InfoAnnouncement.propTypes = {
  children: PropTypes.any,
};
