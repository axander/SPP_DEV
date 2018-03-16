import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import {API} from '../../services/Rest.js'
import LocalSpinner from '../Common/LocalSpinner/LocalSpinner.js'
import LocalError from '../Common/LocalError/LocalError.js'
import './Listened.scss'

class Listened extends React.Component {
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
      API.action('getMostListened', {}, this.onSuccess, this.onError, 'get');
  }
  render() {
    var lan = localStorage.getItem('language');
    if(typeof this.state.data.collection !== 'undefined'){
      var collection = this.state.data.collection;
    }else{
      collection = [];
    }
    if(typeof this.state.data.adv !== 'undefined'){
      var adv = this.state.data.adv;
    }else{
      adv = {};
    }
    return (
      <div className='most_listened' >
                <h1>{this.translate('blocks.listened')}</h1>
                <div className="row">
                  <div className="col-xs-12 col-sm-7">
                      <div className='most_listened_podcasts'>
                        <div className='row'>
                          {collection.map(( p , index) => {
                            return (
                              <div className="most_listened_item" style={p.style} onClick={() => this.props.initplayer.play(p.source, p.id, p.name, p)} >
                                <div className="most_listened_item_content" >
                                  <div className='most_listened_item_item_PB'>
                                    <div className='most_listened_item_item_PB_deco'>
                                      <div>&#9658;</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                  </div>
                  <div className="col-xs-12 col-sm-5">
                    <a href={adv.externalLink} target='_blank' className={ typeof this.state.data === 'undefined' || !adv.externalLink || adv.externalLink.length<=0  ? 'hide':'' } ><div className='most_listened_ads' style={adv.style}></div></a>
                    <Link to={'/'+adv.route} className={ typeof this.state.data === 'undefined' || !adv.route || adv.route.length<=0  ? 'hide':'' } ><div className='most_listened_ads' style={adv.style}></div></Link>
                  </div>
                </div>
                <div className={this.state.loading ? 'spinner':'hide'} ><LocalSpinner /></div>
                <div className={this.state.error ? 'error':'hide'} ><LocalError /></div>
      </div>
    );
  }
}

Listened.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Listened);
export default Listened;