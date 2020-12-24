import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LinkGroups = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const LinkTo = styled.a`
  font-size: 16px;
  line-height: 25px;
  text-decoration-line: underline;

  margin: auto auto auto 0;

  color: rgba(255, 255, 255, 0.8);
  display: block;

  &:visited {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const IconContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  margin-right: 6px;
`;

export default function LinkField({ content, link, icon }) {
  return (
    <LinkGroups>
      {icon && <IconContainer>{icon}</IconContainer>}
      <LinkTo href={link}>{content}</LinkTo>
    </LinkGroups>
  );
}

LinkField.propTypes = {
  content: PropTypes.string,
  link: PropTypes.string,
  icon: PropTypes.any,
};

LinkField.defaultProps = {
  content: '',
  link: '',
  icon: null,
};
