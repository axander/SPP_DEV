import 'babel-polyfill';
import React from 'react'
import { API , Modal } from './services/Rest.js'
import TranslatedComponent from './utils/TranslatedComponent.js'
import Main from './scenes/Main/Main.js'



class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			isOpen: false,
          	showedMsg: '',
          	config: false
		 };
		 window.setSpinner();
		 API.action('config', null, this.setStorage, this.onError);
	}
	onError = (_response, _error) =>{
	    console.log(_response);
	    this.setState({
          isOpen: true,
          showedMsg: _error
      	});
	}
	setStorage = (_response) => {
		window.setSpinner();
	    this.setState({
          isOpen: false,
          showedMsg: '',
          config:true
      	});
	}
	hasChange(){
		/*typeof window.gtag !== 'undefined'
		? window.gtag('config', 'GA_TRACKING_ID', {
			  'page_title' : 'Spain Premium Podcast',
			  'page_path': location.hash
			})
		: null;*/
	}
	componentDidMount() {
		window.addEventListener("hashchange", this.hasChange, false);
    	!localStorage.getItem('template') ? localStorage.setItem('template','dark') : null;
  	}
  	render() {
  		if(this.state.config)
	  	return(
	  		<div>
			  	<Main />
			  	<Modal show={this.state.isOpen} onClose={this.toggleModal} >
	              {this.translate(this.state.showedMsg)}
	            </Modal>
			</div>
	  	)
	  }
}

App.propTypes = {
  //who: React.PropTypes.string.isRequired,
};

// Returns nothing because it mutates the class
TranslatedComponent(App);
export default App;