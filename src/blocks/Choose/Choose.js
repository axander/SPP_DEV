import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import {API} from '../../services/Rest.js'
import LocalSpinner from '../Common/LocalSpinner/LocalSpinner.js'
import LocalError from '../Common/LocalError/LocalError.js'
import './Choose.scss'

class Choose extends React.Component {
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
      API.action('getSubscription', {}, this.onSuccess, this.onError, 'get');
  }
  render() {
    var lan = localStorage.getItem('language');
    if(typeof this.state.data.collection !== 'undefined'){
      var collection = this.state.data.collection;
    }else{
      collection = [];
    }
    if(typeof this.state.data.style !== 'undefined'){
      var style = this.state.data.style;
    }else{
      style = {};
    }
    if(typeof this.state.data.title !== 'undefined'){
      var title = this.state.data.title[lan];
    }else{
      title = {};
    }
    return (
      <div className='choose' >
                <div className='choose_podcasts' style={style} >
                <div className='choose_podcasts_tittle' >{title}</div>
                <div className='choose_podcasts_content'>
                  {collection.map(( p , index) => {
                    return (
                      <div className="choose_item" style={p.style} >
                        <div className="choose_item_content" >
                          <div className="choose_item_user" >{p.user[lan]}</div>
                          <div className="choose_item_rate" >{p.rate[lan]}</div>
                          <div className="choose_item_description" >{p.description[lan]}</div>
                          <div className="choose_item_features" >
                            { p.features.map(( q , index) => {
                              return(
                                  <div className={ q.status ? "choose_item_feature choose_item_feature_active" : "choose_item_feature" } ><div className="choose_item_feature_checkmark" >&#10004;</div><div className="choose_item_feature_txt" >{q.description[lan]}</div></div>
                                )
                            })}
                          </div>
                          <a href={p.externalLink} target='_blank' className={typeof p.externalLink === 'undefined' || p.externalLink.length <= 0 ? 'hidden':'' } ><div className='choose-item-PB' style={p.btnText['style']} >
                              <div className="choose_item_feature" ><span>{p.btnText[lan]}</span></div>
                          </div></a>
                          <div className={typeof p.route === 'undefined' || p.route.length <= 0 ? 'hidden':'' }><Link to={'/'+p.route} ><div className='choose-item-PB' style={p.btnText['style']} >
                              <div className="choose_item_feature" ><span>{p.btnText[lan]}</span></div>
                          </div></Link></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className={this.state.loading ? 'spinner':'hide'} ><LocalSpinner /></div>
              <div className={this.state.error ? 'error':'hide'} ><LocalError /></div>
      </div>
    );
  }
}

Choose.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Choose);
export default Choose;