import React from 'react'
import {API} from '../../services/Rest.js'
import { Link, Route } from 'react-router-dom'
import Utils from '../../utils/Utils.js'
import Lists_search from '../../components/Lists/Lists_search.js'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import './Search.scss'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    }
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount(){
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
    Utils.scrollToTop(300); 
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize() {
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
  }
  render() {
    return (
      <div className='mainContainer' style={this.state.style}  >
        <div className='search' >
          <h1>{this.translate('search')}</h1>
          <h1>{this.translate('search.episode')}</h1>
          <Lists_search item="episodes" auth={this.props.auth} initplayer={this.props.initplayer}  />
          <h1>{this.translate('search.podcast')}</h1>
          <Lists_search item="podcasts" auth={this.props.auth} initplayer={this.props.initplayer}  />
          <h1>{this.translate('search.channel')}</h1>
          <Lists_search item="canals" auth={this.props.auth} initplayer={this.props.initplayer}  />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Search);
export default Search;