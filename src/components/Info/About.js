import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';

class About extends React.Component {
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
                <h1>About</h1>
              </div> 
            </div>
          </div>
        </terms>
      </div>
    );
  }
}

About.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(About);
export default About;