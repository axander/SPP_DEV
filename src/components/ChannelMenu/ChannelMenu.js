import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import ChannelMenuPB from './ChannelMenuPB.js'
import PlayerApp from '../Player/PlayerApp/PlayerApp.js'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import { Modal, API } from '../../services/Rest.js'
import Lists from '../../utils/Lists.js'
import later from '../../assets/images/later.png';
import fav from '../../assets/images/fav.png';
import share from '../../assets/images/share.png';
import ListSchemma from '../../components/Lists/ListSchemma.js'
import './channelMenu.scss'
// The Header creates links that can be used to navigate
// between routes.


class ChannelMenu extends React.Component {
	constructor(props) {
        super(props);
         console.log('props');
    	console.log(props);
       
        this.state = {
        	'show': '',
        	'showProgram':'',
        	'showPodcast':'',
        	'state':'channel',
        	'toogle':false,
        	'data':[],
        	'dataProgram':[],
        	'dataPodcast':[],
        	'channel':'',
        	'program':'',
        	'podcast':'',
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.clickHandlerChannel = this.clickHandlerChannel.bind(this);
        this.clickHandlerProgram = this.clickHandlerProgram.bind(this);
        this.clickHandlerPodcast = this.clickHandlerPodcast.bind(this);
        this.clickHandlerChannelPB = this.clickHandlerChannelPB.bind(this);
        this.backChannel = this.backChannel.bind(this);
        this.backProgram = this.backProgram.bind(this);
        this.backPodcast = this.backPodcast.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.forwardProgram = this.forwardProgram.bind(this);
        this.forwardPodcast = this.forwardPodcast.bind(this);
        this.forwardPodcastPlayer = this.forwardPodcastPlayer.bind(this);
        this.showPlayer = this.showPlayer.bind(this);

        this.clickHandlerLater = this.clickHandlerLater.bind(this);
        this.clickHandlerFav = this.clickHandlerFav.bind(this);
        this.clickHandlerShare = this.clickHandlerShare.bind(this);
        this.setSchemmaFav = this.setSchemmaFav.bind(this);
	    this.setSchemmaLater = this.setSchemmaLater.bind(this);
	    this.setSchemmaShare = this.setSchemmaShare.bind(this);

    }


	clickHandler(event){
		switch(this.state.state){
			case 'channel':
				if(!this.state.toogle || this.state.show === '' ){
					this.state.toogle = true;
					this.setState({
						'data':JSON.parse(localStorage.getItem('channels')),
					    'show': 'showContents',
					    'channel':localStorage.getItem('lastChannel')
					}),
					document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
				}else if(this.state.toogle ){
					this.state.toogle = false;
					this.setState({
					    'show': ''
					});
					document.getElementById('root').removeEventListener('click', this.handleClickOutside, true)
				}
			break;
			case 'program':
				if(!this.state.toogle || this.state.showProgram === '' ){
					this.state.toogle = true
					this.setState({
						'dataProgram':JSON.parse(localStorage.getItem('program')),
					    'showProgram': 'showContents',
					    'program':localStorage.getItem('lastProgram')
					}),
					document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
				}else if(this.state.toogle ){
					this.state.toogle = false;
					this.setState({
					    'showProgram': ''
					});
					document.getElementById('root').removeEventListener('click', this.handleClickOutside, true)
				}
			break;
			case 'podcast':
				if(!this.state.toogle || this.state.showPodcast === '' ){
					this.state.toogle = true
					this.setState({
						'dataPodcast':JSON.parse(localStorage.getItem('podcast')),
					    'showPodcast': 'showContents',
					    'podcast':localStorage.getItem('lastPodcast')
					}),
					document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
				}else if(this.state.toogle ){
					this.state.toogle = false;
					this.setState({
					    'showPodcast': ''
					});
					document.getElementById('root').removeEventListener('click', this.handleClickOutside, true)
				}
			break;
			/*case 'podcastPlayer':
				if(!this.state.toogle || this.state.showPodcastPlayer === '' ){
					this.state.toogle = true
					this.setState({
					    'showPodcastPlayer': 'showContents',
					}),
					document.getElementById('channelMenuPB').addEventListener('click', this.handleClickOutside, true)
				}else if(this.state.toogle ){
					this.state.toogle = false;
					this.setState({
					    'showPodcastPlayer': ''
					});
					document.getElementById('channelMenuPB').removeEventListener('click', this.handleClickOutside, true)
				}
			break;*/
			default:
			break;
		}
    }
    clickHandlerChannelPB(event){
    	if(this.state.state === 'podcastPlayer'){
    		if(this.state.showPodcastPlayer === '' ){
				this.state.toogle = true
				this.setState({
				    'showPodcastPlayer': 'showContents',
				});
			}else{
				this.state.toogle = false;
				this.setState({
				    'showPodcastPlayer': ''
				});
			}
    	}
    }
    clickHandlerChannel(event, _name){
    	localStorage.setItem('lastChannelName', JSON.stringify(_name));
		typeof localStorage.getItem('program')!=='undefined' && localStorage.getItem('program') && localStorage.getItem('lastChannel') === event.target.id
	    ? ( this.setState ({
		      	'toogle':false,
		        'dataProgram':JSON.parse(localStorage.getItem('program')),
		        'show': '',
		        'showProgram': 'showContents',
		        'state':'program'
		      }),
	    	document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
	      )
	    : ( 
	      localStorage.setItem('lastChannel',event.target.id ),
	      this.state.channel = event.target.id,
		  this.state.program = '',
		  this.state.podcast = '',
		  localStorage.removeItem('lastProgram'),
		  localStorage.removeItem('lastPodcast'),
		  localStorage.removeItem('program'),
		  localStorage.removeItem('podcast'),
	      window.setSpinner(),
	      API.action('getListPro' + this.state.channel, { 'channel' : event.target.id }, this.onSuccessProgram, this.onError, 'GET')
	      )
	    ;
    }
    clickHandlerProgram(event, _name){
    	localStorage.setItem('lastProgramName', JSON.stringify(_name));
    	typeof localStorage.getItem('podcast')!=='undefined' && localStorage.getItem('podcast') && localStorage.getItem('lastProgram') === event.target.id
    	? ( this.setState ({
		      	'toogle':false,
		        'dataPodcast':JSON.parse(localStorage.getItem('podcast')),
		        'show': '',
		        'showProgram': '',
		        'showPodcast': 'showContents',
		        'state':'podcast'
		    }),
	    	document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
	      )
	    : ( 
	      localStorage.setItem('lastProgram',event.target.id ),
	      this.state.program = event.target.id,
		  this.state.podcast = '',
		  localStorage.removeItem('lastPodcast'),
		  localStorage.removeItem('podcast'),
	      window.setSpinner(),
	      API.action('getListPod' + this.state.program, { 'program' : event.target.id }, this.onSuccessPodcast, this.onError, 'GET')
	      )
	    ;
    }
    clickHandlerPodcast(event, _source, _id, _name, _podcastObject){
    	console.log(_name);
    	this.setState ({
	      	'toogle':false,
	        'show': '',
	        'showProgram': '',
	        'showPodcast': '',
	        'showPodcastPlayer': 'showContents',
	        'podcast': event.target.id,
	        'state':'podcastPlayer'
		});
		document.getElementById('root').removeEventListener('click', this.handleClickOutside, true)
		this.props.initplayer.play(_source, _id, _name, _podcastObject);
    }
    showPlayer(event){
    	this.setState ({
	      	'toogle':false,
	        'show': '',
	        'showProgram': '',
	        'showPodcast': '',
	        'showPodcastPlayer': 'showContents',
	        'state':'podcastPlayer'
		});
		document.getElementById('root').removeEventListener('click', this.handleClickOutside, true)
    }
    backChannel(event){
		this.setState({
			'state':'channel',
			'toogle':false,
		    'show': '',
		    'showProgram': ''
		 });
    }
    backProgram(event){
		this.setState({
			'state':'program',
			'toogle':false,
		    'show': '',
		    'showProgram': 'showContents',
		    'showPodcast': ''
		 });
    }
    backPodcast(event){
		this.setState({
			'state':'podcast',
			'toogle':false,
			'show': '',
		    'showProgram': '',
	        'showPodcast': 'showContents',
	        'showPodcastPlayer': ''
		 });
		document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
    }
    forwardProgram(event){
    	typeof localStorage.getItem('program')!=='undefined'  && localStorage.getItem('program')
    	? this.setState({
			'state':'program',
			'toogle':false,
		    'show': '',
		    'showProgram': 'showContents',
		    'dataProgram':JSON.parse(localStorage.getItem('program'))
		 })
    	: this.setState({
			'state':'program',
			'toogle':false,
		    'show': '',
		    'showProgram': 'showContents',
		 });
    }
    forwardPodcast(event){
		this.setState({
			'state':'podcast',
			'toogle':false,
		    'show': '',
		    'showProgram': '',
		    'showPodcast':'showContents'
		 });
    }
    forwardPodcastPlayer(event){
		this.setState({
			'state':'podcastPlayer',
			'toogle':false,
		    'show': '',
		    'showProgram': '',
		    'showPodcast':'',
		    'showPodcastPlayer': 'showContents'
		 });
    }
    setSchemmaLater(){
    	var what = this.state.state
    	this.state.state === 'podcastPlayer'
    	? what = 'podcast'
    	: null;
	    this.props.initSchemma.setSchemma = Lists.saveToList(what,'later',this.state.itemObject.id);
	    this.props.initSchemma.show(what,'later',this.state.itemObject);
	  }
    clickHandlerLater(event, _itemObject){
		typeof _itemObject === 'string'
    	? _itemObject = JSON.parse(_itemObject)
    	:null;
    	event.stopPropagation();
    	this.state.state === 'podcastPlayer'
    	? this.clickHandlerChannelPB()
    	: this.clickHandler();
	    this.state.itemObject = _itemObject
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
    	var what = this.state.state;
    	this.state.state === 'podcastPlayer'
    	? what = 'podcast'
    	: null;
	    this.props.initSchemma.setSchemma = Lists.saveToList(what,'fav',this.state.itemObject.id);
	    this.props.initSchemma.show(what,'fav',this.state.itemObject);
	  }
    clickHandlerFav(event, _itemObject){
    	typeof _itemObject === 'string'
    	? _itemObject = JSON.parse(_itemObject)
    	:null;
    	event.stopPropagation();
    	this.state.state === 'podcastPlayer'
    	? this.clickHandlerChannelPB()
    	: this.clickHandler();
	    this.state.itemObject = _itemObject
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
    	var what = this.state.state
    	this.state.state === 'podcastPlayer'
    	? what = 'podcast'
    	: null;
	    this.props.initSchemma.setSchemma = Lists.saveToList(what,'share',this.state.itemObject.id);
	    this.props.initSchemma.show(what,'share',this.state.itemObject);
	  }
    clickHandlerShare(event, _itemObject){
		typeof _itemObject === 'string'
    	? _itemObject = JSON.parse(_itemObject)
    	:null;
    	event.stopPropagation();
    	this.state.state === 'podcastPlayer'
    	? this.clickHandlerChannelPB()
    	: this.clickHandler();
	    this.state.itemObject = _itemObject
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
    componentDidMount() {
	}
	componentWillUnmount() {
		document.getElementById('root').removeEventListener('click', this.handleClickOutside, true);
	}

	handleClickOutside(event) {
	    const domNode = ReactDOM.findDOMNode(this);
	    if (!domNode || !domNode.contains(event.target)) {
	    	switch(this.state.state){
				case 'channels':
					this.setState({
					    'show': ''
					 });
				break;
				case 'programs':
					this.setState({
					    'showProgram': ''
					 })
				break;
				case 'podcasts':
					this.setState({
					    'showPodcast': ''
					 });
				break;
				default:
				break;
			}
	    }
	    event.target.id !== 'later' && event.target.id !== 'fav' && event.target.id !== 'share'
	    ? document.getElementById('root').removeEventListener('click', this.handleClickOutside, true)
	    : null;
	}
	onSuccess = (_response) => {
	    _response.status === 'successfull'
	    ? ( 
	      this.setState ({
	        'data':_response.data
	      }),
	      localStorage.setItem('channels', JSON.stringify(_response.data))
	    )
	    : this.setState({
	        isOpen: true,
	        showedMsg: 'channels.' + _response.reason
	    });
	}
	onSuccessProgram = (_response) => {
	    _response.status === 'successfull'
	    ? ( 
	      this.setState ({
	      	'toogle':true,
	        'dataProgram':_response.data,
	        'show': '',
	        'showProgram': 'showContents',
	        'state':'program'
	      }),
	      localStorage.setItem('program', JSON.stringify(_response.data))
	    )
	    : this.setState({
	        isOpen: true,
	        showedMsg: 'program.' + _response.reason
	    });
	    document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
	}
	onSuccessPodcast = (_response) => {
	    _response.status === 'successfull'
	    ? ( 
	      this.setState ({
	      	'toogle':true,
	        'dataPodcast':_response.data,
	        'show': '',
	        'showProgram': '',
	        'showPodcast': 'showContents',
	        'state':'podcast'
	      }),
	      localStorage.setItem('podcast', JSON.stringify(_response.data))
	    )
	    : this.setState({
	        isOpen: true,
	        showedMsg: 'podcast.' + _response.reason
	    });
	    document.getElementById('root').addEventListener('click', this.handleClickOutside, true)
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
	componentDidMount(){
	    typeof localStorage.getItem('channels')!=='undefined'  && localStorage.getItem('channels')
	    ? this.setState ({
	        'data':JSON.parse(localStorage.getItem('channels')),
	        'channel':localStorage.getItem('lastChannel')
	      })
	    : ( 
	      window.setSpinner(),
	      API.action('getListChan', {}, this.onSuccess, this.onError, 'get')
	      )
	}
	/*
    <div class="col-xs-6">
      <div className="desc">
        {p.desc[localStorage.getItem('language')]}
      </div>
    </div>
    */
    /*
	<div class="col-xs-6">
	  <div className="desc">
	    {p.desc[localStorage.getItem('language')]}
	  </div>
	</div>
	*/
	/*
    <div class="col-xs-6">
      <div className="desc">
        {p.desc[localStorage.getItem('language')]}
      </div>
    </div>
	*/
  	render() {
	  	return(
	  		<div className="lateralChannelMenu" onClick={ this.clickHandler } >
	  			<div onClick={ this.clickHandlerChannelPB } >
		  			<ChannelMenuPB />
		  		</div>
		  		<channelOptions id="menuContainer" className={this.state.show } >
				    <nav>
				    	<div className='contentStateRot' >{this.translate('menu.channel')}</div>
				    	<div className={this.state.channel !== '' ? 'forwardContentPB' : 'hide'}  onClick={this.forwardProgram} >{this.translate('menu.program')}⇨</div>
				    	<div className="scrollCont" >
				    		<div className="scrollableCont" >
						            {
						            this.state.data.map(p => (
						            	<div className='row' >
								            <div id={p.id} className={this.state.channel === p.id ? 'item single_item contentSelected' : 'item single_item ' } style={ 'background-image:url("' + p.image + '")' } onClick={ (event, _name) => this.clickHandlerChannel(event, p.name)} >
								                <div className="rot">
								                    {p.name[localStorage.getItem('language')]}
								                </div>
							                    <div className="single_desc">
							                        &#10095;
							                    </div>
							                </div>
						                    <div className="options" >
						                      <div><div><img id='later' src={later} alt="later" onClick={ (event, id) => this.clickHandlerLater(event, p)} /></div></div>
						                      <div><div><img id='fav' src={fav} alt="fav" onClick={ (event, id) => this.clickHandlerFav(event, p)} /></div></div>
						                      <div><div><img id='share' src={share} alt="share" onClick={ (event, id) => this.clickHandlerShare(event, p)} /></div></div>
						                  	</div>
								        </div>
						            ))
						          }
						    </div>
					    </div>
				    </nav>
				</channelOptions>
				<programOptions id="menuContainer" className={this.state.showProgram} >
				    <nav>
				    	<div>
				    		<div className='contentStateRot' >{this.translate('menu.program')+':'+this.translate('channel')+( localStorage.getItem('lastChannelName') ? JSON.parse(localStorage.getItem('lastChannelName'))[localStorage.getItem('language')] : '' )}</div>
				    		<div className={this.state.program !== '' ? 'forwardContentPB' : 'hide'} onClick={this.forwardPodcast} >{this.translate('menu.podcast')}⇨</div>
				    		<div className='backContentPB' onClick={this.backChannel} >⇦{this.translate('menu.channel')}</div>
				    	</div>
				    	<div className="scrollCont" >
				    		<div className="scrollableCont" >
						            {
						            this.state.dataProgram.map(p => (
						              <div className='row' >
						                <div id={p.id} className={this.state.program === p.id ? 'item single_item contentSelected' : 'item single_item ' }  style={ 'background-image:url("' + p.image + '")' } onClick={ (event, _name) => this.clickHandlerProgram(event, p.name)}>
							                <div className="rot">
							                    {p.name[localStorage.getItem('language')]}
							                </div>
							                <div className="single_desc">
					                          &#10095;
					                        </div>
			                      		</div>
					                    <div className="options" >
					                      	<div><div><img id='later' src={later} alt="later" onClick={ (event, id) => this.clickHandlerLater(event, p)} /></div></div>
						                    <div><div><img id='fav' src={fav} alt="fav" onClick={ (event, id) => this.clickHandlerFav(event, p)} /></div></div>
						                    <div><div><img id='share' src={share} alt="share" onClick={ (event, id) => this.clickHandlerShare(event, p)} /></div></div>
					                  	</div>
						              </div>
						            ))
						          }
						    </div>
					    </div>
				    </nav>
				</programOptions>
				<podcastOptions id="menuContainer" className={this.state.showPodcast} >
				    <nav>
				    	<div>
				    		<div className='contentStateRot' >{this.translate('menu.podcast')+':'+this.translate('program')+( localStorage.getItem('lastProgramName') ? JSON.parse(localStorage.getItem('lastProgramName'))[localStorage.getItem('language')] : '' )}</div>
				    		<div className={this.state.podcast !== '' ? 'forwardContentPB' : 'hide'} onClick={this.forwardPodcastPlayer} >{this.translate('menu.podcastPlayer')}⇨</div>
				    		<div className='backContentPB' onClick={this.backProgram} >⇦{this.translate('menu.program')}</div>
				    	</div>
				    	<div className="scrollCont" >
				    		<div className="scrollableCont" >
						            {
						            this.state.dataPodcast.map(p => (
						              	<div className='row' >
								            <div id={p.id} className={this.state.podcast === p.id ? 'item single_item contentSelected' : 'item single_item ' } style={ 'background-image:url("' + p.image + '")' } onClick={ (event, _source, _id, _name, _podcastObject) => this.clickHandlerPodcast(event, p.source, p.id, p.name, p)} >
								                <div className="rot">
								                    {p.name[localStorage.getItem('language')]}
								                </div>
							                    <div className="single_desc">
							                        &#10095;
							                    </div>
							                </div>
						                    <div className="options" >
						                      	<div><div><img id='later' src={later} alt="later" onClick={ (event, id) => this.clickHandlerLater(event, p)} /></div></div>
						                      	<div><div><img id='fav' src={fav} alt="fav" onClick={ (event, id) => this.clickHandlerFav(event, p)} /></div></div>
						                      	<div><div><img id='share' src={share} alt="share" onClick={ (event, id) => this.clickHandlerShare(event, p)} /></div></div>
						                  	</div>
								        </div>
						            ))
						          }
						    </div>
					    </div>
				    </nav>
				</podcastOptions>
				<podcastPlayer id="menuContainer" className={this.state.showPodcastPlayer} >
				    <nav>
				    	<div>
				    		<div className='contentStateRot' >{this.translate('podcast')+':'+ ( localStorage.getItem('lastPodcastName') ? JSON.parse(localStorage.getItem('lastPodcastName'))[localStorage.getItem('language')] : '' ) }</div>
				    		<div className='forwardContentPB' onClick={ this.clickHandlerChannelPB } >X</div>
				    		<div className='backContentPB' onClick={this.backPodcast} >⇦{this.translate('menu.podcast')}</div>
				    	</div>
				    	<div className="scrollCont" >
				    		<div className="scrollableCont" >
				    			<PlayerApp initplayer={this.props.initplayer} showplayer={this.showPlayer} />
						    </div>
			    			<div className="options" >
		                      	<div><div><img id='later' src={later} alt="later" onClick={ (event, id) => this.clickHandlerLater(event, localStorage.getItem('podcastInfo') )} /></div></div>
			                    <div><div><img id='fav' src={fav} alt="fav" onClick={ (event, id) => this.clickHandlerFav(event, localStorage.getItem('podcastInfo') )} /></div></div>
			                    <div><div><img id='share' src={share} alt="share" onClick={ (event, id) => this.clickHandlerShare(event, localStorage.getItem('podcastInfo') )} /></div></div>
		                  	</div>
					    </div>
				    </nav>
				    <PlayerApp />
				</podcastPlayer>
			</div>
	  	)
	  }
}
ChannelMenu.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(ChannelMenu);
export default ChannelMenu