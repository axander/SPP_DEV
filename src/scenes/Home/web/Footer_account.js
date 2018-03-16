import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import './styles/footer_web.scss'

class Footer_account extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentDidUpdate(){
    
  }

  render() {
    return (
      <div>
        <h1>{this.translate('footer.accounts').toUpperCase()}</h1>
        <Link to={'/info/basic'} ><div>{this.translate('footer.basic')}</div></Link>
        <Link to={'/info/invited'} ><div>{this.translate('footer.invited')}</div></Link>
        <Link to={'/info/premium'} ><div>{this.translate('footer.premium')}</div></Link>
      </div>  
    );
  }
}

Footer_account.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Footer_account);
export default Footer_account;