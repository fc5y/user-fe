import * as React from 'react';

// commoon-ui
import InfoAnnouncement from 'src/app/common-ui/InfoAnnouncement';

// APIs
import { apiGetAnnouncements } from 'src/api';

export default function Announcements({ offset, limit }) {
  const [announcements, setAnnouncements] = React.useState([]);

  const fetchAnnouncementInfo = async (offset, limit) => {
    const { data, error, error_msg: msg } = await apiGetAnnouncements({ offset, limit });
    console.log(data);
    if (!!error || !data) {
      console.log(msg);
    } else {
      console.log(data);
      setAnnouncements(data.announcements);
    }
  };

  React.useEffect(() => {
    fetchAnnouncementInfo(offset, limit);
  }, []);

  const renderAnnouncements = (announcements) => {
    // console.log(announcements);
    return announcements.map((announcement) => {
      console.log(announcement.description);
      return <InfoAnnouncement>{announcement.description}</InfoAnnouncement>;
    });
  };

  return renderAnnouncements(announcements);
}
