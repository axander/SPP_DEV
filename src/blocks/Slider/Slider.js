import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Utils from '../../utils/Utils.js';
import {API} from '../../services/Rest.js'
import LocalSpinner from '../Common/LocalSpinner/LocalSpinner.js'
import LocalError from '../Common/LocalError/LocalError.js'
import './Slider.scss'

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'init':true,
      'loading':true,
      'error':false,
      'data':{},
      'fase': localStorage.getItem('lastSliderPos') || 0
    }
    this.clickBallHandler = this.clickBallHandler.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.leftFunction = this.leftFunction.bind(this);
    this.rightFunction = this.rightFunction.bind(this);
  }
  onSuccess = (_response) => {
    _response.status === 'successfull'
    ? (
        this.setState({
          'init':false,
          'loading':false,
          'error':false,
          'data':_response.data,
          'itemStyle':{
            'width':document.getElementById('slider_content').offsetWidth +'px'
          }
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
  
  handleResize() {
    document.getElementById('slider_content_container').style.width = document.getElementById('slider_content').offsetWidth * this.state.data.collection.length + 'px';     
    this.setState({
      'itemStyle':{
        'width':document.getElementById('slider_content').offsetWidth +'px'
      }
    });
    document.getElementById('slider_content_container').style.left = - this.state.fase * document.getElementById('slider_content').offsetWidth + 'px';
  }
  clickBallHandler(event){
    this.setState({
      'fase': event.target.id.replace('ball_item_',''),
      'itemStyle':{
        'width':document.getElementById('slider_content').offsetWidth +'px'
      }
    })
    localStorage.setItem('lastSliderPos',parseFloat(this.state.fase));
    document.getElementById('slider_content_container').style.left = - this.state.fase * document.getElementById('slider_content').offsetWidth + 'px'
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  leftFunction(){
    if((parseFloat(this.state.fase) + 1) >= this.state.data.collection.length-1 ){
       this.setState({
          'fase':this.state.data.collection.length-1
        })
    }else{
      this.setState({
          'fase':parseFloat(this.state.fase) + 1
        })
    }
    localStorage.setItem('lastSliderPos',parseFloat(this.state.fase));
    document.getElementById('slider_content_container').style.left = - this.state.fase * document.getElementById('slider_content').offsetWidth + 'px'
  }
  rightFunction(){
    if((parseFloat(this.state.fase) - 1) <= 0 ){
       this.setState({
          'fase':0
        })
    }else{
      this.setState({
          'fase':parseFloat(this.state.fase) - 1
        })
    }
    localStorage.setItem('lastSliderPos',parseFloat(this.state.fase));
    document.getElementById('slider_content_container').style.left = - this.state.fase * document.getElementById('slider_content').offsetWidth + 'px'
  }
  componentDidMount(){
    Utils.swipedetect(window, function(swipedir, toLeft, toRight) {
          switch (swipedir) {
              case "left":
                  if (toLeft != undefined) {
                      toLeft();
                  }
                  break;
              case "right":
                  if (toRight != undefined) {
                      toRight();
                  }
                  break;
              case "up":
                  break;
              case "down":
                  break;
              case "none":
                  break;
          }
      }, this.leftFunction, this.rightFunction
    );
    API.action('getSlider', {}, this.onSuccess, this.onError, 'get');
    window.addEventListener('resize', this.handleResize);
    document.getElementById('slider_content_container').style.left = - this.state.fase * document.getElementById('slider_content').offsetWidth + 'px'
  }
  render() {
    var lan = localStorage.getItem('language');
    if(typeof this.state.data.collection !== 'undefined'){
      var collection = this.state.data.collection;
      document.getElementById('slider_content_container').style.width = document.getElementById('slider_content').offsetWidth * this.state.data.collection.length + 'px';     
    }else{
      collection = [];
    }
    return (
      <div className='slider' >
                <div id='slider_content'>
                  <div id='slider_content_container'>
                    {collection.map(p => {
                      return (
                        <div className='slider-item' style={this.state.itemStyle} >
                          <div style={p.style} >
                                <div className='slider-item-title' >{p.title[lan]}</div>
                                <div className='slider-item-subtitle'>{p.subtitle[lan]}</div>
                                { p.buttons.map( q => { 
                                  return (
                                    <div className="slider-item-PB-container" >
                                      <a href={q.externalLink} target='_blank' className={typeof q.externalLink === 'undefined' || q.externalLink.length <= 0 ? 'hidden':'slider-item-PB-container' } ><div className='slider-item-PB' >
                                        <span>{q.text[lan]}</span>
                                      </div></a>
                                      <div className={typeof q.route === 'undefined' || q.route.length <= 0 ? 'hidden':'slider-item-PB-container' }><Link to={'/'+q.route} ><div className='slider-item-PB' >
                                        <span>{q.text[lan]}</span>
                                      </div></Link></div>
                                      <div className={typeof q.podcast === 'undefined' || !q.podcast || q.podcast.source.length <= 0 ? 'hidden':'slider-item-PB-container' } onClick={() => this.props.initplayer.play(q.podcast.source, q.podcast.id, q.podcast.name, q.podcast)} ><div className='slider-item-PB' >
                                        <div className='slider-item-PB-deco'>&#9658;</div><span>{q.text[lan]}</span>
                                      </div></div>
                                    </div>
                                  )
                                })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className='balls'>
                  {collection.map((p , index) => {
                    return (
                      <div className='ball-item'  >
                        <div id={'ball_item_'+index} className={ index == this.state.fase ? 'hidden':'bullEnabled'} onClick={this.clickBallHandler} >&bull;</div>
                        <div className={ index != this.state.fase ? 'hidden':'bullDisabled'}   >&bull;</div>
                      </div>
                    )
                  })}
                </div>
                <div className={this.state.loading ? 'spinner':'hide'} ><LocalSpinner /></div>
                <div className={this.state.error ? 'error':'hide'} ><LocalError /></div>
      </div>
    );
  }
}

Slider.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Slider);
export default Slider;