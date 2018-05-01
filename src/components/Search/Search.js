import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Modal, API } from '../../services/Rest.js'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import Logo from '../../components/Logo/Logo.js'
import './search.scss'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'toogle':false,
      'text':''
    };
    this.clickHandler= this.clickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clickHandlerSearch = this.clickHandlerSearch.bind(this);
  }
  onSuccess = (_response) => {
    
    _response.status === 'success'
    ? ( 
      localStorage.setItem('lastSearch',JSON.stringify(_response.data)),
      window.location.href='#/search',
      localStorage.getItem('lastSearch') ? window.location.reload() : null
    )
    : this.setState({
          isOpen: true,
          showedMsg: 'user.form.' + _response.reason
    });
    
  }
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedMsg: _error
      });
  }
  componentDidMount() {

  }
  componentDidUpdate(){
    
  }
  handleChange(event) {
    switch(event.target.id){
      case 'searchInput':
          console.log(event.target.value);
          this.setState({
            'text':event.target.value,
          })
      break;
      default:
      break
    }
  }
  clickHandlerSearch(event){
    this.setState({
      'toogle':!this.state.toogle
    })
    API.action('search', { 'text': this.state.text }, this.onSuccess, this.onError, 'GET', false, true);//,
    window.setSpinner();
  }
  clickHandler(event){
    this.setState({
      'toogle':!this.state.toogle
    })
  }

  render() {
    return (
      <search className="searching" >
        <div className="pb" onClick={this.clickHandler} ><span class="icon-search"></span></div>
        <div className={ this.state.toogle ? 'container show' : 'container' } >
          <div className="search_logo" >
            <div class='option logo'><Logo /></div>
          </div>
          <div className="search_text" ><input id='searchInput' type="text" width="80%" placeholder='Busca episodes, podcastas, episodios, canales, radios online, usuarios...' onChange={(value) => this.handleChange(value) } /></div>
          <div className="search_pb_container"  >
            <div className="search_close_pb" onClick={this.clickHandler} >
              <span class="icon-x"></span>
            </div>
          </div>
          <div className={this.state.text.length ? 'search_pb_container' : 'hide'}  >
            <div className="search_pb" onClick={this.clickHandlerSearch} >
              <span class="icon-search" ></span>
            </div>
          </div>
        </div>
      </search>  
    );
  }
}

Search.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Search);
export default Search;