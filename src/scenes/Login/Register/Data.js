import React from 'react'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import Utils from '../../../utils/Utils.js';
import { Link } from 'react-router-dom'
import './Data.scss'

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     'typeDoc':'',
     'doc':'',
     'address':'',
     'cp':'',
     'country':'',
     'province':'',
     'showedMsg': localStorage.getItem('error'),
     'isOpen': localStorage.getItem('error') ? true : false,
     'deactive': 'disabled',
     'success':false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidUpdate() {
    // Will execute as normal
  }

  handleChange(event) {
    
    switch(event.target.id){
      case 'typeDoc':
          this.setState({[event.target.id]:event.target.value});
      break;
      case 'doc':
          this.setState({[event.target.id]:event.target.value});
      break;
      case 'address':
          this.setState({[event.target.id]:event.target.value});
      break;
      case 'cp':
          this.setState({[event.target.id]:event.target.value});
      break;
      case 'country':
          this.setState({[event.target.id]:event.target.value});
      break;
      case 'province':
          this.setState({[event.target.id]:event.target.value});
      break;
      default:
          this.setState({[event.target.id]:event.target.value});
      break
    }
    this.state.typeDoc !== '' && this.state.doc !== '' && this.state.address !== '' && this.state.cp && this.state.country !== '' && this.state.province !== ''
    ? this.state.deactive = ''
    : this.state.deactive = 'disabled';
    
  }
  render() {
    return (
      <div style={this.state.style} >
        <data>
          <div class='mt50 mb50 data'>
                  <form onSubmit={this.handleSubmit} autocomplete="on" >
                  	<div className="data_input_25" ><input id="typeDoc" type="text"  onChange={this.handleChange} value={this.state.typeDoc} placeholder={this.translate('typeDoc')} /></div>
                  	<div className="data_input_75" ><input id="doc" type="text"  onChange={this.handleChange} value={this.state.doc} placeholder={this.translate('doc')} /></div>
                    <div><input id="address" type="text"  onChange={this.handleChange} value={this.state.address} placeholder={this.translate('address')} /></div>
                    <div><input id="cp" type="text"  onChange={this.handleChange} value={this.state.cp} placeholder={this.translate('cp')} /></div>
                    <div className="data_input_40" ><input id="country" type="text"  onChange={this.handleChange} value={this.state.country} placeholder={this.translate('country')} /></div>
                    <div className="data_input_60" ><input id="province" type="text"  onChange={this.handleChange} value={this.state.province} placeholder={this.translate('province')} /></div>
            	    <div className="mt50 left" ><div className="neutralPB" onClick={() => this.props.back('choose')} >{this.props.type === 'basic' ? this.translate('register.cancel') : this.translate('back2')}</div></div>
                  	<div className="mt50 right" ><div className={"greenPB " + this.state.deactive }  onClick={() => this.props.flow(this.state,'data')} >{this.props.type === 'basic' ? this.translate('register.finalize') : this.translate('register.continue')}</div></div>
                  </form>
          </div>
        </data>
      </div>  
    );
  }
}
Data.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Data);
export default Data;