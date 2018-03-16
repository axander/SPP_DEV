import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from '../Lists/List.js'

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.


class SingleLayoutLater extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Switch>
            <Route exact path='/later/channel' render={(props) => (
              <List {...props} data={this.props.data.channel} what='channel' where='later' />
            )}/>
            <Route exact path='/later/program' render={(props) => (
              <List {...props} data={this.props.data.program} what='program' where='later' />
            )}/>
            <Route exact path='/later/podcast' render={(props) => (
              <List {...props} data={this.props.data.podcast} initplayer={this.props.initplayer} what='podcast' where='later' />
            )}/>
        </Switch>
        
      </div>

    )}
}

export default SingleLayoutLater