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

authRouter.get('/spotify/:id', async (req, res) => {
  let { id } = req.params;

  // Construct query string for authorize URL
  const query = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    response_type: 'code',
    redirect_uri: 'http://localhost:3001/auth/callback',
    state: id,
    scope: SCOPES.join(' ')
  });
  
  // Redirect to the authorization page
  res.status(200).redirect(`https://accounts.spotify.com/authorize?${query}`);
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
});

module.exports = authRouter;
