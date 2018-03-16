import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Utils from '../../utils/Utils.js'

import About from '../../components/Info/About.js'
import AdsInfo from '../../components/Info/AdsInfo.js'
import Ads from '../../components/Info/Ads.js'
import Basic from '../../components/Info/Basic.js'
import Cookies from '../../components/Info/Cookies.js'
import Explore from '../../components/Info/Explore.js'
import Help from '../../components/Info/Help.js'
import Invited from '../../components/Info/Invited.js'
import Legal from '../../components/Info/Legal.js'
import List from '../../components/Info/List.js'
import Player from '../../components/Info/Player.js'
import Premium from '../../components/Info/Premium.js'
import Privacity from '../../components/Info/Privacity.js'

class Info extends React.Component {
  constructor(props) {
    super(props);
    localStorage.setItem('lastState',props.location.pathname);
  }
  componentDidMount() {
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
    Utils.scrollToTop(300);
    // Will execute as normal
  }
  componentDidUpdate() {
    Utils.scrollToTop(300);
    // Will execute as normal
  }
  render() {
    return (
      <div className='mainContainer' style={this.state.style}>
        <terms>
          <div className='info'>
            <div className="basicOuter" >
              <div className="basicInner">
                <h1>Info</h1>
                <Switch>
                  <Route exact path='/info/about' component={ About }/>
                  <Route exact path='/info/ads_info' component={ AdsInfo }/>
                  <Route exact path='/info/ads' component={ Ads }/>
                  <Route exact path='/info/basic' component={ Basic }/>
                  <Route exact path='/info/cookies' component={ Cookies }/>
                  <Route exact path='/info/explore' component={ Explore }/>
                  <Route exact path='/info/help_center' component={ Help }/>
                  <Route exact path='/info/invited' component={ Invited }/>
                  <Route exact path='/info/legal' component={ Legal }/>
                  <Route exact path='/info/list' component={ List }/>
                  <Route exact path='/info/player' component={ Player }/>
                  <Route exact path='/info/premium' component={ Premium }/>
                  <Route exact path='/info/privacity' component={ Privacity }/>
                </Switch>
              </div> 
            </div>
          </div>
        </terms>
      </div>
    );
  }
}

Info.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Info);
export default Info;