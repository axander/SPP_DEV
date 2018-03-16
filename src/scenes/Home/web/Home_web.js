import React from 'react'
import ReactDOM from 'react-dom'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import Utils from '../../../utils/Utils.js';

import './styles/home_web.scss'

const data = require('./schemma/schemma.json')


class Home_web extends React.Component {
  constructor(props) {
    super(props);
    console.log('props home web');
    console.log(props)
    localStorage.setItem('lastState',props.location.pathname);
    this.state = {
      'client':JSON.parse(localStorage.getItem('client')),
      'template': localStorage.getItem('template'),
      'toogle':true,
      'show': 'hideMenu',
      'loggedAs': localStorage.getItem('logged') ? 'basicBorderBtn inline' : 'hide',
      'notLogged': localStorage.getItem('logged') ? 'hide' : 'basicBorderBtn inline',
      'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
    };
  }
  componentDidMount() {
    this.setState({
      'client':JSON.parse(localStorage.getItem('client'))
    })
  }
  componentDidUpdate(){
    this.state = {
      'client':JSON.parse(localStorage.getItem('client')),
      'toogle':true,
      'show': 'hideMenu',
      'loggedAs': localStorage.getItem('logged') ? 'basicBorderBtn inline' : 'hide',
      'notLogged': localStorage.getItem('logged') ? 'hide' : 'basicBorderBtn inline',
      'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
    }
    Utils.scrollToTop(300);
  }

  render() {
    console.log('client data');
    console.log(this.state.client);
    let Component, Filtered;
    this.props.auth.isAuthenticated
    ? this.state.client.paymentData.subscription.type.premium.status === 1
      ? Filtered = data.schemma.generic.premium
      : this.state.client.paymentData.subscription.type.invited.status === 1
        ? Filtered = data.schemma.generic.premium
        : Filtered = data.schemma.generic.basic
    : Filtered = data.schemma.generic.notLogged;
    return (
      <div className={ "home_web home_web_" + this.state.template } >
        <div className="main">
          <div className="row">
            {Filtered.map(p => {
              switch(p.from){
                  case 'scenes':
                    Component = require('scenes/'+p.path).default;
                  break;
                  case 'blocks':
                    Component = require('blocks/'+p.path).default;
                  break;
                  default:
                  break;
              }
              return (
                <div className="col-xs-12 col-md-12">
                  <Component initplayer={this.props.initplayer} initSchemma={this.props.initSchemma} auth={this.props.auth} >{p.component}</Component>
                </div>
              )
            })}
            {data.schemma.scenes.map(p => {
              switch(p.from){
                  case 'scenes':
                    Component = require('scenes/'+p.path).default;
                  break;
                  case 'blocks':
                    Component = require('blocks/'+p.path).default;
                  break;
                  default:
                  break;
              }
              return (
                <div className="col-xs-12 col-md-12">
                  <div>
                    <h1>{this.translate('menu.'+p.name).toUpperCase()}</h1>
                  </div>
                  <div className='section-container_web' >
                    <div className="section-container" >
                        <div className="section-contain">
                          <Component initplayer={this.props.initplayer} initSchemma={this.props.initSchemma} auth={this.props.auth} >{p.component}</Component>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>  
    );
  }
}

Home_web.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Home_web);
export default Home_web;