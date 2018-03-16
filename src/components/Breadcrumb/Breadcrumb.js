import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Ads from '../../blocks/Ads/Ads.js'
import './Breadcrumb.scss'

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        'client':JSON.parse(localStorage.getItem('client')),
        'paths':[],
        'acumulate':[],
        'podcastActive':null
    }
  }
  componentDidMount(){
  }
  render() {
    var lan = localStorage.getItem('language');
    var sequence = this.props.location.pathname.split('/');
    sequence.shift();
    switch(sequence[0]){
      case 'info':
        this.state.acumulate=[];
        this.state.acumulate[0] ={
          'text':this.translate('info'),
          'path':this.props.location.pathname
        }
        this.state.acumulate[1] ={
          'text':sequence[1],
          'path':this.props.location.pathname
        }
      break;
      case 'register':
        this.state.acumulate=[];
        this.state.acumulate[0] ={
          'text':this.translate('register'),
          'path':this.props.location.pathname
        }
      break;
      case 'profile':
        this.state.acumulate=[];
        this.state.acumulate[0] ={
          'text':this.translate('profile'),
          'path':this.props.location.pathname
        }
      break;
      case 'deleteAccount':
        this.state.acumulate=[];
        this.state.acumulate[0] ={
          'text':this.translate('profile'),
          'path':'/profile'
        }
        this.state.acumulate[1] ={
          'text':this.translate('user.deleteAccount'),
          'path':this.props.location.pathname
        }
      break;
      case 'lists':
        this.state.acumulate=[];
        this.state.acumulate[0] ={
          'text':this.translate('profile'),
          'path':'/profile'
        }
        this.state.acumulate[1] ={
          'text':this.translate('lists'),
          'path':this.props.location.pathname
        }
      break;
      case 'subscription':
        this.state.acumulate=[];
        this.state.acumulate[0] ={
          'text':this.translate('profile'),
          'path':'/profile'
        }
        this.state.acumulate[1] ={
          'text':this.translate('subscription'),
          'path':this.props.location.pathname
        }
      break;
      case 'bills':
        this.state.acumulate=[];
        this.state.acumulate[0] ={
          'text':this.translate('profile'),
          'path':'/profile'
        }
        this.state.acumulate[1] ={
          'text':this.translate('bills'),
          'path':this.props.location.pathname
        }
      break;
      case 'channel':
        this.state.acumulate=[];
        this.state.acumulate[0] ={
          'text':this.translate('EXPLORE'),
          'path':this.props.location.pathname
        }
      break;
      case 'program':
        this.state.acumulate.length <=0
        ? this.state.acumulate[0] ={
            'text':this.translate('EXPLORE'),
            'path':'/channel'
          }
        : null;
        this.state.acumulate = this.state.acumulate.splice(0,2);
        if(!sequence[2]){
          window.location.href = '/';
        }else{
          this.state.acumulate[1] ={
            'text':sequence[2],
            'path':this.props.location.pathname
          }
        }
        
      break;
      case 'podcast':
        this.state.acumulate.length <=0
        ?(
          this.state.acumulate[0] ={
            'text':this.translate('EXPLORE'),
            'path':'/channel'
          },
          this.state.acumulate[1] ={
            'text':JSON.parse(localStorage.getItem('lastChannelName'))[lan],
            'path':'/program/'+localStorage.getItem('lastChannel')+'/'+JSON.parse(localStorage.getItem('lastChannelName'))[lan]
          }
        )
        : null;
        this.state.acumulate = this.state.acumulate.splice(0,3);
        this.state.acumulate[2] ={
          'text':sequence[2],
          'path':this.props.location.pathname
        }
        if(!sequence[2]){
          window.location.href = '/';
        }else{
          if(sequence.length>4){
            this.state.acumulate.push({
              'text':sequence[4],
              'path':''
            });
            
            if(!this.state.podcastActive){
              window.location.href = window.location.href.substring(0,window.location.href.indexOf(sequence[3])-1);
              this.state.podcastActive = sequence[4];
            }
          }else if(this.state.podcastActive){
            this.state.acumulate.push({
              'text':this.state.podcastActive,
              'path':''
            });
            this.state.podcastActive = null;
          }
        }
        
      break;
      case 'static':
        this.state.acumulate.length <=0
        ?(
          this.state.acumulate[0] ={
            'text':this.translate('EXPLORE'),
            'path':'/channel'
          },
          this.state.acumulate[1] ={
            'text':JSON.parse(localStorage.getItem('lastChannelName'))[lan],
            'path':'/program/'+localStorage.getItem('lastChannel')+'/'+JSON.parse(localStorage.getItem('lastChannelName'))[lan]
          },
          this.state.acumulate[2] ={
            'text':JSON.parse(localStorage.getItem('lastProgramName'))[lan],
            'path':'/podcast/'+localStorage.getItem('lastProgram')+'/'+JSON.parse(localStorage.getItem('lastProgramName'))[lan]
          },
          this.state.acumulate[3] ={
            'text':JSON.parse(localStorage.getItem('lastPodcastName'))[lan],
            'path':''
          }
        )
        : null;
        this.state.acumulate = this.state.acumulate.splice(0,4);
        this.state.acumulate[3] ={
          'text':sequence[2],
          'path':this.props.location.pathname
        }
      break;
      default:
        this.state.acumulate=[];
        this.state.acumulate[0] ={
          'text':sequence[1],
          'path':this.props.location.pathname
        }
      break;
    }
    this.state.paths = sequence;
    let Ad;
    this.props.auth.isAuthenticated && (this.state.client.paymentData.subscription.type.invited.status === 1 || this.state.client.paymentData.subscription.type.premium.status === 1 || this.state.client.paymentData.subscription.type.premium.status === 2)
    ? Ad = ''
    : Ad = <Ads />;
    return (
      <div className='breadcrumb' >
          <div>{Ad}</div>
          <div className="breadcrumb_container">
            <Link to={'/'} ><div className='breadcrumb_item' >{this.translate('INIT')}<span className='breadcrumb_item_deco' >❯</span></div></Link>
            {this.state.acumulate.map(( p , index) => {
              return (
                <Link to={p.path} ><div className='breadcrumb_item' >
                  {p.text}<span className='breadcrumb_item_deco' >❯</span>
                </div></Link>
              )
            })}
            
          </div>
      </div>
    );
  }
}

Breadcrumb.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Breadcrumb);
export default Breadcrumb;