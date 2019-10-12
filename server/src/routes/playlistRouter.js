const Router = require('express').Router;
const User = require('../models/userModel');
const get = require('axios').default.get;

let playlistRouter = Router();

playlistRouter.get('/:id', async (req, res) => {
  let { id } = req.params;

  try {
    let doc = await User.findOne({ id }).exec();
    let data = doc.toJSON();

    if (data.expire < Date.now()) {
      await get(`/auth/refresh/${id}`);
      doc = await User.findOne({ id }).exec();
      data = doc.toJSON();
    }

    let options = {
      headers: {
        'Authorization': `Bearer ${data.access}`
      }
    };

    let ax_res = await get('https://api.spotify.com/v1/me/playlists', options);
    res.status(200).send(ax_res.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

playlistRouter.get('/:user_id/:playlist_id', async (req, res) => {
  let { user_id, playlist_id } = req.params;

  try {
    let userdoc = await User.findOne({ id: user_id }).exec();
    let userdata = userdoc.toJSON();

    if (userdata.expire < Date.now()) {
      await get(`/auth/refresh/${id}`);
      userdoc = await User.findOne({ id: user_id }).exec();
      userdata = userdoc.toJSON();
    }

    let url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

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

module.exports = playlistRouter;
