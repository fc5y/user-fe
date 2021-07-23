import * as React from 'react';
import { SuccessPopup } from 'src/app/common-ui/Popup';
import { useHistory } from 'react-router-dom';
import { ROUTE_CONTESTS } from 'src/app/routes/constants';

export default function DonationPage() {
  const history = useHistory();

  return (
    <div>
      <SuccessPopup
        show
        content="Cảm ơn bạn đã ủng hộ"
        onClose={() => history.push(ROUTE_CONTESTS)}
      />
    </div>
  );
}
