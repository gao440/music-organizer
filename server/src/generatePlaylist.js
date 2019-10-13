const axios = require('axios').default;
const querystring = require('query-string');

const getMe = async (userdata) => {
  let url = 'https://api.spotify.com/v1/me';
  let options = {
    headers: {
      'Authorization': `Bearer ${userdata.access}`
    }
  };

  try {
    let response = await axios.get(url, options);
    return response.data;
  } catch (e) {
    throw e;
  }
};

const createPlaylist = async (userdata, name) => {
  let me = await getMe(userdata);

  let url = `https://api.spotify.com/v1/users/${me.id}/playlists`;
  let data = {
    name
  };
  let options = {
    headers: {
      'Authorization': `Bearer ${userdata.access}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    let response = await axios.post(url, data, options);
    return response.data;
  } catch (e) {
    throw e;
  }
};

const searchSong = async (userdata, song, limit) => {
  let query = querystring.stringify({
    q: song,
    type: 'track',
    limit
  });
  let url = `https://api.spotify.com/v1/search?${query}`;
  let options = {
    headers: {
      'Authorization': `Bearer ${userdata.access}`
    }
  };

  try {
    let response = await axios.get(url, options);
    return response.data.tracks.items;
  } catch (e) {
    throw e;
  }
};

const getRecommendations = async (userdata, songs) => {
  let query = querystring.stringify({
    seed_tracks: songs.join(',')
  });
  let url = `https://api.spotify.com/v1/recommendations?${query}`;
  let options = {
    headers: {
      'Authorization': `Bearer ${userdata.access}`
    }
  };

  try {
    let response = await axios.get(url, options);
    return response.data.tracks;
  } catch (e) {
    throw e;
  }
};

const addTracksToPlaylist = async (userdata, playlist_id, uris) => {
  let query = querystring.stringify({
    uris: uris.join(',')
  })
  let url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?${query}`;
  let options = {
    headers: {
      'Authorization': `Bearer ${userdata.access}`
    }
  };

  try {
    let response = await axios.put(url, {}, options);
    return 'Success';
  } catch (e) {
    throw e;
  }
}

const generatePlaylist = async (userdata, term) => {
  let playlist = await createPlaylist(userdata, `Generated with term ${term}`);
  let songs = await searchSong(userdata, term, 3);
  songs = songs.map((song) => song.id)
  let recs = await getRecommendations(userdata, songs);
  let uris = recs.map(rec => rec.uri);
  return await addTracksToPlaylist(userdata, playlist.id, uris);
};

module.exports = generatePlaylist
