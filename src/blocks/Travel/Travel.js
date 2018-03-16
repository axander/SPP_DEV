import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import {API} from '../../services/Rest.js'
import LocalSpinner from '../Common/LocalSpinner/LocalSpinner.js'
import LocalError from '../Common/LocalError/LocalError.js'
import './Travel.scss'

class Travel extends React.Component {
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
      API.action('getTravel', {}, this.onSuccess, this.onError, 'get');
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
      <div className='travel' >
        <div className='travel_podcasts' style={style} >
          <div className='travel_podcasts_tittle' >{title}</div>
          <div className='travel_podcasts_content'>
            {collection.map(( p , index) => {
              return (
                <div className="travel_item" style={p.style} onClick={() => this.props.initplayer.play(p.source, p.id, p.name, p)} >
                  <div className="travel_item_content" >
                    <div className='travel_item_item_PB'>
                      <div className='travel_item_item_PB_deco'>
                        <div>&#9658;</div>
                      </div>
                    </div>
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

Travel.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Travel);
export default Travel;