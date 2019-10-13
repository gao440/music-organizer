import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios';

const GeneratePlaylist = () => {
  const [imageUrl, setImageUrl] = useState('')
  const imageUrlChange = (e) => setImageUrl(e.target.value)

  const [generated, setGenerated] = useState(false)

  const generatePlaylist = async () => {
    let url = encodeURIComponent(imageUrl);
    let res = await axios({
      method: 'GET',
      url: '/vision/labeldetect/' + url
    })
    let data = res.data
    let term = data[0].description
    res = await axios({
      method: 'GET',
      url: `/playlists/${localStorage.getItem('mo-username')}/${term}/generate`
    })
    setGenerated(true)
  };

  if (generated) {
    return (
      <div>
        ha
      </div>
    )
  }

  return (
    <div style={{color: 'white'}}>
      <TextField
      value={imageUrl}
      onChange={imageUrlChange}
      label='Image URL'
      style={{backgroundColor: 'white', color: 'black'}}/>
      { imageUrl && <img src={imageUrl} /> }
      <Button onClick={generatePlaylist} color='primary'>Generate Playlist</Button>
    </div>
  )
}

export default GeneratePlaylist;
