import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import {API} from '../../services/Rest.js'
import PodcastSingleList from '../../components/Podcast/PodcastSingleList/PodcastSingleList.js'
import LocalSpinner from '../Common/LocalSpinner/LocalSpinner.js'
import LocalError from '../Common/LocalError/LocalError.js'
import './ListsBasic.scss'

class ListsBasic extends React.Component {
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
      API.action('getListsBasic', {}, this.onSuccess, this.onError, 'get');
  }
  render() {
    var lan = localStorage.getItem('language');
    var later, subscriptions;
    if(typeof this.state.data.collection !== 'undefined' && this.state.data.collection.later){
      later = this.state.data.collection.later;
    }else{
      later = [];
    }
    if(typeof this.state.data.collection !== 'undefined' && this.state.data.collection.subscriptions){
      subscriptions = this.state.data.collection.subscriptions;
    }else{
      subscriptions = [];
    }
    if(typeof this.state.data.adv !== 'undefined'){
      var adv = this.state.data.adv;
    }else{
      adv = {};
    }
    return (
      <div className='lists_basic' >
                <h1>{this.translate('blocks.listsBasic')}</h1>
                <div className="row">
                  <div className="col-xs-12 col-sm-7">
                    <div><PodcastSingleList data={later} initplayer={this.props.initplayer} /></div>
                    <div><PodcastSingleList data={subscriptions} initplayer={this.props.initplayer} /></div>
                    <Link to={'/lists/all'} ><div className="lists_basic_all" >{this.translate('blocks.allMyLists')}</div></Link>
                  </div>
                  <div className="col-xs-12 col-sm-5">
                    <a href={adv.externalLink} target='_blank' className={ typeof this.state.data === 'undefined' || !adv.externalLink || adv.externalLink.length<=0  ? 'hide':'' } ><div className='lists_basic_ads' style={adv.style}></div></a>
                    <Link to={'/'+adv.route} className={ typeof this.state.data === 'undefined' || !adv.route || adv.route.length<=0  ? 'hide':'' } ><div className='lists_basic_ads' style={adv.style}></div></Link>
                  </div>
                </div>
                <div className={this.state.loading ? 'spinner':'hide'} ><LocalSpinner /></div>
                <div className={this.state.error ? 'error':'hide'} ><LocalError /></div>
      </div>
    );
  }
}

ListsBasic.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(ListsBasic);
export default ListsBasic;