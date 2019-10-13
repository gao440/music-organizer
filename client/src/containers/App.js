import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { OrganizePlaylist } from '../components/OrganizePlaylist'
import Home from '../components/Home'
import GeneratePlaylist from '../components/GeneratePlaylist'

export class App extends React.Component {
  render() {
    document.body.style = 'background: Black'
    return (
      <div>
        <NavBar/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/organize-playlist" component={OrganizePlaylist}/>
            <Route exact path="/generate-playlist" component={GeneratePlaylist} />>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
  
}

export default App;
