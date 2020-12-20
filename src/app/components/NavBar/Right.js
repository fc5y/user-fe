import * as React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { UserInfoContext } from 'src/shared/context/UserInfo';
import IconCaretDown from 'src/app/common-ui/Icons/IconCaretDown';

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
  width: auto;
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

export default function Right() {
  const { userInfo, clearUserInfo } = React.useContext(UserInfoContext);
  const history = useHistory();

  return (
    <Container>
      {!userInfo.isFetched ? (
        <div />
      ) : userInfo.username ? (
        <StyleLinkAndDropdownContainer to="#">
          <UsernameAndDropdownIcon>
            <Username>{userInfo.username}</Username>
            <IconCaretDown />
          </UsernameAndDropdownIcon>
          <Dropdown>
            <DropdownItem onClick={() => history.push('/settings')}>Cài đặt</DropdownItem>
            <DropdownItem onClick={() => history.push('/change-password')}>
              Thay đổi mật khẩu
            </DropdownItem>
            <DropdownItem onClick={() => clearUserInfo()}>Đăng xuất</DropdownItem>
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
