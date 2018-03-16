import React from 'react'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import like from '../../assets/images/like.png'
import './Like.scss'

class Like extends React.Component {
	constructor(props) {
	    super(props);
	 }
	render() {
	    return (
	    	<div>
		    	<div><div><img id='like' src={like} alt="like" /></div></div>
	            <div><div>{this.props.num}</div></div>
	        </div>
	    )
	}
}
	//<div className={this.state.schemmaShow ? 'ListSchemma show':'ListSchemma' } ><ListSchemma schemma={this.state.schemma} /></div>
Like.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Like);
export default Like;