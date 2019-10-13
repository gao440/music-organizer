import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'

const UsernameTakenModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      The username you entered has been taken
    </Dialog>
  )
}

const SpotifyAuthModal = ({ open, handleClose, closeModal, setUsernameGlobal }) => {
  const [ username, setUsername ] = useState('');
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const [ usernameTaken, setUsernameTaken ] = useState(false);

  const attemptLink = async () => {
    try {
      await axios.get(`/auth/availability/${username}`)
    } catch (e) {
      if (e.response.status === 403) {
        setUsernameTaken(true)
        return
      }
    }

    try {
      let url = await axios.get(`/auth/spotify/${username}`)
      localStorage.setItem('mo-username', username)
      setUsernameGlobal(username)
      window.open(url.data)
      closeModal()
    } catch (e) {
    }
  }

  const closeUsernameTaken = () => {
    setUsernameTaken(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <UsernameTakenModal open={usernameTaken} handleClose={closeUsernameTaken} />
      <TextField
        label='Username'
        value={username}
        onChange={handleUsernameChange}
      />
      <Button onClick={attemptLink}> Link with Spotify </Button>
    </Dialog>
  )
}

export default SpotifyAuthModal
