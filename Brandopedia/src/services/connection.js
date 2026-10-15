
import { apiPost } from './api';

export function requestConnection(senderId, receiverId) {
  return apiPost('/connect', { senderId, receiverId });
}
