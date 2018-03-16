import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';

class Ads extends React.Component {
  constructor(props) {
    super(props);
    localStorage.setItem('lastState',props.location.pathname);
  }
  componentDidMount() {
    // Will execute as normal
  }
  render() {
    return (
      <div className='mainContainer' >
        <terms>
          <div className='terms'>
            <div className="basicOuter" >
              <div className="basicInner">
                <h1>Ads</h1>
              </div> 
            </div>
          </div>
        </terms>
      </div>
    );
  }
}

Ads.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Ads);
export default Ads;