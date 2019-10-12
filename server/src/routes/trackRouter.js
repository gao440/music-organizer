const Router = require('express').Router;
const User = require('../models/userModel');
const get = require('axios').default.get;
const querystring = require('query-string');

let trackRouter = Router();

trackRouter.get('/:user_id/:track_id', async (req, res) => {
  let { user_id, track_id } = req.params;

  try {
    let userdoc = await User.findOne({ id: user_id }).exec();
    let userdata = userdoc.toJSON();

    if (userdata.expire < Date.now()) {
      res.status(403).send('Access token expired');
      return;
    }

    let url = `https://api.spotify.com/v1/audio-features/${track_id}`;
    let options = {
      headers: {
        'Authorization': `Bearer ${userdata.access}`
      }
    };

    let ax_res = await get(url, options);
    res.status(200).send(ax_res.data);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

trackRouter.get('/:user_id', async (req, res) => {
  let { user_id } = req.params;
  let { items } = req.body;

  items = items.join(',');

  try {
    let userdoc = await User.findOne({ id: user_id }).exec();
    let userdata = userdoc.toJSON();

    if (userdata.expire < Date.now()) {
      res.status(403).send('Access token expired');
      return;
    }

    console.log(items);
    let query = querystring.stringify({
      ids: items
    });
    let url = `https://api.spotify.com/v1/audio-features?${query}`;
    let options = {
      headers: {
        'Authorization': `Bearer ${userdata.access}`,
        'Content-Type': 'application/json'
      }
    };

    let ax_res = await get(url, options);
    res.status(200).send(ax_res.data);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = trackRouter;
