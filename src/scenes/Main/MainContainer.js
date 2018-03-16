import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Home from '../Home/Home.js'
import Home_web from '../Home/web/Home_web.js'
import User from '../User/User.js'
import Content from '../Content/Content.js'
import Podcast from '../Podcast/Podcast.js'
import Favourites from '../Favourites/Favourites.js'
import Downloads from '../Downloads/Downloads.js'
import Historial from '../History/History.js'
import Later from '../Later/Later.js'
import Shared from '../Shared/Shared.js'
import Profile from '../Profile/Profile.js'
import Lists from '../Lists/Lists.js'
import Subscription from '../Subscription/Subscription.js'
import Bills from '../Bills/Bills.js'
import DeleteAccount from '../User/DeleteAccount.js'
import './MainContainer.scss'


class MainContainer extends React.Component {
  render() {
    return (
      <div className='mainContainer' >
        <div className="main">
          <Switch>
            <Route exact path='/' component={ localStorage.getItem('app') ? Home : Home_web } />
            <Route path='/user' component={User} />
            <Route path='/content' component={Content}/>
            <Route path='/podcast' component={Podcast}/>
            <Route path='/favourites' render={(props) => (
              <Favourites {...props} initplayer={this.props.initplayer} />
            )}/>
            <Route path='/downloads' component={Downloads} />
            <Route path='/later' render={(props) => (
              <Later {...props} initplayer={this.props.initplayer} />
            )}/>
            <Route path='/history' component={Historial} />
            <Route path='/shared' render={(props) => (
              <Shared {...props} initplayer={this.props.initplayer} />
            )}/>
            <Route path='/profile' render={(props) => (
              <Profile {...props}  auth={this.props.auth} />
            )}/>
            <Route path='/lists' render={(props) => (
              <Lists {...props} auth={this.props.auth} />
            )}/>
            <Route path='/subscription' render={(props) => (
              <Subscription {...props} auth={this.props.auth} />
            )}/>
            <Route path='/bills' render={(props) => (
              <Bills {...props} auth={this.props.auth} />
            )}/>
            <Route path='/deleteAccount' render={(props) => (
              <DeleteAccount {...props} auth={this.props.auth} />
            )}/>


          </Switch>
        </div>

      </div>
    );
  }
}

MainContainer.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(MainContainer);
export default MainContainer;