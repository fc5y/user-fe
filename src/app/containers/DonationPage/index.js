import * as React from 'react';
import PropTypes from 'prop-types';
// Hook
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { SuccessPopup } from '../../common-ui/Popup';
import { ROUTE_CONTESTS, ROUTE_LOGIN } from 'src/app/routes/constants';

const Container = styled.div`
  width: 720px;
  height auto;
  margin: 48px auto;

  background: #eeeeee;
  box-shadow: 0px 0px 12px rgba(188, 188, 188, 0.25);
  border-radius: 4px;
`;

export default function Donatepage() {
  const history = useHistory();
  return (
    <Container>
      <Helmet>
        <title>Trang donate</title>
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
