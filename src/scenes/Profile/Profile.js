import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import Utils from '../../utils/Utils.js'
import DeleteAccount from '../../components/DeleteAccount/DeleteAccount.js'
import './Profile.scss'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    var client = JSON.parse(localStorage.getItem('client')).personalData;
    this.state = {
      'isOpen': false,
      'name':client.name,
      'surname':client.surname,
      'avatar':client.avatar,
      'email':client.email,
      'user':client.nickName,
      'pwd':client.password,
      'pwdRepit':client.password,
      'passwordNotMatch':''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    
    switch(event.target.id){
      case 'email':
          this.setState({[event.target.id]:event.target.value});
          !Utils.validateEmail(event.target.value)
          ? this.setState({
            'emailValidation':this.translate('register.emailNotValid'),
            'emailClass':'notValid_input'
          })
          : this.setState({
            'emailValidation':'',
            'emailClass':''
          })
      break;
      case 'pwd':
          this.setState({[event.target.id]:event.target.value});
          this.state.pwd !== this.state.pwdRepit
          ? this.setState({
            'passwordNotMatch':this.translate('register.passwordNotMatch'),
            'pwdClass':'notValid_input'
          })
          : this.setState({
            'passwordNotMatch':'',
            'pwdClass':''
          })
      break;
      case 'pwdRepit':
          this.setState({[event.target.id]:event.target.value});
          this.state.pwd !== this.state.pwdRepit
          ? this.setState({
            'passwordNotMatch':this.translate('register.passwordNotMatch'),
            'pwdClass':'notValid_input'
          })
          : this.setState({
            'passwordNotMatch':'',
            'pwdClass':''
          })
      break;
      case 'user':
          this.setState({[event.target.id]:event.target.value});
      break;
      case 'name':
          this.setState({[event.target.id]:event.target.value});
      break;
      case 'surname':
          this.setState({[event.target.id]:event.target.value});
      break;
      default:
          this.setState({[event.target.id]:event.target.value});
      break
    }
    this.state.pwd !== '' && this.state.pwdRepit !== '' && this.state.user !== '' && this.state.name !== '' && this.state.surname !== '' && this.state.passwordNotMatch === ''
    ? this.state.deactive = ''
    : this.state.deactive = 'disabled';
    
  }
  handleSubmit(event) {
    window.setSpinner();
    this.setState(() => ({
        showedMsg: ''
      }))
    event.preventDefault();
    API.action('savePersonalData', this.state, this.onSuccess, this.onError, 'GET');
  }
  onSuccess = (_response) => {
    var data = JSON.parse(localStorage.getItem('client'));
    _response.status === 'successfull'
    ? ( 
      data.personalData.nickName = this.state.user,
      data.personalData.name = this.state.name,
      data.personalData.surname = this.state.surname,
      data.personalData.password = this.state.pwd,
      data.personalData.avatar = this.state.avatar,
      localStorage.setItem('client', JSON.stringify(data)),
      this.props.auth.refreshNick(),
      this.setState({
          'isOpen': true,
          'showedMsg': 'user.form.successful',
      })
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
  toggleModal = () => {
      this.setState({
          isOpen: !this.state.isOpen
      });
   }
  componentDidMount(){
    var clientData = JSON.parse(localStorage.getItem('client')).personalData;
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0',
        'data':clientData,
        'user':clientData.nickName,
        'name':clientData.name,
        'surname':clientData.surname,
        'pwd':clientData.password,
        'pwdRepit':clientData.password
      }
    });
    API.action('getBills', { 'phase': localStorage.getItem('phase_channel') || 0 }, this.onSuccess2, this.onError2, 'GET');//,
    window.setSpinner();
  }
  onSuccess2 = (_response) => {
    Utils.scrollToTop(300);
    _response.status === 'successfull'
    ? this.setState ({
        'data':_response.data,
      })
    : this.setState({
        isOpen: true,
        showedMsg: 'profile.' + _response.reason
    });
  }
  onError2 = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedMsg: _error
      });
  }
  render() {
    return (
      <div className='profile' style={this.state.style} >
        <h1>{this.translate('user.profile')}</h1>
        <div class='mb50 intro'>
                <form onSubmit={this.handleSubmit} >
                  <div className="profile_avatar mb25" style={"background-image:url('"+this.state.avatar+"')"}>
                    <div className="profile_avatar_rot" >{this.translate('user.uploadImage')}</div>
                  </div>
                  <div><input id="user" type="text"  onChange={(value) => this.handleChange(value) } value={this.state.user} placeholder={this.translate('user')} /></div>
                  <div><input id="name" type="text"  onChange={(value) => this.handleChange(value) } value={this.state.name} placeholder={this.translate('name')} /></div>
                  <div><input id="surname" type="text"  onChange={(value) => this.handleChange(value) } value={this.state.surname} placeholder={this.translate('surname')} /></div>
                  <div><input id="pwd" type="password" onChange={(value) => this.handleChange(value) } className={ this.state.pwdClass } value={this.state.pwd} placeholder={this.translate('password')}/></div>
                  <div className="notValid_msg" >{this.state.passwordNotMatch}</div>
                  <div><input id="pwdRepit" type="password" onChange={(value) => this.handleChange(value) } className={ this.state.pwdClass } value={this.state.pwdRepit} placeholder={this.translate('password.repit')} /></div>
                  <div className="mt50 right" ><div className={"greenPB " + this.state.deactive }  onClick={(event) => this.handleSubmit(event)} >{this.translate('save')}</div></div>
                </form>
        </div>
        <DeleteAccount />
        <Modal show={this.state.isOpen} onClose={this.toggleModal}  >
          {this.translate(this.state.showedMsg)}
        </Modal>
      </div>
    );
  }
}

Profile.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Profile);
export default Profile;