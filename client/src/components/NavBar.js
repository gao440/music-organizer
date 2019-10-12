import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Link } from '@material-ui/core'
import MusicIcon from '@material-ui/icons/MusicNote'
import HelpIcon from '@material-ui/icons/Help'


export class NavBar extends React.Component {

  render() {
    return (
      <div className="NavBar">
        <AppBar position="static">
          <Toolbar>
            <Link href="/">
                <IconButton>
                    <MusicIcon style={{color:'white'}} fontSize="large" />
                </IconButton>
            </Link>
            <Link href="/" style={{color:'white', textDecoration: 'none'}}>
                <Typography variant="h5">
                    Music Organizer
                </Typography>
            </Link>                 
            <Link href="/help" style={{position:'absolute', right:0}}>
                <IconButton>
                    <HelpIcon style={{color:'white'}} fontSize="large" />
                </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default NavBar
