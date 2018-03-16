import React from 'react'
import TranslatedComponent from '../../utils/TranslatedComponent.js';
import Utils from '../../utils/Utils.js';
import { Modal, API } from '../../services/Rest.js'

class DeleteAccount extends React.Component {
  constructor(props) {
    super(props);
    var client = JSON.parse(localStorage.getItem('client')).personalData;
    this.state = {
      'name':client.name,
      'surname':client.surname,
      'email':client.email,
      'nickName':client.nickName
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    window.setSpinner();
    this.setState(() => ({
        showedMsg: ''
      }))
    event.preventDefault();
    API.action('deleteAccount', {'email':this.state.email} , this.onSuccess, this.onError);
  }
  onSuccess = (_response) => {
      _response.status === 'successfull'
      ? ( 
        localStorage.removeItem('logged'), 
        localStorage.removeItem('token'),
        localStorage.removeItem('client'),
        typeof localStorage.getItem('extStatus') !== 'undefined' && JSON.parse(localStorage.getItem('extStatus')) && JSON.parse(localStorage.getItem('extStatus')).authResponse && JSON.parse(localStorage.getItem('extStatus')).authResponse.accessToken ? window.logoutFb() : null,
        localStorage.setItem('proccessing','logingOut'),
        this.setState(() => ({
          isOpen: true,
          showedMsg: 'user.deleteAccount.successfull'
        }))
      )
      : this.setState({
          isOpen: true,
          showedMsg: 'user.deleteAccount.error' + _response.reason
      });

  }
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedMsg: _error
      });
  }
  toggleModal = () => {
      this.state.isOpen
      ? window.location.href ='./'
      : null;
      this.setState({
          isOpen: !this.state.isOpen
      });
   }
  componentDidMount(){
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
  }
  render() {
    return (
      <div className="delete" style={this.state.style} >
        <h1>{this.translate('user.deleteAccount')}</h1>
        <div className="container" >
          <form onSubmit={this.handleSubmit}>
            <div><div className="submitBtn" onClick={this.handleSubmit} >{this.translate('continue').toUpperCase()}</div></div>
          </form>
        </div>
        <Modal show={this.state.isOpen} onClose={this.toggleModal} >
          {this.translate(this.state.showedMsg)}
        </Modal>
      </div> 
    );
  }
}

DeleteAccount.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(DeleteAccount);
export default DeleteAccount;