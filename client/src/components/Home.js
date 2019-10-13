import React from 'react'
import Grid from '@material-ui/core/Grid'
import SpotifyButton from './SpotifyButton'
import SpotifyAuthModal from './SpotifyAuthModal'
import Fab from '@material-ui/core/Fab';

export class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      username: null,
      showModal: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem('mo-username')) {
      this.setState({ username: localStorage.getItem('mo-username') })
    }
  }

  logout() {
    localStorage.removeItem('mo-username');
    this.setState({ username: null });
  }

  showModal() {
    this.setState({ showModal: true })
  }

  hideModal() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <div className="Home">
        <SpotifyAuthModal
          open={this.state.showModal}
          handleClose={this.hideModal.bind(this)}
          closeModal={this.hideModal.bind(this)}
          setUsernameGlobal={(username) => this.setState({ username })}/>
        <Grid
            item xs={12}
            container spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
            style= {{marginTop: "15px"}}>
          { !this.state.username && <SpotifyButton onClick={this.showModal.bind(this)}/> }
          {
            this.state.username && (
              <div>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  style= {{margin: "25px"}}>

                <Fab href="/organize-playlist" variant="extended" aria-label="add" 
                style= {{fontSize: "20px", width: "200px", height: "75px", color: "white", backgroundColor: "LimeGreen", fontFamily: "Georgia", textAlign:"center"}}>
                  Organize Your Playlist
                </Fab>

                <Fab onClick={this.logout.bind(this)} variant="extended" color="secondary" aria-label="add" 
                style= {{margin: "25px", fontSize: "20px", width: "200px", height: "75px", fontFamily: "Georgia", textAlign:"center"}}>
                  Logout
                </Fab>

                </Grid>
              </div>
            )
          }
        </Grid>
      </div>
    )
  }
  
}

export default Home;
