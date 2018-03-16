import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import './PodcastSingleList.scss'

class PodcastSingleList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'data':this.props.data
    }
  }
  
  componentDidMount(){
      
  }
  render() {
    var lan = localStorage.getItem('language');
    let Collection, Title, All;
    if(typeof this.props.data !== 'undefined' && this.props.data.collection){
      Collection = this.props.data.collection;
      Title = this.props.data.title[lan];
      All = this.props.data.route;
    }else{
      Collection = [];
      Title = '';
      All ='';
    }
    return (
      <div className='podcastSingleList' >
              <div class="row">
                <div class="col-xs-10">
                  <div className="podcastSingleList_rot" >{Title}</div>
                </div>
                <div class="col-xs-2">
                    <Link to={'/'+All}><div className="podcastSingleList_all" >{this.translate('blocks.getAll')}</div></Link>
                </div>
              </div>
              <div>
                {Collection.map(( p , index) => {
                  return (
                    <div className="podcastSingleList_item" >
                      <div className="podcastSingleList_item_play" onClick={() => this.props.initplayer.play(p.source, p.id, p.name, p)} >
                        <div className='podcastSingleList_item_play_PB'>
                          <div className='podcastSingleList_item_play_PB_deco'>
                            <div>&#9658;</div>
                          </div>
                        </div>
                      </div>
                      <div className="podcastSingleList_item_image" onClick={() => this.props.initplayer.play(p.source, p.id, p.name, p)} ><div className="podcastSingleList_item_image_thumb" style={p.style} ></div></div>
                      <div className="podcastSingleList_item_descrip" >{p.name[lan]}</div>
                      <div className="podcastSingleList_item_options" >
                        <div className="podcastSingleList_item_options_deco" >•••</div>
                      </div>
                      <div className="podcastSingleList_item_duration" >{p.duration}</div>
                      <div className="podcastSingleList_item_delete" >
                        <div className='podcastSingleList_item_del_PB'>
                          <div className='podcastSingleList_item_del_PB_deco'>
                            <div>x</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
      </div>
    );
  }
}

PodcastSingleList.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(PodcastSingleList);
export default PodcastSingleList;