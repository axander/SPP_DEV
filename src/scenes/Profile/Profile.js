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
    var client = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')).personalData : null;
    this.state = {
      'isOpen': false,
      'name':client.first_name,
      'surname':client.last_name,
      'avatar':client.avatar,
      'email':client.email,
      'docType':client.docType,
      'docNumber':client.docNumber,
      'user':client.nickName,
      'pwd':client.password,
      'pwdRepit':client.password,
      'address':client.address,
      'zip':client.zip,
      'city':client.city,
      'country':client.country
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onReaderLoadEnd = this.onReaderLoadEnd.bind(this);
    this.saveImage =  this.saveImage.bind(this);
  }
  
  saveImage(event) {
    console.log(typeof event.target);
      var files = event.target.files; // FileList object
      console.log(files);
      // Loop through the FileList and render image files as thumbnails.
      for (var i = 0, f; f = files[i]; i++) {
          // Only process image files.
          if (!f.type.match('image.*')) {
              continue;
          }
          var reader = new FileReader();
          reader.onloadend = this.onReaderLoadEnd;
          // Closure to capture the file information.
          reader.onload = (function(theFile) {
              return function(e) {
                  if (theFile.size > 400000) {
                      //showAlert("La imagen es demasiado pesada. Redúcela y vuelve a intentarlo");
                  } else if (theFile.size <= 400000 || theFile.size > 200000) {
                      //showAlert("El tamaño de la imagen es alto, más de 200k. Puede tardar un poco en ser subida");
                      alert('here');
                      this.processImage(theFile);
                  } else {
                    alert('here');
                      this.processImage(theFile);
                  }
              };
          })(f);
          this.processImage(f);
      }
  }
  /*processImage(file) {
      function AjaxFileUpload(file) {
        var formData = new FormData();
        formData.append('image', file);
        var xhr = new XMLHttpRequest();
        
        xhr.open('POST', 'https://api.premiumpodcast.es/api/setAvatar?image='+file.name, true);
        alert(file.fileName);
        // Set headers
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Authorization", localStorage.getItem('api_key'));
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.setRequestHeader("X-File-Name", file.name);
        xhr.setRequestHeader("X-File-Size", file.size);
        xhr.setRequestHeader("X-File-Type", file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                 alert('success');
            }
        };
        // Send
        console.log(file);
        xhr.send(formData);
      }
      AjaxFileUpload(file);
  }*/
  processImage(file) {
      var reader = new FileReader();
      reader.onloadend = this.onReaderLoadEnd;
      reader.readAsDataURL(file);
  }
  onReaderLoadEnd(event) {
        API.action('setAvatar', { 'base64' : event.target.result.split('base64,')[1] }, this.onSuccess, this.onError, 'GET', false, true);
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
        'avatar':clientData.image,
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
                    <input id="uploaderImage" type="file" onChange={() => this.saveImage(event)}  />
                  </div>
                  <div class="profile_input" ><input id="user" type="text"  onChange={(value) => this.handleChange(value) } value={this.state.user} placeholder={this.translate('user')} /></div>
                  <div class="profile_input" ><input id="name" type="text"  onChange={(value) => this.handleChange(value) } value={this.state.name} placeholder={this.translate('name')} /></div>
                  <div class="profile_input" ><input id="surname" type="text"  onChange={(value) => this.handleChange(value) } value={this.state.surname} placeholder={this.translate('surname')} /></div>
                  <div class="profile_input" ><input id="email" type="text" onChange={(value) => this.handleChange(value) } value={this.state.email} placeholder={this.translate('email')}/></div>
                  <div class="profile_input" ><input id="pwd" type="password" onChange={(value) => this.handleChange(value) } className={ this.state.pwdClass } value={this.state.pwd} placeholder={this.translate('password')}/></div>
                  <div class="profile_input" ><input id="pwdRepit" type="password" onChange={(value) => this.handleChange(value) } className={ this.state.pwdClass } value={this.state.pwdRepit} placeholder={this.translate('password.repit')} /></div>
                  <div>{this.translate('user.otherData')}</div>
                  <div class="profile_input" ><input id="docType" type="text" onChange={(value) => this.handleChange(value) } value={this.state.docType} placeholder={this.translate('docType')}/></div>
                  <div class="profile_input" ><input id="docNumber" type="text" onChange={(value) => this.handleChange(value) } value={this.state.docNumber} placeholder={this.translate('docNumber')}/></div>
                  <div class="profile_input" ><input id="address" type="text" onChange={(value) => this.handleChange(value) } value={this.state.address} placeholder={this.translate('address')}/></div>
                  <div class="profile_input" ><input id="zip" type="text" onChange={(value) => this.handleChange(value) } value={this.state.zip} placeholder={this.translate('zip')}/></div>
                  <div class="profile_input" ><input id="city" type="text" onChange={(value) => this.handleChange(value) }  value={this.state.city} placeholder={this.translate('city')}/></div>
                  <div class="profile_input" ><input id="country" type="text" onChange={(value) => this.handleChange(value) } value={this.state.country} placeholder={this.translate('country')}/></div>
                  <div className="notValid_msg" >{this.state.passwordNotMatch}</div>
                  <div className="mt50 right profile_save" ><div className={"greenPB " + this.state.deactive }  onClick={(event) => this.handleSubmit(event)} >{this.translate('save')}</div></div>
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