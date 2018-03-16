import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import PlayerApp from '../../components/Player/PlayerApp/PlayerApp.js'
import Submenu from '../../components/Submenu/Submenu.js'
import UsuarioApi from '../../services/api2.js'
import Iteminfo from '../../components/Iteminfo/Iteminfo.js'
import Opinion from '../../blocks/Opinion/Opinion.js'
import Pages from '../../components/Pages/Pages.js'
import SingleLayout from '../../components/SingleLayout/SingleLayout.js'
import later from '../../assets/images/later.png'
import fav from '../../assets/images/fav.png'
import share from '../../assets/images/share.png'
import Comment from '../../components/Stats/Comment.js'
import Date from '../../components/Stats/Date.js'
import Played from '../../components/Stats/Played.js'
import Like from '../../components/Stats/Like.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import Utils from '../../utils/Utils.js'
import Lists from '../../utils/Lists.js'
import './podcast.scss'

class Podcast extends React.Component {
  constructor(props) {
    super(props);
    console.log('props podcast');
    console.log(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    this.state = {
      'schemmaShow':false,
      'schemma':[],
      'data':[ ],
      'program': typeof this.props.match === 'undefined' ? 'FORBESDAILY' : typeof this.props.match.params.program === 'undefined' ? ( localStorage.getItem('lastProgram') ? localStorage.getItem('lastProgram') : 'FORBESDAILY' ) : this.props.match.params.program,
      'options':[],
      'phase': parseFloat(localStorage.getItem('phase_podcast_'+localStorage.getItem('lastProgram'))) || 0 ,
      'total':0
    }
    this.options =[];
    this.clickHandlerPodcastLater = this.clickHandlerPodcastLater.bind(this);
    this.clickHandlerPodcastFav = this.clickHandlerPodcastFav.bind(this);
    this.clickHandlerPodcastShare = this.clickHandlerPodcastShare.bind(this);
    this.setSchemmaFav = this.setSchemmaFav.bind(this);
    this.setSchemmaLater = this.setSchemmaLater.bind(this);
    this.setSchemmaShare = this.setSchemmaShare.bind(this);
    this.clickHandlerOpen = this.clickHandlerOpen.bind(this);
    this.clickHandlerClose = this.clickHandlerClose.bind(this);
    this.setPhase = this.setPhase.bind(this);
  }
  onSuccess = (_response) => {
    Utils.scrollToTop(300);
    _response.status === 'successfull'
    ? ( 
      this.setState ({
        'data':_response.data,
        'total':_response.total,
        'phase': parseFloat(localStorage.getItem('phase_podcast_'+localStorage.getItem('lastProgram'))) || 0 ,
        'perPhase':_response.perPhase
      }),
      localStorage.setItem('podcast', JSON.stringify(_response.data))
    )
    : this.setState({
        isOpen: true,
        showedMsg: 'podcast.' + _response.reason
    });
  }
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedMsg: _error
      });
  }
  toggleModal = () => {
      this.setState({
          isOpen: !this.state.isOpen
      });
   }
  setSchemmaLater(){
    this.props.initSchemma.setSchemma = Lists.saveToList('podcast','later',this.state.podcast.id);
    this.props.initSchemma.show('podcast','later',this.state.podcast);
  }
  clickHandlerPodcastLater(event, _podcast){
    event.stopPropagation();
    this.state.podcast = _podcast
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
    this.props.initSchemma.setSchemma = Lists.saveToList('podcast','fav',this.state.podcast.id);
    this.props.initSchemma.show('podcast','fav',this.state.podcast);
  }
  clickHandlerPodcastFav(event, _podcast){
    event.stopPropagation();
    this.state.podcast = _podcast
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
    this.props.initSchemma.setSchemma = Lists.saveToList('podcast','share',this.state.podcast.id);
    this.props.initSchemma.show('podcast','share',this.state.podcast);
  }
  clickHandlerPodcastShare(event, _podcast){
    event.stopPropagation();
    this.state.podcast = _podcast
    this.props.auth.isAuthenticated
    ? this.setSchemmaShare()
    : (
      localStorage.setItem('savingList',true),
      localStorage.getItem('app')
      ? (
          this.props.auth.afterRequiredApp = this.setSchemmaShare,
          window.location.href = './#/login'
        )
      : this.props.auth.required(this.setSchemmaShare)
    )
  }
  clickHandlerClose(_option){
    this.options[_option]= false;
    this.setState({
      'options':this.options
    })
  }
  clickHandlerOpen(_option){
    this.options[_option]= true;
    this.setState({
      'options':this.options
    })
  }
  setPhase(_phase){
    window.setSpinner();//,
    API.action('getListPod'+this.state.program, { 'program' : this.state.program, 'phase': parseFloat(localStorage.getItem('phase_podcast_'+localStorage.getItem('lastProgram'))) || 0 }, this.onSuccess, this.onError, 'GET');
  }
  initPlayer(p){
    localStorage.setItem('lastItemDatastatic',JSON.stringify(p));
    Utils.scrollToTop(300);
    //window.location.href = window.location.href+'/'+p.id+'/'+p.name[localStorage.getItem('language')];
    this.props.initplayer.data = p;
    this.props.initplayer.play(p.source, p.id, p.name, p);
    window.location.href = './#/static/'+p.id+'/'+p.name[localStorage.getItem('language')];
  }
  componentDidMount(){
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
    /*typeof localStorage.getItem('program')!=='undefined' && localStorage.getItem('program') && localStorage.getItem('lastProgram') === this.state.program
    ? this.setState ({
        'data':JSON.parse(localStorage.getItem('podcast'))
      })
    : ( */
      localStorage.setItem('lastProgram',this.state.program );//,
      localStorage.setItem('lastOpinion',this.state.program);//,
      window.setSpinner();//,
      API.action('getListPod'+this.state.program, { 'program' : this.state.program, 'phase': parseFloat(localStorage.getItem('phase_podcast_'+localStorage.getItem('lastProgram'))) || 0 }, this.onSuccess, this.onError, 'GET');
      //)
  }
  /*<div class="col-xs-6">
    <div className="desc">
      {p.desc[localStorage.getItem('language')]}
    </div>
  </div>*/
  /*<PlayerApp />*/
  render() {
    let PagesList;
    if(this.state.total>0){
      PagesList = <Pages total={this.state.total} perPhase={this.state.perPhase}  setPhase= {this.setPhase} auth={this.props.auth} list="podcast" />
    }
    return (
      <div className={ Utils.checkScene('/podcast') ? 'podcast' : 'podcast resetPaddingBottom' } style={this.state.style} >
        <div className={ Utils.checkScene('/podcast') ? 'hide' : 'hide' } >
          <h1>{this.translate('menu.podcast').toUpperCase() + ' ' + this.translate('program') + ' ' + ( localStorage.getItem('lastProgramName') ? JSON.parse(localStorage.getItem('lastProgramName'))[localStorage.getItem('language')] : '' ) }</h1>
        </div>
        <div className='row' >
          <div className="col-xs-12" >
            <Iteminfo data={this.props.location.data} destiny={this.props.location.destiny} auth={this.props.auth} origen="program" initSchemma={this.props.initSchemma} />
          </div>
        </div>
        <div className={ Utils.checkScene('/podcast') ? '' : 'resetPaddingTop' }>
          <div class="row" >
            {
              this.state.data.map((p, index)  => (
                <div className="col-xs-12 col-md-4" >
                  <div className ={ (index-1)%3===0 ? 'item_container' : index%3===0 ? 'item_container_left' : 'item_container_right'} >
                    <div className={ p.id === localStorage.getItem('lastPodcast') ? "contentSelected" : "" } >
                        <div className="row item" >
                          <div className="col-xs-12 ">
                            <div className="item_origen">
                              Origen
                            </div>
                          </div>
                          <div className="col-xs-12 ">
                            <div className="rot">
                              {index+1+this.state.phase*this.state.perPhase}. {p.name[localStorage.getItem('language')]}
                            </div>
                          </div>
                          <div class="desc_cont">
                            {/*<div className="options" >
                              <div><div><img id='later' src={later} alt="later" onClick={ (event, _podcast) => this.clickHandlerPodcastLater(event, p) } /></div></div>
                              <div><div><img id='fav' src={fav} alt="fav" onClick={ (event, _podcast) => this.clickHandlerPodcastFav(event, p) } /></div></div>
                              <div><div><img id='share' src={share} alt="share" onClick={ (event, _podcast) => this.clickHandlerPodcastShare(event, p) } /></div></div>
                            </div>*/}
                            <div className="item_info" >
                              <Like num={p.info.likes} />
                              <Comment num={p.info.comments} />
                              <Date num={p.info.date} />
                              <Played num={p.info.played} />
                            </div>
                            <div class="item_actions">
                                <div class="item_actions_podcast" id={p.id} name={p.name[localStorage.getItem('language')]} onClick={() => this.initPlayer(p)} >
                                  <div><div class='basicOuter'><div class='basicInner'>
                                      <div className="item_desc" style={ 'background-image:url("' + p.image + '")'} >
                                        
                                      </div>
                                  </div></div></div>
                                  <div><div class='basicOuter'><div class='basicInner'>
                                    <div class='item_actions_text' >
                                      <div class="item_actions_play_PB"><div><div>►</div></div></div>
                                      {this.translate('listen')}
                                    </div>
                                  </div></div></div>
                                </div>
                                <div><div class='basicOuter'><div class='basicInner'>
                                    <div class="item_actions_options" onClick={() => this.clickHandlerOpen(index)} >•••</div>
                                </div></div></div>
                            </div>
                          </div>
                          <div className={this.state.options[index] ? 'item_container_to_lists' : 'hide' }  >
                            
                            <div className='item_container_to_lists_item' id='fav' alt="fav" onClick={ (event, _podcast) => this.clickHandlerPodcastFav(event, p) } >{this.translate('user.toFavourites')}</div>
                            <div className='item_container_to_lists_item' id='later' alt="later" onClick={ (event, _podcast) => this.clickHandlerPodcastLater(event, p) } >{this.translate('user.toLater')}</div>
                            <div className='item_container_to_lists_item' id='share' onClick={ (event, _podcast) => this.clickHandlerPodcastShare(event, p) }>{this.translate('user.toSubscribe')}</div>
                            <div className='item_container_to_lists_item' id='share' src={share} alt="share" onClick={ (event, _podcast) => this.clickHandlerPodcastShare(event, p) } >{this.translate('user.share')}</div>
                            <div className='item_container_to_lists_close' onClick={() => this.clickHandlerClose(index)} >X</div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              ))
            }
            </div>
            <div class="row" >
              <div className="col-xs-12" >
                {PagesList}
              </div>
            </div>
            <div class="row" >
              <div className="col-xs-12 opinion_col" >
                <Opinion origen={this.props.match.params.program} auth={this.props.auth} />
              </div>
            </div>
          </div>
        <Modal show={this.state.isOpen} onClose={this.toggleModal} >
          {this.translate(this.state.showedMsg)}
        </Modal>
      </div> 
    );
  }
}
//<div className={this.state.schemmaShow ? 'ListSchemma show':'ListSchemma' } ><ListSchemma schemma={this.state.schemma} /></div>
Podcast.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Podcast);
export default Podcast;