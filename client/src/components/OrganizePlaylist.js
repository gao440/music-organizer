import React from 'react'
import { Grid, Button, Select, FormControl, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
const axios = require('axios')

export class OrganizePlaylist extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userID: "",
        userPlaylists: [],
        songIds: [],
        selectedPlaylist: "",
        selected: false,
        filtered: false,
        reorder: false,
        songsFeatures: [],
        organized: false,
        features: [false, false, false, false, false, false, false, false, false, false]
    }
  }

  async componentWillMount() {
    axios({
      method: "GET",
      url: `/playlists/${localStorage.getItem('mo-username')}`
    }).then(data => data.data).then(data => this.setState({userPlaylists: data.items}))
  }

  async getTracks() {
    let id = this.state.userPlaylists.filter(playlist => playlist.name === this.state.selectedPlaylist)[0].id
    return await axios({
      method: "GET",
      url: `/playlists/${localStorage.getItem('mo-username')}/${id}/gettracks`
    }).then(data => data.data)
  }

  
  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
  }

  handleClick(state) {
    this.setState({[state]: true})
  }

  handleToggle(index) {
    let updated = !this.state.features[index]
    let newFeatures = this.state.features
    newFeatures[index] = updated
    this.setState({features: newFeatures})
  }

  getTrackFeatures(songIds) {
    let songsFeatures = []
    try {
      axios({
        method: "GET",
        url: `/tracks/${localStorage.getItem('mo-username')}?items=${songIds}`,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(data => data.data).then(data => {
        data.audio_features.forEach(song => {
          songsFeatures.push({
            "id": song.id,
            features: [song.danceability,
                        song.energy,
                        song.key,
                        song.loudness,
                        song.speechiness,
                        song.acousticness,
                        song.instrumentalness,
                        song.liveness,
                        song.valence,
                        song.tempo]
            })
        })
        this.setState({songsFeatures: songsFeatures, reorder: true})
      })
    } catch (e) {
      console.log(e)
    }
  }

  reorderPlaylist() {
    let { songsFeatures } = this.state
    songsFeatures.forEach(song => {
      let sum = 0
      song.features.forEach((feature, i) => {
        sum = sum + (feature * this.state.features[i])
        song.sum = sum
      })
    })
    songsFeatures = songsFeatures.sort((a,b) => {
      return a.sum - b.sum
    })
    let uris = []
    songsFeatures.forEach(song => uris.push("spotify:track:"+song.id))
    let id = this.state.userPlaylists.filter(playlist => playlist.name === this.state.selectedPlaylist)[0].id
    axios({
      method: "PUT",
      url: `/playlists/${localStorage.getItem('mo-username')}/${id}/reordertracks`,
      data:{uris: uris}
    }).then(() => {
      this.setState({ organized: true });
    });
  }

  render() {
    if (this.state.organized) {
      return (
        <div style={{color: 'white'}}>
          THE PLAYLIST WAS ORGANIZED
        </div>
      );
    }
    if(!this.state.selected) {
      return (
          <Grid container item xs={12} direction="column" alignItems="center">
              <Grid item justify="center">
                <h1 style={{color:"White", fontFamily: "Georgia"}}>Select a Playlist</h1>
                <FormControl style={{backgroundColor: "white"}}>
                  <Select
                    native
                    value={this.state.selectedPlaylist}
                    onChange={this.handleChange('selectedPlaylist')}
                  >
                    <option value=""></option>
                    {this.state.userPlaylists.map(playlist => {
                      return (
                        <option key={playlist.id} value={playlist.name}>{playlist.name}</option>

                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button variant="contained" style={{marginTop: '12px', backgroundColor: "LimeGreen", color: "white", fontFamily: "Georgia"}}
                  onClick={()=>this.handleClick('selected')}
                >
                  Next
                </Button>
              </Grid>
          </Grid>
      )
    } else if(!this.state.filtered) {
      return (
        <Grid container item xs={12} direction="column" alignItems="center">
            <Grid item justify="center">
              <h1 style={{color: "white", fontFamily: "Georgia"}}>Select Features to Organize {this.state.selectedPlaylist} By:</h1>
              <FormControl component="fieldset">
                <FormGroup style={{color: "white", fontFamily: "Georgia"}}>
                  <FormControlLabel
                    control={<Checkbox style={{color: "LimeGreen"}} checked={this.state.features[0]} onChange={() => this.handleToggle(0)} value="gilad" />}
                    label="Danceability"
                  />
                  <FormControlLabel
                    control={<Checkbox style={{color: "LimeGreen"}} checked={this.state.features[1]} onChange={() => this.handleToggle(1)} value="jason" />}
                    label="Energy"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox style={{color: "LimeGreen"}} checked={this.state.features[2]} onChange={() => this.handleToggle(2)} value="antoine" />}
                    label="Key"
                  />
                  <FormControlLabel
                    control={<Checkbox style={{color: "LimeGreen"}} checked={this.state.features[3]} onChange={() => this.handleToggle(3)} value="gilad" />}
                    label="Loudness"
                  />
                  <FormControlLabel
                    control={<Checkbox style={{color: "LimeGreen"}} checked={this.state.features[4]} onChange={() => this.handleToggle(4)} value="gilad" />}
                    label="Speechiness"
                  />
                  <FormControlLabel
                    control={<Checkbox style={{color: "LimeGreen"}} checked={this.state.features[5]} onChange={() => this.handleToggle(5)} value="gilad" />}
                    label="Acousticness"
                  />
                  <FormControlLabel
                    control={<Checkbox style={{color: "LimeGreen"}} checked={this.state.features[6]} onChange={() => this.handleToggle(6)} value="gilad" />}
                    label="Instrumentalness"
                  />
                  <FormControlLabel
                    control={<Checkbox style={{color: "LimeGreen"}} checked={this.state.features[7]} onChange={() => this.handleToggle(7)} value="gilad" />}
                    label="Liveness"
                  />
                  <FormControlLabel
                    control={<Checkbox style={{color: "LimeGreen"}} checked={this.state.features[8]} onChange={() => this.handleToggle(8)} value="gilad" />}
                    label="Valence"
                  />
                  <FormControlLabel
                    control={<Checkbox style={{color: "LimeGreen"}} checked={this.state.features[9]} onChange={() => this.handleToggle(9)} value="gilad" />}
                    label="Tempo"
                  />
                </FormGroup>
              </FormControl>           
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" style={{backgroundColor: "LimeGreen", marginTop: '12px', fontFamily: "Georgia"}}
                onClick={()=>this.handleClick('filtered')}
              >
                Next
              </Button>
            </Grid>
        </Grid>
      )
    } else if (this.state.filtered && !this.state.reorder) {

      let tracks = this.getTracks()
      let songIds = []

      tracks.then(data => {
        data.items.map(song => {
          songIds.push(song.track.id)
        })
      }).finally(() => this.getTrackFeatures(songIds))
    } else if (this.state.reorder) {
      this.reorderPlaylist()
      return (
        <p></p>
      )
    }
    return (
      <p>Loading tracks...</p>
    )     
  }
}



export default OrganizePlaylist