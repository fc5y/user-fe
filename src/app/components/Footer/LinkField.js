import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const LinkToInternal = styled(Link)`
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

export function LinkField({ content, link, icon }) {
  return (
    <LinkGroups>
      {icon && <IconContainer>{icon}</IconContainer>}
      <LinkTo target="_blank" rel="noopener noreferrer" href={link}>
        {content}
      </LinkTo>
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

export function LinkFieldInternal({ content, link, icon }) {
  return (
    <LinkGroups>
      {icon && <IconContainer>{icon}</IconContainer>}
      <LinkToInternal to={link}>{content}</LinkToInternal>
    </LinkGroups>
  );
}

LinkFieldInternal.propTypes = {
  content: PropTypes.string,
  link: PropTypes.string,
  icon: PropTypes.any,
};

LinkFieldInternal.defaultProps = {
  content: '',
  link: '',
  icon: null,
};
