import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import TranslatedComponent from '../../../utils/TranslatedComponent.js'
import FBPB from '../../../components/FBPB.js'
import { Modal, API } from '../../../services/Rest.js'
import './styles/login_web.scss'
import user from '../../../assets/images/user.png'
import Utils from '../../../utils/Utils.js'


class Login_web extends React.Component {
  
  constructor(props) {
    super(props);
    this.state ={
      'email':'',
      'emailClass':'',
      'emailValidation':'',
      'pwd':'',
      'deactive': 'disabled',
      'showedMsg': false,
      'isOpen': false,
      'show':false,
      'loggedFb': localStorage.getItem('extStatus'),
      'statusSubscription':{},
      'lapsedSubscription':{},
      'codesData': {},
      'userOptions':'hide',
      'avatar':JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.avatar : '',
      'loggedAs': localStorage.getItem('logged') ? '' : 'hide',
      'notLogged': localStorage.getItem('logged') ? 'hide' : 'initSession',
      'nickName': JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
    }
    this.toogle = this.toogle.bind(this);
    localStorage.removeItem('error')
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandlerFB = this.clickHandlerFB.bind(this);
    this.register = this.register.bind(this);
    this.setUser = this.setUser.bind(this);
    this.resetUser = this.resetUser.bind(this);
    this.requireLogin = this.requireLogin.bind(this);
    this.refreshNick = this.refreshNick.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.logoutClicked = this.logoutClicked.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.hide = this.hide.bind(this);
    this.showMenuResponsive= this.showMenuResponsive.bind(this);
    this.hideMenuResponsive= this.hideMenuResponsive.bind(this);

  }
  toogle(e){
    this.state.logged
    ? (
      window.location.href='#/user/subscriptionData',
      this.state.show = false
    )
    : ( 
      this.setState({
        'show': !this.state.show
      }),
      this.props.login.afterRequired = null
    )
  }
  setUser(){
    this.setState({
          logged: true,
          show: false,
          loggedAs: true,
          notLogged: 'hide',
          avatar:JSON.parse(localStorage.getItem('client')) ?  JSON.parse(localStorage.getItem('client')).personalData.avatar : '',
          nickName: JSON.parse(localStorage.getItem('client')) ? JSON.parse(localStorage.getItem('client')).personalData.nickName : null
      })
  }
  resetUser(){
    this.setState({
        'logged': false,
        'loggedAs': 'hide',
        'avatar':'',
        'notLogged': 'initSession',
        'nickName': ''
      });
  }
  requireLogin(_exec){
    this.setState({
      'show': true
    });
    this.props.login.afterRequired = _exec
  }
  hide(){
    this.setState({
      'show': false
    });
  }
  refreshNick(){
    this.setState({
      'nickName': JSON.parse(localStorage.getItem('client')).personalData.nickName
    });
  }
  componentDidMount() {
    this.props.login.hide = this.hide;
    this.props.login.required = this.requireLogin;
    this.props.login.setUser = this.setUser;
    this.props.login.resetUser = this.resetUser;
    this.props.login.refreshNick = this.refreshNick;
  }
  componentDidUpdate(){
    localStorage.getItem('error')
    ? ( this.setState({
          isOpen: true,
          showedMsg: localStorage.getItem('error')
      }) , localStorage.removeItem('error') )
    :null;
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
          /*this.setState({[event.target.id]:event.target.value});
          this.state.pwd !== this.state.pwdRepit
          ? this.setState({
            'passwordNotMatch':this.translate('register.passwordNotMatch'),
            'pwdClass':'notValid_input'
          })
          : this.setState({
            'passwordNotMatch':'',
            'pwdClass':''
          })*/
      break;
      default:
          this.setState({[event.target.id]:event.target.value});
      break
    }
    this.setState({[event.target.id]:event.target.value});
    this.state.email !== '' && this.state.pwd !== '' && this.state.emailValidation === ''
    ? this.state.deactive = ''
    : this.state.deactive = 'disabled';
  }
  state = {
    redirectToReferrer : false
  }
  
  login = (_response) => {
    var subscriptionData = {};
    _response.status === 'successfull'
    ? (
      localStorage.setItem('logged',true),
      console.log(_response),
      localStorage.setItem('email',_response.data.personalData.email),
      localStorage.setItem('client',JSON.stringify(_response.data)),
      localStorage.setItem('token',_response.token),
      //window.location.href='#/user',
      //window.location.href='./',
      this.props.login.authenticate(),
      this.setState({
          logged: true,
          show: false,
          loggedAs: true,
          notLogged: 'hide',
          nickName: _response.data.personalData.nickName 
      }),
      localStorage.getItem('savingList')
      ? null
      : window.location.reload()
    )
    : this.setState({
          isOpen: true,
          showedMsg: 'login.error.' + _response.reason
      });
  }
  /*setLogged(){
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }*/
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedMsg: _error
      });
    /*this.setState(() => ({
        showedMsg: 'ERROR'
      }))*/
  }
  handleSubmit(event, _login, _onError) {
    console.log(this.state);
    window.setSpinner();
    this.setState(() => ({
        showedMsg: ''
      }))
    event.preventDefault();
    //API.action('','GET', { 'user':this.state.user, 'pwd':this.state.pwd}, this.login, this.onError);
    API.action('login', { 'email':this.state.email, 'pwd':this.state.pwd}, this.login, this.onError);
  }
  clickHandlerFB(event){
    window.checkLoginState()
  }
  toggleModal = () => {
      this.setState({
          isOpen: !this.state.isOpen
      });
   }
   showOptions(){
      if(this.state.userOptions === 'hide'){
        document.getElementById('root').addEventListener('click', this.handleClickOutside, true);
        this.setState({
          'userOptions': 'userOptions'
        })
      }else{
        document.getElementById('root').removeEventListener('click', this.handleClickOutside, true);
        this.setState({
          'userOptions': 'hide'
        })
      }
   }
   register(e){
    this.state.show = false;
    window.location.href='/#/register';
   }
   logoutClicked(){
      window.setSpinner();
      API.action('logout', this.state, this.logout, this.onError);
   }

  logout = (_response) => {
    _response.status === 'successfull'
    ? ( localStorage.removeItem('logged'), localStorage.removeItem('token'),
      localStorage.removeItem('client'),
      this.props.showRegister(),
      typeof localStorage.getItem('extStatus') !== 'undefined' && JSON.parse(localStorage.getItem('extStatus')) && JSON.parse(localStorage.getItem('extStatus')).authResponse && JSON.parse(localStorage.getItem('extStatus')).authResponse.accessToken ? window.logoutFb() : null,
      this.props.login.signout()
    )
    : this.setState({
        isOpen: true,
        showedMsg: 'user.logout.error.'+_response.reason
      });
  }
  componentWillUnmount() {
      document.getElementById('root').removeEventListener('click', this.handleClickOutside, true);
  }
  handleClickOutside(event) {
      const domNode = ReactDOM.findDOMNode(this);
      if (!domNode || !domNode.contains(event.target)) {
          this.setState({
            'userOptions':'hide'
         });
      }
      document.getElementById('root').removeEventListener('click', this.handleClickOutside, true);
  }
  hideMenuResponsive(){
    this.setState({
      'userOptionsResponsive':''
    })
  }
  showMenuResponsive(){
    this.setState({
      'userOptionsResponsive':'userOptions_responsive_show'
    })
  }
  render() {
    return (
      <div>
        <div onClick={this.toogle} className={this.state.notLogged} >
          <div className="initSession_rot" >{this.translate('header.initSession').toUpperCase()}</div>
          <div className="initSession_ico" ><img src={user} alt="user" /></div>
        </div>
        <div className={this.state.loggedAs} onClick={this.showOptions} >
          {/*<Link to='/user' className='contrast'><div >{this.translate('logged.as')}{this.state.nickName}</div></Link>*/}
          <div className='contrast userNick' onClick={this.showMenu}>
            <div className="userOptions_avatar" style={'background-image:url('+this.state.avatar+')'} >
              <div className="userOptions_avatar_responsive" onClick={this.showMenuResponsive} ></div>
            </div>
            <div className="userOptions_avatar_nickname" >{this.state.nickName}</div>
            <div className="userOptions_avatar_deco" >
              ▼
              <div className="userOptions_container" >
              <div className={this.state.userOptions} >
                <div className="userOptions_deco" > ▲</div>
                  <Link to='/profile' ><div className="userOptions_item" >{this.translate('user.profile')}</div></Link>
                  <Link to='/lists' ><div className="userOptions_item" >{this.translate('user.lists')}</div></Link>
                  <Link to='/subscription' ><div className="userOptions_item" >{this.translate('user.subscription')}</div></Link>
                  <Link to='/bills' ><div className="userOptions_item" >{this.translate('user.bills')}</div></Link>
                  <Link to='/logout' ><div className="userOptions_item" onClick={this.logoutClicked} >{this.translate('user.logout')}</div></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <auth_web className={ 'auth_web auth_web_'+localStorage.getItem('template') + (this.state.show ? ' auth_web_show' : '')} >
            <div className="authInner">
              <h1>{this.translate('login')}</h1>
              <div><FBPB /></div>
              <div className="formOr" >------------------   {this.translate('register.or')}   ------------------</div>
              <form onSubmit={e => this.handleSubmit(e, this.login, this.onError)}>
                <div><input id="email" type="text"  onChange={this.handleChange} className={ this.state.emailClass + ' input_web_'+localStorage.getItem('template')}  value={this.state.email} placeholder={this.translate('nickoremail')} /></div>
                <div className="notValid_msg" >{this.state.emailValidation}</div>
                <div><input id="pwd" type="password" onChange={this.handleChange} className={ 'input_web_'+localStorage.getItem('template')} value={this.state.pwd} placeholder={this.translate('password')} /></div>
                <div class='row'>
                  <div class='col-xs-12 col-md-6' ><Link to='/recover' onClick={this.toogle} className='forgotPwdBtn'><div>{this.translate('register.recoverPwd')}</div></Link></div>
                  <div class='col-xs-12 col-md-6' ><div className={"initBtn " + this.state.deactive } onClick={e => this.handleSubmit(e, this.login, this.onError)} >{this.translate('header.initSession').toUpperCase()}</div></div>
                </div>
              </form>
              <div class='row'>
                  <div class='col-xs-12 col-md-6' ><div className='remember'>Recuérdame</div></div>
              </div>
              <div class='row registerRow'>
                  <div class='col-xs-12 col-md-6' ><div className={ 'noAccountRot noAccountRot_web_'+localStorage.getItem('template')}  >¿No tienes cuenta?</div></div>
                  <div class='col-xs-12 col-md-6' ><div onClick={this.register} className='registerBtn' >Registrate ahora</div></div>
              </div>
              <div className="closePB" onClick={this.toogle}>X</div>
            </div>
          <div>
            <Modal show={this.state.isOpen} onClose={this.toggleModal} >
                {this.translate(this.state.showedMsg)}
              </Modal>
          </div>
        </auth_web>
        <div className={"userOptions_responsive " + this.state.userOptionsResponsive} onClick={this.hideMenuResponsive}>
          <div className="userOptions_item_responsive" >
              X
          </div>
          <div><Link to='/profile' ><div className="userOptions_item_responsive" >{this.translate('user.profile')}</div></Link></div>
          <div><Link to='/lists' ><div className="userOptions_item_responsive" >{this.translate('user.lists')}</div></Link></div>
          <div><Link to='/subscription' ><div className="userOptions_item_responsive" >{this.translate('user.subscription')}</div></Link></div>
          <div><Link to='/bills' ><div className="userOptions_item_responsive" >{this.translate('user.bills')}</div></Link></div>
          <div><Link to='/logout' ><div className="userOptions_item_responsive" onClick={this.logoutClicked} >{this.translate('user.logout')}</div></Link></div>
        </div> 
      </div>
    );
  }
}

Login_web.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Login_web);
export default Login_web;