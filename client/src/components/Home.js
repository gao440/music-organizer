import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import SpotifyButton from './SpotifyButton'
import SpotifyAuthModal from './SpotifyAuthModal'

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
            container
            direction="column"
            justify="center"
            alignItems="center"
            style= {{marginTop: "15px"}}>
          { !this.state.username && <SpotifyButton onClick={this.showModal.bind(this)}/> }
          {
            this.state.username && (
              <Button onClick={this.logout.bind(this)}>
                Logout
              </Button>
            )
          }
        </Grid>
      </div>
    )
  }
  
}

export default Home;
