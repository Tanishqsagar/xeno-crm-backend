import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const VERCEL_URL = process.env.VERCEL_URL

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: `${VERCEL_URL}/create` // or /create
  })
);

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Logout failed');
    res.redirect(VERCEL_URL);
  });
});

router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

export default router;
