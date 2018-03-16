import React from 'react'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import Utils from '../../../utils/Utils.js';
import './Choose.scss'

const data = require('./Choose.json')

class Choose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     'deactive': 'disabled',
     'basic':false,
     'premium':false,
     'type': null
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(_type){
    switch(_type){
      case 'basic':
        this.setState({
          'basic':true,
          'premium':false,
          'deactive':'',
          'type': 'basic'
        })
      break;
      case 'premium':
        this.setState({
          'basic':false,
          'premium':true,
          'deactive':'',
          'type': 'premium'
        })
      break;
      default:
      break;
    }
    this.props.subscription(_type);
  }
  
  render() {
    var lan = localStorage.getItem('language');
    if(typeof data.data.collection !== 'undefined'){
      var collection = data.data.collection;
    }else{
      collection = [];
    }
    return (
        <div style={this.state.style} >
          <choose>
            <div class='mt50 mb50 register_choose'>
              <div className='choose_register_content'>
                  {collection.map(( p , index) => {
                    return (
                      <div className="choose_register_item" style={p.style} onClick={() => this.clickHandler(p.type)} >
                        <div className="choose_register_item_content" >
                          <div>
                            <div>
                              <div className="choose_register_item_selector" >
                                <div className={ this.state[p.type] ? "choose_register_item_selector_selected" : "hide"} ></div>
                              </div>
                            </div>
                            <div>
                              <div className="choose_register_item_user" >{p.user[lan]}</div>
                              <div className="choose_register_item_rate" >{p.rate[lan]}</div>
                            </div>
                          </div>
                          <div className="choose_register_item_description" >{p.description[lan]}</div>
                          <div className="choose_register_item_features" >
                            { p.features.map(( q , index) => {
                              return(
                                  <div className={ q.status ? "choose_register_item_feature choose_register_item_feature_active" : "choose_register_item_feature" } ><div className="choose_register_item_feature_checkmark" >&#10004;</div><div className="choose_register_item_feature_txt" >{q.description[lan]}</div></div>
                                )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
            </div>
          </choose>
          <div className='register_choose_adjust mb50 '>
            <div className="right" ><div className={"greenPB " + this.state.deactive } onClick={() => this.props.flow(this.state,'choose')} >{this.translate('register.continue')}</div></div>
            <div className="left" ><div className="neutralPB" onClick={() => this.props.back('intro')} >{this.translate('back2')}</div></div>
          </div>
        </div>  
    );
  }
}
Choose.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Choose);
export default Choose;