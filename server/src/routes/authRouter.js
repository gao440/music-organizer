const Router = require('express').Router;
const User = require('../models/userModel');
const querystring = require('query-string');
const post = require('axios').default.post;
const base64 = require('base-64');

let authRouter = Router();

const SCOPES = [
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'playlist-read-private',
];
const AUTH_HEADER = `Basic ${base64.encode(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)}`;

authRouter.get('/availability/:desired_id', async (req, res) => {
  let { desired_id } = req.params;

  try {
    let userdoc = await User.findOne({ id: desired_id }).exec();
    if (userdoc) {
      res.status(403).send('User with id already exists');
    } else {
      res.status(200).send('User id is available');
    }
  } catch (e) {
    res.status(400).send('Unable to check if user exists');
  }
});

authRouter.get('/spotify/:id', async (req, res) => {
  let { id } = req.params;

  try {
    let userdoc = await User.findOne({ id }).exec();
    if (userdoc) {
      res.status(400).send('A user with that id already exists');
      return;
    }
  } catch (e) {
    res.status(400).send('Unable to check if user exists');
    return;
  }

  // Construct query string for authorize URL
  const query = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    response_type: 'code',
    redirect_uri: 'http://localhost:3001/auth/callback',
    state: id,
    scope: SCOPES.join(' ')
  });
  
  // Redirect to the authorization page
  res.status(200).send(`https://accounts.spotify.com/authorize?${query}`);
});

authRouter.get('/callback', async (req, res) => {
  // Load the code and state of the callback
  let { code, state, error } = req.query;
  if (error) {
    res.status(400).send({ error: 'Error in Spotify authentication' });
    return;
  }

  let req_body = querystring.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: 'http://localhost:3001/auth/callback'
  });
  let options = {
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  try {
    let axios_res = await post('https://accounts.spotify.com/api/token', req_body, options);
    let data = axios_res.data;
    await new User({
      id: state,
      access: data.access_token,
      refresh: data.refresh_token,
      expire: Date.now() + (data.expires_in * 1000)
    }).save();
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

authRouter.get('/refresh/:id', async (req, res) => {
  let { id } = req.params;

  try {
    let userdoc = await User.findOne({ id }).exec();
    let userdata = userdoc.toJSON();

    let req_body = querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: userdata.refresh
    });
    let options = {
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    let axios_res = await post('https://accounts.spotify.com/api/token', req_body, options);
    let data = axios_res.data;
    await userdoc.update({
      access: data.access_token,
      expire: Date.now() + (3600 * 1000)
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = authRouter;
