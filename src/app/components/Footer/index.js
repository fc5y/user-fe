import * as React from 'react';
import styled from 'styled-components';

// assets
import logoImage from 'assets/images/darkerLogo.png';

import LinkField from './LinkField';

const Containter = styled.div`
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
  margin: auto;
  padding-top: 36px;
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

function IconFacebook() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.625 12C23.625 5.57812 18.4219 0.375 12 0.375C5.57812 0.375 0.375 5.57812 0.375 12C0.375 17.8022 4.62609 22.6116 10.1836 23.4844V15.3605H7.23047V12H10.1836V9.43875C10.1836 6.52547 11.918 4.91625 14.5744 4.91625C15.8466 4.91625 17.1769 5.14313 17.1769 5.14313V8.0025H15.7106C14.2669 8.0025 13.8164 8.89875 13.8164 9.81797V12H17.0405L16.5248 15.3605H13.8164V23.4844C19.3739 22.6116 23.625 17.8022 23.625 12Z"
        fill="white"
        fillOpacity="0.8"
      />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.75 0H2.25C1.00734 0 0 1.00734 0 2.25V15.75C0 16.9927 1.00734 18 2.25 18H21.75C22.9927 18 24 16.9927 24 15.75V2.25C24 1.00734 22.9927 0 21.75 0ZM21.75 2.25V4.16273C20.699 5.01862 19.0234 6.3495 15.4412 9.15445C14.6518 9.77541 13.0881 11.2672 12 11.2498C10.9121 11.2674 9.34786 9.77517 8.55877 9.15445C4.97719 6.34992 3.30117 5.01877 2.25 4.16273V2.25H21.75ZM2.25 15.75V7.04991C3.32409 7.90542 4.8473 9.10594 7.16897 10.9239C8.19352 11.7304 9.98775 13.5108 12 13.5C14.0024 13.5108 15.7739 11.7563 16.8306 10.9243C19.1522 9.10636 20.6759 7.90552 21.75 7.04995V15.75H2.25Z"
        fill="white"
        fillOpacity="0.8"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <Containter>
      <Content>
        <Left>
          <Title>Thông tin hữu ích</Title>
          <LinkField content="Giới thiệu về Free Contest" link="/" icon={null} />
          <LinkField content="Các điều khoản" link="/" icon={null} />
          <LinkField content="Free Contest Info (2019-2020)" link="/" icon={null} />
          <LinkField content="Trang thông tin cũ (2015-2019)" link="/" icon={null} />
          <LinkField content="Hướng dẫn" link="/" icon={null} />
        </Left>
        <Logo>
          <img src={logoImage} alt="" />
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
