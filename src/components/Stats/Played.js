import React from 'react'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import played from '../../assets/images/played.png'
import './Played.scss'

class Played extends React.Component {
	constructor(props) {
	    super(props);
	 }
	render() {
	    return (
	    	<div>
		    	<div><div><img id='played' src={played} alt="played" /></div></div>
	            <div><div>{this.props.num}</div></div>
	        </div>
	    )
	}
}
	//<div className={this.state.schemmaShow ? 'ListSchemma show':'ListSchemma' } ><ListSchemma schemma={this.state.schemma} /></div>
Played.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Played);
export default Played;