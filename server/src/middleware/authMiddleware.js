import jwt from 'jsonwebtoken';
import secret from "../utils/secret.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token missing. Unauthorized access.' });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token has expired. Please log in again.' });
            }
            return res.status(403).json({ error: 'Invalid token. Forbidden access.' });
        }

        req.user = user;

        next();
    });
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin === true) {
        next();
    } else {
        return res.status(403).json({ error: 'Admin access required.' });
    }
};

