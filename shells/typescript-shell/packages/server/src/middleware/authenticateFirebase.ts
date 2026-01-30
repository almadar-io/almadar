import { NextFunction, Request, Response } from 'express';
import { getAuth } from '../lib/db.js';

const BEARER_PREFIX = 'Bearer ';

export async function authenticateFirebase(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith(BEARER_PREFIX)) {
      return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    const token = authorization.slice(BEARER_PREFIX.length);
    const decodedToken = await getAuth().verifyIdToken(token);

    req.firebaseUser = decodedToken;
    res.locals.firebaseUser = decodedToken;

    return next();
  } catch (error) {
    console.error('Firebase authentication failed:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export default authenticateFirebase;


