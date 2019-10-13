import React from 'react'
import { Grid, Button, Select, FormControl, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
const axios = require('axios')

export class OrganizePlaylist extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        userID: "",
        userPlaylists: [],
        selectedPlaylist: "",
        selected: false,
        filtered: false,
        features: [false, false, false, false, false, false, false, false, false, false]
    }
  }

  async componentWillMount() {
    axios({
      method: "GET",
      url: "/playlists/cdw2014"
    }).then(data => data.data).then(data => this.setState({userPlaylists: data.items}))
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

  render() {
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
                    {this.state.userPlaylists.map(playlist => {
                      return (
                        <option value={playlist.name}>{playlist.name}</option>
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
    } else {
      //rearrange
    }
  }
}

export default OrganizePlaylist