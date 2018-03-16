import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Comment from '../Stats/Comment.js'
import Date from '../Stats/Date.js'
import Played from '../Stats/Played.js'
import Like from '../Stats/Like.js'
import Lists from '../../utils/Lists.js'
import './Iteminfo.scss'

class Iteminfo extends React.Component {
  constructor(props) {
    super(props);
    console.log('iteminfo');
    console.log(this.props);
    this.state={
      'data':this.props.data,
      'actions':this.props.actions,
      'origen': this.props.origen
    }
    this.clickHandlerChannelLater = this.clickHandlerChannelLater.bind(this);
    this.clickHandlerChannelFav = this.clickHandlerChannelFav.bind(this);
    this.clickHandlerChannelShare = this.clickHandlerChannelShare.bind(this); 
    this.setSchemmaFav = this.setSchemmaFav.bind(this);
    this.setSchemmaLater = this.setSchemmaLater.bind(this);
    this.setSchemmaShare = this.setSchemmaShare.bind(this);  
  }
  setSchemmaLater(){
    this.props.initSchemma.setSchemma = Lists.saveToList(this.state.origen,'later',this.state.data.id);
    this.props.initSchemma.show(this.state.origen,'later',this.state.data);
  }
  clickHandlerChannelLater(event, _channel){
    event.stopPropagation();
    this.state.channel = _channel;
    this.props.auth.isAuthenticated
    ? this.setSchemmaLater()
    : (
      localStorage.setItem('savingList',true),
      localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = this.setSchemmaLater,
          window.location.href = './#/login'
        )
      : this.props.auth.required(this.setSchemmaLater)
    )
  }
  setSchemmaFav(){
    this.props.initSchemma.setSchemma = Lists.saveToList(this.state.origen,'fav',this.state.data.id);
    this.props.initSchemma.show(this.state.origen,'fav',this.state.data);
  }
  clickHandlerChannelFav(event){
    event.stopPropagation();
    this.props.auth.isAuthenticated
    ? this.setSchemmaFav()
    : (
      localStorage.setItem('savingList',true),
      localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = this.setSchemmaFav,
          window.location.href = './#/login'
        )
      : this.props.auth.required(this.setSchemmaFav)
    )
  }
  setSchemmaShare(){
    this.props.initSchemma.setSchemma = Lists.saveToList(this.state.origen,'share',this.state.data.id);
    this.props.initSchemma.show(this.state.origen,'later',this.state.data);
  }
  clickHandlerChannelShare(event){
    event.stopPropagation();
    this.props.auth.isAuthenticated
    ? this.setSchemmaShare()
    : localStorage.getItem('app')
      ? (
          localStorage.setItem('savingList',true),
          this.props.auth.afterRequiredApp = this.setSchemmaShare,
          window.location.href = './#/login'
        )
      : this.props.auth.required(this.setSchemmaShare)
  }
  componentDidMount() {
    // Will execute as normal
    var state = localStorage.getItem('lastState').split('/')[1];
    typeof this.state.data === 'undefined'
    ? this.setState({
        'lastState':state,
        'data':JSON.parse(localStorage.getItem('lastItemData'+state)),
        'origen': state === 'program' ? 'channel' : state === 'podcast' ? 'program' : state === 'static' ? 'podcast' : null
      })
    : localStorage.setItem('lastItemData'+this.props.destiny, JSON.stringify(this.props.data));
  }
  
  render() {
    let lan = localStorage.getItem('language');
    return (
      typeof this.state.data !== 'undefined'
      ? (
          <div className='iteminfo'>
            <div className="row">
              <div className="col-xs-2 cols-xs-2">
                <div className ="iteminfo_image" style={"background-image:url('"+this.state.data.image+"')"} ></div>
              </div>
              <div className="col-xs-10 cols-xs-10">
                <div>
                  Subcategoría
                </div>
                <div className="iteminfo_name" >
                  {this.state.data.name[lan]}
                </div>
                <div className="iteminfo_desc">
                  {this.state.data.desc[lan]}
                </div>
                <div>
                  <div className="item_info" >
                    <Like num={this.state.data.info.likes} />
                    <Comment num={this.state.data.info.comments} />
                    <Date num={this.state.data.info.date} />
                    <Played num={this.state.data.info.played} />
                  </div>
                </div>
                <div className='item_info_container_to_lists' >
                  <div className='item_info_container_to_lists_item' id='fav' onClick={ (event) => this.clickHandlerChannelFav(event)  }  >{this.translate('user.toFavourites')}</div>
                  <div className='item_info_container_to_lists_item' id='later' onClick={ (event, _item) => this.clickHandlerChannelLater(event, this.state.data) } >{this.translate('user.toLater')}</div>
                  <div className='item_info_container_to_lists_item' id='share' onClick={ (event, _item) => this.clickHandlerChannelShare(event, this.state.data) } >{this.translate('user.toSubscribe')}</div>
                  <div className='item_info_container_to_lists_item' id='share' onClick={ (event, _item) => this.clickHandlerChannelShare(event, this.state.data) } >{this.translate('user.share')}</div>
                </div>
              </div>
            </div>
          </div>
      )
      : ''
    )
  }
}

Iteminfo.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Iteminfo);
export default Iteminfo;