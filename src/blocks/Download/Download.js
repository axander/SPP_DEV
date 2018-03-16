import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import {API} from '../../services/Rest.js'
import LocalSpinner from '../Common/LocalSpinner/LocalSpinner.js'
import LocalError from '../Common/LocalError/LocalError.js'
import DownApple from '../../components/App/Buttons/DownApple.js';
import DownAndroid from '../../components/App/Buttons/DownAndroid.js';
import './Download.scss'

class Download extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'init':true,
      'loading':true,
      'error':false,
      'data':{}
    }
  }
  onSuccess = (_response) => {
    _response.status === 'successfull'
    ? (
        this.setState({
          'init':false,
          'loading':false,
          'error':false,
          'data':_response.data
        })
      )
    : (
        this.setState({
          'init':false,
          'loading':false,
          'error':true
        })
      );
  }
  onError = (_response, _error) =>{
    this.setState({
          'init':false,
          'loading':false,
          'error':true
        })
  }
  componentDidMount(){
      API.action('getDownload', {}, this.onSuccess, this.onError, 'get');
  }
  render() {
    var lan = localStorage.getItem('language');
    if(typeof this.state.data.subscription !== 'undefined'){
      var subscription = 
        <div style={this.state.data.subscription.style} >
              <div className='download_subscription_title' >{this.state.data.subscription.title[lan]}</div>
              <div className='download_subscription_subtitle'>{this.state.data.subscription.subtitle[lan]}</div>
              <a href={this.state.data.subscription.externalLink} target='_blank' className={typeof this.state.data.subscription.externalLink === 'undefined' || this.state.data.subscription.externalLink.length <= 0 ? 'hidden':'' } ><div className='download_subscription_PB' >
                  <span>{this.state.data.subscription.btnText[lan]}</span>
              </div></a>
              <Link to={'/'+this.state.data.subscription.route} className={typeof this.state.data.subscription.route === 'undefined' || this.state.data.subscription.route.length <= 0 ? 'hidden':'' } ><div className='download_subscription_PB' >
                  <span>{this.state.data.subscription.btnText[lan]}</span>
              </div></Link>
        </div>
    }else{
      subscription ='';
    }
    if(typeof this.state.data.download !== 'undefined'){
      var download = 
        <div className='download_apps'>
          <div className='download_apps_content' >
            <div className='download_apps_content_title' >{this.state.data.download.title[lan]}</div>
            <div className='download_apps_content_subtitle'>{this.state.data.download.subtitle[lan]}</div>
            <DownApple />
            <DownAndroid />
          </div>
          <div className='download_deco' style={this.state.data.download.style} ></div>
        </div>
        
    }else{
      download ='';
    }
    return (
      <div className='download' >
                {download}
                <div className='download_subscription'>
                  {subscription}
                </div>
                <div className={this.state.loading ? 'spinner':'hide'} ><LocalSpinner /></div>
                <div className={this.state.error ? 'error':'hide'} ><LocalError /></div>
      </div>
    );
  }
}

Download.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Download);
export default Download;