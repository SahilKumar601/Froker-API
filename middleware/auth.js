import jwt from 'jsonwebtoken';

/**
 I  The auth middleware in an Express application ensures route protection by verifying JSON Web Tokens (JWT). 
 It retrieves the token from the x-authorization header and, 
 If the token is present, it uses jwt.verify with a secret key to decode it. If valid, 
 the decoded token is assigned to req.user and next() is called to proceed to the next middleware or route handler.
 This mechanism ensures that only requests with valid tokens can access protected routes
 */
const auth = (req, res, next) => {
  const token = req.header('x-authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied'});
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};
export default auth;
