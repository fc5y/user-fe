import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Container = styled.div`
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
  font-size: 24px;
  text-align: center;

  margin-bottom: 30px;
  color: var(--primary-dark);
`;

const TimeLine = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  margin-top: 12px;

  color: var(--black60);
`;

const PlanContent = styled.ul`
  padding-left: 20px;
`;

export default function PolicyPage() {
  return (
    <Container>
      <Helmet>
        <title>Điều khoản sử dụng</title>
      </Helmet>
      <Content>
        <Title>Kế hoạch chuyển từ freecontest.xyz sang freecontest.net</Title>

        <TimeLine>
          <span>01/01/2021 - 24/01/2021: Giai đoạn thử nghiệm</span>
          <PlanContent>
            <li>Các kỳ Testing Round được tổ chức trên trang freecontest.net.</li>
            <li>
              Thí sinh cần đăng ký tài khoản mới trên trang freecontest.net để tham gia các Testing
              Round.
            </li>
            <li>
              Các kỳ Free Contest, Beginner Free Contest tiếp tục được tổ chức trên trang
              freecontest.xyz.
            </li>
          </PlanContent>
        </TimeLine>

        <TimeLine>
          <span>25/01/2021 - 31/01/2021: Giai đoạn chuyển giao</span>
          <PlanContent>
            <li>Các trang freecontest.net và freecontest.xyz sẽ tạm đóng cửa để được bảo trì.</li>
            <li>Tất cả dữ liệu trên trang freecontest.net trong giai đoạn thử nghiệm sẽ bị xóa.</li>
            <li>Dữ liệu từ trang freecontest.xyz sẽ được sao chép sang trang freecontest.net.</li>
          </PlanContent>
        </TimeLine>

        <TimeLine>
          <span>01/02/2021: Hoàn thành</span>
          <PlanContent>
            <li>
              Từ 01/02/2021, thí sinh có thể đăng nhập trên freecontest.net bằng username và
              password từ trang freecontest.xyz.
            </li>
            <li>Trang freecontest.xyz sẽ được đóng cửa.</li>
          </PlanContent>
        </TimeLine>
      </Content>
    </Container>
  );
}
