import * as React from 'react';

// commoon-ui
import InfoAnnouncement from 'src/app/common-ui/InfoAnnouncement';

// APIs
import { apiGetAnnouncements } from 'src/api';

// constants
import { API_PROGRESS } from 'src/shared/constants';

export default function Announcements({ offset, limit }) {
  const [announcements, setAnnouncements] = React.useState([]);
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    error: null,
    error_msg: null,
  });

  const fetchAnnouncementInfo = async (offset, limit) => {
    const { data, error, error_msg: msg } = await apiGetAnnouncements({ offset, limit });
    if (!!error || !data) {
      setApiState({ progress: API_PROGRESS.FAILED, error, error_msg: msg });
    } else {
      setApiState(API_PROGRESS.SUCCESS);
      setAnnouncements(data.announcements);
    }
  };

  React.useEffect(() => {
    fetchAnnouncementInfo(offset, limit);
  }, []);

  const renderAnnouncements = (announcements) => {
    if (apiState.progress === API_PROGRESS.FAILED) return null;
    return announcements.map((announcement) => (
      <InfoAnnouncement key={announcement.name}>{announcement.description}</InfoAnnouncement>
    ));
  };

  return renderAnnouncements(announcements);
}
