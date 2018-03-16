import React from 'react'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import date from '../../assets/images/date.png'
import './Date.scss'

class Date extends React.Component {
	constructor(props) {
	    super(props);
	 }
	render() {
	    return (
	    	<div>
		    	<div><div><img id='date' src={date} alt="date" /></div></div>
	            <div><div>{this.props.num}</div></div>
	        </div>
	    )
	}
}
	//<div className={this.state.schemmaShow ? 'ListSchemma show':'ListSchemma' } ><ListSchemma schemma={this.state.schemma} /></div>
Date.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Date);
export default Date;