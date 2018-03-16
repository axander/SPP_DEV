import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import PlayerApp from '../Player/PlayerApp/PlayerApp.js'
import Opinion from '../../blocks/Opinion/Opinion.js';
import Iteminfo from '../../components/Iteminfo/Iteminfo.js'
import StaticPlayerDescription from './StaticPlayerDescription.js';
import News from '../../blocks/News/News.js'
import './StaticPlayer.scss'

class StaticPlayer extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
  }
  componentDidMount() {
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    });

  }
  render() {
    let podcast;
    if(typeof this.props.initplayer.data.source !== 'undefined'){
      podcast = this.props.initplayer.data;
      localStorage.setItem('lastPodcastPlayed', JSON.stringify(podcast));
    }else{
      podcast = JSON.parse(localStorage.getItem('lastPodcastPlayed'));
    }
    return (
      <div className='staticplayer' style={this.state.style}>
        <div class="row" >
            <div className="col-xs-12" >
              <Iteminfo data={this.props.location.data} destiny={this.props.location.destiny} auth={this.props.auth}  origen="podcast" initSchemma={this.props.initSchemma}/>
            </div>
        </div>
          <staticPlayer ><PlayerApp data={podcast} fromStatic={true} /></staticPlayer>
          <StaticPlayerDescription />
          <Opinion origen={this.props.match.params.podcast} auth={this.props.auth} />
          <News />
      </div>
    );
  }
}

StaticPlayer.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(StaticPlayer);
export default StaticPlayer;