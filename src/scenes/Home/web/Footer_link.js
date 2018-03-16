import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js';
import './styles/footer_web.scss'

class Footer_link extends React.Component {
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
        <h1>{this.translate('footer.links').toUpperCase()}</h1>
        <Link to={'/info/explore'} ><div>{this.translate('footer.explore')}</div></Link>
        <Link to={'/info/player'} ><div>{this.translate('footer.player')}</div></Link>
        <Link to={'/info/list'} ><div>{this.translate('footer.list')}</div></Link>
      </div>  
    );
  }
}

Footer_link.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Footer_link);
export default Footer_link;