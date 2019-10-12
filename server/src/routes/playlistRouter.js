const Router = require('express').Router;
const User = require('../models/userModel');
const get = require('axios').default.get;
const put = require('axios').default.put;
const querystring = require('query-string');

let playlistRouter = Router();

playlistRouter.get('/:user_id', async (req, res) => {
  let { user_id } = req.params;

  try {
    let doc = await User.findOne({ id: user_id }).exec();
    let data = doc.toJSON();

    if (data.expire < Date.now()) {
      res.status(403).send('Access token expired');
      return;
    }

    let query = querystring.stringify({
      limit: 50
    });
    let options = {
      headers: {
        'Authorization': `Bearer ${data.access}`
      }
    };

    let ax_res = await get(`https://api.spotify.com/v1/me/playlists?${query}`, options);
    res.status(200).send(ax_res.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

playlistRouter.get('/:user_id/:playlist_id/gettracks', async (req, res) => {
  let { user_id, playlist_id } = req.params;

  try {
    let userdoc = await User.findOne({ id: user_id }).exec();
    let userdata = userdoc.toJSON();
    
    if (userdata.expire < Date.now()) {
      res.status(403).send('Access token expired');
      return;
    }

    let query = querystring.stringify({
      limit: 100,
      fields: 'items(added_at,track)'
    });
    let url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?${query}`;
    let options = {
      headers: {
        'Authorization': `Bearer ${userdata.access}`
      }
    };

    let ax_res = await get(url, options);
    res.status(200).send(ax_res.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

playlistRouter.put('/:user_id/:playlist_id/reordertracks', async (req, res) => {
  let { user_id, playlist_id } = req.params;
  let { uris } = req.body;

  try {
    let userdoc = await User.findOne({ id: user_id }).exec();
    let userdata = userdoc.toJSON();

    if (userdata.expire < Date.now()) {
      res.status(403).send('Access token expired');
      return;
    }

    let body = { uris };
    let url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
    let options = {
      headers: {
        'Authorization': `Bearer ${userdata.access}`,
        'Content-Type': 'application/json'
      }
    };
    await put(url, body, options);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = playlistRouter;
