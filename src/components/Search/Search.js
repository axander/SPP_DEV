import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import search from '../../assets/images/search.png'
import './search.scss'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'toogle':false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  componentDidMount() {

  }
  componentDidUpdate(){
    
  }
  clickHandler(event){
    this.setState({
      'toogle':!this.state.toogle
    })
  }

  render() {
    return (
      <search className="search" >
        <div className="pb" onClick={this.clickHandler} ><img src={search} alt="search" /></div>
        <div className={ this.state.toogle ? 'container show' : 'container' } >
          <div className="logo" >LOGO</div>
          <div className="filters" >FILTROS</div>
          <div className="text" ><input type="text" width="80%" placeholder='Busca podcasts, programas, episodios, canales, radios online, usuarios...' /></div>
          <div>
            <div className="close" onClick={this.clickHandler} >X</div>
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