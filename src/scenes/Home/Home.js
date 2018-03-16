import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Program from '../Program/Program.js'
import Channel from '../Channel/Channel.js'
import Podcast from '../Podcast/Podcast.js'

class Home extends React.Component {
  constructor(props) {
    super(props);
    localStorage.setItem('lastState',props.location.pathname);
    this.state = {
      'toogle':true,
      'show': 'hideMenu',
      'loggedAs': localStorage.getItem('logged') ? 'basicBorderBtn inline' : 'hide',
      'notLogged': localStorage.getItem('logged') ? 'hide' : 'basicBorderBtn inline',
      'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(){
    this.props.auth.afterRequiredApp = null;
  }
  componentDidMount() {
  }
  componentDidUpdate(){
    this.state = {
      'toogle':true,
      'show': 'hideMenu',
      'loggedAs': localStorage.getItem('logged') ? 'basicBorderBtn inline' : 'hide',
      'notLogged': localStorage.getItem('logged') ? 'hide' : 'basicBorderBtn inline',
      'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
    }
  }

  render() {
    return (
      <div className="home" >
        <div>
  	    	<h1>{this.translate('welcome')}</h1>
          <div>
            <Link to='/login' className='contrast'><div className={this.state.notLogged} onClick={this.clickHandler} >{this.translate('initSession') }</div></Link>
            <Link to='/user' className='contrast'><div className={this.state.loggedAs}>{this.translate('logged.as')}{this.state.nickName}</div></Link>
            <Link to='/register' className='contrast'><div className="basicBtn inline">{this.translate('create.account')}</div></Link>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div>
              <h1>{this.translate('menu.channel').toUpperCase()}</h1>
            </div>
            <div className="section-container" >
              <div className="section-contain">
                <Channel initSchemma={this.props.initSchemma} auth={this.props.auth} />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div>
              <h1>{this.translate('menu.program').toUpperCase()}</h1>
            </div>
            <div className="section-container" >
              <div className="section-contain">
                <Program channel={localStorage.getItem('lastChannel') ? localStorage.getItem('lastChannel') : 'generic' } initSchemma={this.props.initSchemma} auth={this.props.auth} />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div>
              <h1>{this.translate('menu.podcast').toUpperCase()}</h1>
            </div>
            <div className="section-container" >
              <div className="section-contain">
                <Podcast program={localStorage.getItem('lastProgram') ? localStorage.getItem('lastProgram') : 'generic' } auth={this.props.auth} initplayer={this.props.initplayer} initSchemma={this.props.initSchemma}  />
              </div>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

Home.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Home);
export default Home;