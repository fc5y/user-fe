import React from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { SuccessPopup } from '../../common-ui/Popup';
import { ROUTE_CONTESTS } from 'src/app/routes/constants';

import styled from 'styled-components';

const Container = styled.div`
  width: 600px;
  background-color: white;
  filter: drop-shadow(0px 0px 12px rgba(188, 188, 188, 0.25));
  color: rgba(0, 0, 0, 0.6);
`;

export default function Donatepage() {
  const history = useHistory();
  return (
    <Container>
      <Helmet>
        <title>Ủng hộ</title>
      </Helmet>
      <SuccessPopup
        show
        content="Cảm ơn bạn đã ủng hộ!"
        onClose={() => {
          history.push(ROUTE_CONTESTS);
        }}
      />
    </Container>
  );
}
