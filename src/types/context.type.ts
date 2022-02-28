import { Request, Response } from 'express';
import { User } from '../users/entities/User';

type Ctx = {
  req: Request & { user?: Pick<User, 'email' | 'name'> };
  res: Response;
};

export default Ctx;