import * as React from 'react';
import styled from 'styled-components';

// common ui
import IconFacebook from 'src/app/common-ui/Icons/IconFacebook';
import IconEmail from 'src/app/common-ui/Icons/IconEmail';

// assets
import logoImage from 'assets/images/darkerLogo.png';

import LinkField from './LinkField';

const Containter = styled.div`
  position: relative;
  bottom: 0;
  height: auto;
  width: 100%;
  margin: auto;
  margin-top: 36px;

  background-color: var(--primary-darker);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.125);

  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 900px;
  margin: 36px auto;
  padding-bottom: 60px;

  display: flex;
`;

const Left = styled.div`
  margin-right: 122px;
  width: auto;
  height: auto;
`;

const Logo = styled.div`
  margin: auto;
`;

const Right = styled.div``;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;

  color: rgba(255, 255, 255, 0.8);
`;

export default function Footer() {
  return (
    <Containter>
      <Content>
        <Left>
          <Title>Thông tin hữu ích</Title>
          <LinkField content="Giới thiệu về Free Contest" link="/" />
          <LinkField content="Các điều khoản" link="/" />
          <LinkField content="Free Contest Info (2019-2020)" link="/" />
          <LinkField content="Trang thông tin cũ (2015-2019)" link="/" />
          <LinkField content="Hướng dẫn" link="/" />
        </Left>
        <Logo>
          <img src={logoImage} alt="footer-logo" />
        </Logo>
        <Right>
          <Title>Liên hệ</Title>
          <LinkField content="support@freecontest.net" link="/" icon={<IconEmail />} />
          <LinkField content="support@freecontest.net" link="/" icon={<IconFacebook />} />
        </Right>
      </Content>
    </Containter>
  );
}
