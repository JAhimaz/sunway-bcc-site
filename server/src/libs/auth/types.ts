import { Request } from 'express';
import session from 'express-session';

type AuthRequest = Request & {
  session: CustomSession;
}

type CustomSession = session.Session & {
  user: string;
}

export default AuthRequest;
