import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import SpotifyLogo from '../images/spotify.png'

const SpotifyButton = ({ onClick }) => {
  return (
    <Card style= {{maxWidth: "385px"}} onClick={onClick}>
      <CardActionArea>
        <CardMedia
          style= {{height: "365px", float: "center"}} 
          image= {SpotifyLogo}
          title= "Spotify Logo"/>
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
  )
}

export default SpotifyButton