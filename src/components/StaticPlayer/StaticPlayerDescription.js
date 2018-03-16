import React from 'react'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import './StaticPlayerDescription.scss'

class StaticPlayerDescription extends React.Component {
  constructor(props) {
    super(props);
  
  }
  componentDidMount() {
    // Will execute as normal
  }
  render() {
    return (
      <div className='staticplayer'>
          StaticPlayerDescription
      </div>
    );
  }
}

StaticPlayerDescription.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(StaticPlayerDescription);
export default StaticPlayerDescription;