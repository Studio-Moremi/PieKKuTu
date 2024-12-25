import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import session from 'express-session';
import db from '../../db';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./login.json', 'utf8'));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  db.get('SELECT * FROM users WHERE discord_id = ?', [id], (err, row) => {
    done(err, row);
  });
});

passport.use(
  new DiscordStrategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL,
      scope: ['identify'],
    },
    (accessToken, refreshToken, profile, done) => {
      db.get(
        'SELECT * FROM users WHERE discord_id = ?',
        [profile.id],
        (err, row) => {
          if (err) return done(err);
          if (row) {
            return done(null, row);
          } else {
            db.run(
              'INSERT INTO users (discord_id, username, avatar) VALUES (?, ?, ?)',
              [profile.id, profile.username, profile.avatar],
              function (err) {
                if (err) return done(err);
                return done(null, {
                  id: profile.id,
                  username: profile.username,
                  avatar: profile.avatar,
                });
              }
            );
          }
        }
      );
    }
  )
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate('discord')(req, res);
}