import { Request } from 'express';
import User from './user.interface';

type RequestWithUser<T = User> =
  Request & { user?: T };

export default RequestWithUser;
