import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import Utils from '../../utils/Utils.js'
import EpisodeSingleList from '../../components/Episode/EpisodeSingleList/EpisodeSingleList.js'
import List_web from '../../components/Lists/List_web.js'
import './Lists.scss'

class Lists extends React.Component {
  constructor(props) {
    super(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    this.state = {
      'data':[ ]
    }
    this.handleResize = this.handleResize.bind(this);
  }
  onSuccess = (_response) => {
    Utils.scrollToTop(300);
    _response.status === 'successfull'
    ? this.setState ({
        'data':_response.data,
      })
    : this.setState({
        isOpen: true,
        showedMsg: 'lists.' + _response.reason
    });
  }
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedMsg: _error
      });
  }
  componentDidMount(){
    window.addEventListener('resize', this.handleResize);
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
    window.spinner.className ='hide';
    
  }
  handleResize() {
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  render() {
    return (
      <div className='lists' style={this.state.style} >
        <h1 className="lists_rot" >{this.translate('blocks.listsBasic')}</h1>
        <Link to='/lists/favourites' ><div className="neutralPB_bordered">A favoritos</div></Link>
        <Link to='/lists/later' ><div className="neutralPB_bordered">A Escuchar más tarde</div></Link>
        <Link to='/lists/subscribes' ><div className="neutralPB_bordered">A Subscritos</div></Link>
        <Link to='/lists/like' ><div className="neutralPB_bordered">A me gustan</div></Link>
        <Link to='/lists/listened' ><div className="neutralPB_bordered">A Escuchados</div></Link>

        <h1>{this.translate('podcast.subscribed')}</h1>
        <div>
          <EpisodeSingleList initplayer={this.props.initplayer} destiny='subscribes' />
          <List_web list="subscribe" item="podcast" auth={this.props.auth} initplayer={this.props.initplayer} restrict='4' />
        </div>
        <h1>{this.translate('content.episodes')} {this.translate('user.favourites')}</h1>
        <div>
          <EpisodeSingleList initplayer={this.props.initplayer} destiny='favourites' />
          <List_web list="fav" item="episode" auth={this.props.auth} initplayer={this.props.initplayer} restrict='4' />
        </div>
        <h1>{this.translate('menu.podcast')} {this.translate('user.favourites')}</h1>
        <div>
          <EpisodeSingleList initplayer={this.props.initplayer} destiny='favourites' />
          <List_web list="fav" item="podcast" auth={this.props.auth} initplayer={this.props.initplayer} restrict='4' />
        </div>
        <h1>{this.translate('content.episodes')} - {this.translate('user.toLater')}</h1>
        <div>
          <EpisodeSingleList initplayer={this.props.initplayer} destiny='later' />
          <List_web list="later" item="episode" auth={this.props.auth} initplayer={this.props.initplayer} restrict='4' />
        </div>
        <h1>{this.translate('episodes.Liked')}</h1>
        <div>
          <EpisodeSingleList initplayer={this.props.initplayer} destiny='like' />
          <List_web list="like" item="episode" auth={this.props.auth} initplayer={this.props.initplayer} restrict='4' />
        </div>
        <h1>{this.translate('podcast.liked')}</h1>
        <div>
          <EpisodeSingleList initplayer={this.props.initplayer} destiny='like' />
          <List_web list="like" item="podcast" auth={this.props.auth} initplayer={this.props.initplayer} restrict='4' />
        </div>
        <h1>{this.translate('episodes.Listened')}</h1>
        <div>
          <EpisodeSingleList initplayer={this.props.initplayer} destiny='listened' />
          <List_web list="listened" item="episode" auth={this.props.auth} initplayer={this.props.initplayer} restrict='4' />
        </div>


        {/*<Link to='/lists/downloads' ><div className="neutralPB_bordered">A Downloads</div></Link>
        <Link to='/lists/shared' ><div className="neutralPB_bordered">A Compartidos</div></Link>*/}
        <Modal show={this.state.isOpen} onClose={this.toggleModal}  >
          {this.translate(this.state.showedMsg)}
        </Modal>
      </div>
    );
  }
}

Lists.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Lists);
export default Lists;