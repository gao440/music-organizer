import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { OrganizePlaylist } from '../components/OrganizePlaylist'


export class App extends React.Component {
  render() {
    document.body.style = 'background: Black'
    return (
      <div>
        <NavBar/>
        <BrowserRouter>
          <Switch>
            {/* <Route exact path="/" component={Home}/> */}

            <Route exact path="/organize-playlist" component={OrganizePlaylist}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
  
}

export default App;
