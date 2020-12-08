import * as React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

const Container = styled.div`
  flex: 0 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  width: auto;
  height: 100%;
  padding-left: 12px;
  padding-right: 12px;
  margin-left: 12px;

  color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;

  :visited {
    color: rgba(0, 0, 0, 0.5);
  }

  :hover {
    color: rgba(0, 0, 0, 0.75);
    background-color: rgba(0, 0, 0, 0.06);
  }

  :active {
    color: rgba(0, 0, 0, 0.75);
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

const StyleLinkAndDropdownContainer = styled(StyledLink)`
  position: relative;
`;

const UsernameAndDropdownIcon = styled.div`
  display: flex;
  align-items: center;
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  z-index: 1;

  background-color: white;

  ${StyleLinkAndDropdownContainer}:hover & {
    display: block;
  }
`;

const DropdownItem = styled.div`
  padding: 12px 18px;
  color: rgba(0, 0, 0, 0.5);

  :visited {
    color: rgba(0, 0, 0, 0.5);
  }

  :hover {
    color: rgba(0, 0, 0, 0.75);
    background-color: rgba(0, 0, 0, 0.06);
  }

  :active {
    color: rgba(0, 0, 0, 0.75);
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

const Username = styled.div`
  max-width: 200px;
  margin-right: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function IconCaretDown() {
  return (
    <svg width="11" height="24" viewBox="0 0 11 24" fill="none">
      <path
        d="M1.60557 10H9.39442C9.93326 10 10.2027 10.6508 9.82125 11.0323L5.92834 14.9282C5.69222 15.1643 5.30778 15.1643 5.07166 14.9282L1.17875 11.0323C0.797327 10.6508 1.06674 10 1.60557 10Z"
        fill="currentColor"
      />
    </svg>
  );
}

// TODO: fix this
// for testing purpose, there are 50% chance that user is logged in
function useAccountInfo() {
  return Math.random() > 0.5
    ? {
        isLoggedIn: false,
      }
    : {
        isLoggedIn: true,
        username: 'xuanquang1999',
      };
}

export default function Right() {
  const accountInfo = useAccountInfo();
  const history = useHistory();

  return (
    <Container>
      {accountInfo.isLoggedIn ? (
        <StyleLinkAndDropdownContainer to="#">
          <UsernameAndDropdownIcon>
            <Username>{accountInfo.username}</Username>
            <IconCaretDown />
          </UsernameAndDropdownIcon>
          <Dropdown>
            <DropdownItem onClick={() => history.push('/settings')}>Cài đặt</DropdownItem>
            <DropdownItem onClick={() => alert('Đăng xuất')}>Đăng xuất</DropdownItem>
          </Dropdown>
        </StyleLinkAndDropdownContainer>
      ) : (
        <>
          <StyledLink to="/auth/login">Đăng nhập</StyledLink>
          <StyledLink to="/auth/signup">Tạo tài khoản</StyledLink>
        </>
      )}
    </Container>
  );
}
