import { centersHandlers } from './centers';
import { reservationsHandlers } from './reservations';
import { usersHandlers } from './users';

export const handlers = [
  ...usersHandlers,
  ...centersHandlers,
  ...reservationsHandlers,
];