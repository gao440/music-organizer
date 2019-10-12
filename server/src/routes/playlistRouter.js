const Router = require('express').Router;
const User = require('../models/userModel');
const get = require('axios').default.get;

let playlistRouter = Router();

playlistRouter.get('/:id', async (req, res) => {
  let { id } = req.params;

  try {
    let doc = await User.findOne({ id }).exec();
    doc = doc.toJSON();

    let options = {
      headers: {
        'Authorization': `Bearer ${doc.access}`
      }
    };

    let ax_res = await get('https://api.spotify.com/v1/me/playlists', options);
    res.status(200).send(ax_res.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = playlistRouter;
