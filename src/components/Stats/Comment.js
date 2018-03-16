import React from 'react'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import comments from '../../assets/images/comments.png'
import './Comment.scss'

class Comment extends React.Component {
	constructor(props) {
	    super(props);
	 }
	render() {
	    return (
	    	<div>
		    	<div><div><img id='comments' src={comments} alt="comments" /></div></div>
	            <div><div>{this.props.num}</div></div>
	        </div>
	    )
	}
}
	//<div className={this.state.schemmaShow ? 'ListSchemma show':'ListSchemma' } ><ListSchemma schemma={this.state.schemma} /></div>
Comment.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Comment);
export default Comment;