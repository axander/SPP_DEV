import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import './styles/footer_web.scss'

class Footer_generic extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentDidUpdate(){
    
  }

  render() {
    return (
      <div className={ 'footer_web_generic footer_web_generic_'+localStorage.getItem('template')}>
        <Link to={'/info/legal'} ><div>{this.translate('footer.legal')}</div></Link>
        <Link to={'/info/privacity'} ><div>{this.translate('footer.privacity')}</div></Link>
        <Link to={'/info/cookies'} ><div>{this.translate('footer.cookies')}</div></Link>
        <Link to={'/info/ads_info'} ><div>{this.translate('footer.adsInfo')}</div></Link>
      </div>  
    );
  }
}

Footer_generic.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Footer_generic);
export default Footer_generic;