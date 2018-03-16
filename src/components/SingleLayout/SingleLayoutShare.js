import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from '../Lists/List.js'

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.


class SingleLayoutShare extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Switch>
            <Route exact path='/shared/channel' render={(props) => (
              <List {...props} data={this.props.data.channel} what='channel' where='share' />
            )}/>
            <Route exact path='/shared/program' render={(props) => (
              <List {...props} data={this.props.data.program} what='program' where='share' />
            )}/>
            <Route exact path='/shared/podcast' render={(props) => (
              <List {...props} data={this.props.data.podcast} initplayer={this.props.initplayer} what='podcast' where='share' />
            )}/>
        </Switch>
        
      </div>

    )}
}

export default SingleLayoutShare