import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { OrganizePlaylist } from '../components/OrganizePlaylist'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar/>

        <Card style= {{maxWidth: "345px"}}>
          <CardActionArea>
            <CardMedia
              style= {{height: "180px", float: "center"}} 
              
              title= "Spotify Logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Connect Your Spotify
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Connect your spotify now, to organize your playlist!
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/organize-playlist" component={OrganizePlaylist}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
  
}

export default App;
