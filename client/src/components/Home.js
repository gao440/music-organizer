import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SpotifyLogo from '../images/spotify.png'
import Grid from '@material-ui/core/Grid'

export class Home extends React.Component {
  render() {
    return (
      <div className="Home">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style= {{marginTop: "15px"}}
            >
                <Card style= {{maxWidth: "385px"}} >
                <CardActionArea>
                    <CardMedia
                    style= {{height: "365px", float: "center"}} 
                    image= {SpotifyLogo}
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
             </Grid>  
      </div>
    )
  }
  
}

export default Home;
