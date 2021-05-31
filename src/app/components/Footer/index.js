import * as React from 'react';
import styled from 'styled-components';

// Components
import IconFacebook from 'src/app/common-ui/Icons/IconFacebook';
import IconEmail from 'src/app/common-ui/Icons/IconEmail';
import IconFC from 'src/app/common-ui/Icons/IconFC';

// Constants
import { ROUTE_POLICY, ROUTE_HELP } from 'src/app/routes/constants';

import { LinkField, LinkFieldInternal } from './LinkField';

const Containter = styled.div`
  position: relative;
  bottom: 0;
  height: var(--footer-height);
  width: 100%;

  background-color: var(--primary-darker);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.125);
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 900px;
  margin: 36px 0;
  padding: 0 10px;

  display: flex;
  justify-content: space-between;
`;

const Left = styled.div``;

const Right = styled.div``;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;

  color: rgba(255, 255, 255, 0.8);
`;
const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left 50%;
  transform: translate(-50%, -50%);
`;
const Icon = styled(IconFC)`
  width: 200px;
  height: 200px;
  opacity: 0.2;
`;

export default function Footer() {
  return (
    <Containter>
      <Content>
        <Left>
          <Title>Thông tin hữu ích</Title>
          <LinkField
            content="Giới thiệu về Free Contest"
            link="https://info.freecontest.xyz/gi%E1%BB%9Bi-thi%E1%BB%87u"
          />
          <LinkFieldInternal content="Các điều khoản" link={ROUTE_POLICY} />
          <LinkField content="Free Contest Info (2019-2020)" link="https://info.freecontest.xyz/" />
          <LinkField
            content="Trang thông tin cũ (2015-2019)"
            link="https://sites.google.com/site/kc97blf/"
          />
          <LinkFieldInternal content="Hướng dẫn" link={ROUTE_HELP} />
        </Left>
        <IconWrapper>
          <Icon fill="#1c83c6" />
        </IconWrapper>
        <Right>
          <Title>Liên hệ</Title>
          <LinkField
            content="support@freecontest.net"
            link="mailto:support@freecontest.net"
            icon={<IconEmail />}
          />
          <LinkField
            content="https://facebook.com/kc97blf"
            link="https://facebook.com/kc97blf"
            icon={<IconFacebook />}
          />
        </Right>
      </Content>
    </Containter>
  );
}
