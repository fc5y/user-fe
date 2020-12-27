import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Noto Serif;
  width: 720px;
  height auto;
  margin: 48px auto;

  background: #FFFFFF;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
  border-radius: 4px;
`;

const Content = styled.div`
  padding: 48px;
  text-align: left;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 48px;
  line-height: 65px;
  text-align: center;

  color: var(--primary-dark);
`;

const RuleField = styled.div`
  font-size: 16px;
  line-height: 25px;
  margin-top: 12px;

  color: var(--black60);
`;

const Rule = styled.ul`
  padding-left: 20px;
`;

export default function PolicyPage() {
  return (
    <Container>
      <Helmet>
        <title>Điều khoản sử dụng</title>
      </Helmet>
      <Content>
        <Title>Điều khoản sử dụng</Title>
        <RuleField>
          Khi sử dụng trang web freecontest.net, bạn đồng ý với các điều khoản sau đây:
        </RuleField>

        <RuleField>
          <span>Khi đăng ký tài khoản,</span>
          <Rule>
            <li>Khai báo đúng thông tin, bao gồm họ tên, trường.</li>
            <li>Không được mạo danh người khác.</li>
            <li>Không được đặt username vi phạm thuần phong mỹ tục, hoặc xúc phạm người khác.</li>
          </Rule>
        </RuleField>

        <RuleField>
          <span>Trong quá trình thi,</span>
          <Rule>
            <li>Không được chép code của thí sinh khác.</li>
            <li>Không được cho thí sinh khác chép code.</li>
            <li>Không được phá hoại hệ thống server dưới mọi hình thức.</li>
          </Rule>
        </RuleField>

        <RuleField>
          Tất cả các hành vi trên có thể bị xử lý bằng cách hủy kết quả bài thi, hoặc xóa tài khoản.
        </RuleField>
      </Content>
    </Container>
  );
}
