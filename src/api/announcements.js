import { get, post } from '../utils/fetchUtils';

export function apiGetAnnouncements({ offset, limit }) {
  console.log(offset);
  console.log(limit);
  return get(`/api/v2/announcements?offset=${offset}&limit=${limit}`);
}

export function apiGetAnnouncementByName({ name }) {
  return get(`/api/v2/announcements/${name}`);
}

export function apiCreateAnnouncement({ name, title, description }) {
  return post(`/api/v2/announcements/create`, {
    name,
    title,
    description,
  });
}

export function apiDeleteAnnouncement({ name }) {
  return post(`/api/v2/announcements/${name}/delete`);
}

export function apiUpdateAnnouncement({ name, title, description }) {
  return post(`/api/v2/announcements/${name}/update`, {
    name,
    title,
    description,
  });
}
