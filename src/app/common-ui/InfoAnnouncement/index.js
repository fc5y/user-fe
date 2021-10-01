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
  min-width: 60px;
`;

const Content = styled.div`
  text-align: justify;
  padding-right: 22px;
`;

export default function InfoAnnouncement({ content }) {
  return (
    <Container>
      <IconContainer>
        <IconAnnouncement />
      </IconContainer>
      <Content>{content}</Content>
    </Container>
  );
}

InfoAnnouncement.propTypes = {
  content: PropTypes.any,
};
