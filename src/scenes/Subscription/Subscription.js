import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import Utils from '../../utils/Utils.js'
import DeleteAccount from '../../components/DeleteAccount/DeleteAccount.js'
import './Subscription.scss'

class Subscription extends React.Component {
  constructor(props) {
    super(props);
    typeof props.location !== 'undefined'
    ? localStorage.setItem('lastState',props.location.pathname)
    : null;
    var client = JSON.parse(localStorage.getItem('client'));
    this.state = {
      'data':[ ],
      'type':client ? client.personalData.type : null,
      'fase':0
    }
    this.handleResize = this.handleResize.bind(this);
    this.leftFunction = this.leftFunction.bind(this);
    this.rightFunction = this.rightFunction.bind(this);
    this.clickBallHandler = this.clickBallHandler.bind(this);
  }
  toggleModal = () => {
    this.setState({
        isOpen: !this.state.isOpen
    });
   }
  onSuccess = (_response) => {
    Utils.scrollToTop(300);
    _response.status === 'successfull'
    ? this.setState ({
        'data':_response.data,
      })
    : this.setState({
        isOpen: true,
        showedMsg: 'subscription.' + _response.reason
    });
  }
  onError = (_response, _error) =>{
    this.setState({
          isOpen: true,
          showedMsg: _error
      });
  }
  clickBallHandler(event){
    this.setState({
      'fase': event.target.id.replace('ball_item_','')
    })
    document.querySelector('.subscription_list').style.left = - this.state.fase * document.querySelector('.subscription_list_container').offsetWidth + 'px'
  }
  leftFunction(){
    if((parseFloat(this.state.fase) + 1) >= this.state.data.collection.length-1 ){
       this.setState({
          'fase':this.state.data.collection.length-1
        })
    }else{
      this.setState({
          'fase':parseFloat(this.state.fase) + 1
        })
    }
    document.querySelector('.subscription_list').style.left = - this.state.fase * document.querySelector('.subscription_list_container').offsetWidth + 'px'
  }
  rightFunction(){
    if((parseFloat(this.state.fase) - 1) <= 0 ){
       this.setState({
          'fase':0
        })
    }else{
      this.setState({
          'fase':parseFloat(this.state.fase) - 1
        })
    }
    document.querySelector('.subscription_list').style.left = - this.state.fase * document.querySelector('.subscription_list_container').offsetWidth + 'px'
  }
  handleResize() {
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    });
    document.querySelector('.subscription_list').style.left = - this.state.fase * document.querySelector('.subscription_list_container').offsetWidth + 'px'
  }
  componentDidMount(){
    window.addEventListener('resize', this.handleResize);
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
    switch(this.state.type){
      case 'premium':
        window.setSpinner();
        API.action('getSubscriptionList', { 'phase': localStorage.getItem('phase_channel') || 0 }, this.onSuccess, this.onError, 'GET');//,
      break;
      case 'invited':
        window.setSpinner();
        API.action('getSubscriptionList', { 'phase': localStorage.getItem('phase_channel') || 0 }, this.onSuccess, this.onError, 'GET');//,
      break;
      default:
        window.spinnerHide = false;
        window.setSpinner()
        /*!window.spinnerHide
        ? (
          window.spinnerHide = true,
          window.setSpinner()
        )
        :null;*/
      break;
    }
    Utils.swipedetect(window, function(swipedir, toLeft, toRight) {
          switch (swipedir) {
              case "left":
                  if (toLeft != undefined) {
                      toLeft();
                  }
                  break;
              case "right":
                  if (toRight != undefined) {
                      toRight();
                  }
                  break;
              case "up":
                  break;
              case "down":
                  break;
              case "none":
                  break;
          }
      }, this.leftFunction, this.rightFunction
    );
    
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  render() {
    let SubscriptionList, Type, Next;
    if(typeof this.state.data.collection !== 'undefined'){
      SubscriptionList = this.state.data.collection;
    }else{
      SubscriptionList  = [];
    }
    if(typeof this.state.data.type !== 'undefined'){
      Type = this.state.data.type;
    }else{
      Type  = 'Basic';
    }
    if(typeof this.state.data.next !== 'undefined'){
      Next = this.state.data.next;
    }else{
      Next  = [];
    }
    return (
      <div className="subscription mt50" style={this.state.style} >
        <h1>{this.translate('subscription')}</h1>
        <div className="subscription_data mt50" >
          <div className ="row">
            <div className={this.state.type !=='basic'  ? 'col-xs-12 col-md-3 invPrem' : 'col-xs-12'} >
              <div className="subscription_data_rot" >
                {this.translate('user.subscription.type').toUpperCase()}
              </div>
            </div>
            <div className={this.state.type !=='basic'  ? 'col-xs-12 col-md-3 invPrem' : 'col-xs-12'}>
              <div className="subscription_data_value greenFont" >
                {Type}
              </div>
            </div>
          </div>
          <div className={this.state.type !=='basic'  ? 'row mt50' : 'hide'} >
            <div className="col-xs-12 col-md-3 invPrem">
              <div className="subscription_data_rot" >
                {this.translate('user.subscription.charge').toUpperCase()}
              </div>
            </div>
            <div className="col-xs-12 col-md-7 invPrem">
              <div className="subscription_data_value" >
                {this.translate('user.subscription.charge1')} {(new Date(Next)).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className={this.state.type !=='basic'  ? 'subscription_list_rot' : 'hide'} >{this.translate('user.subscription.period').toUpperCase()}</div>
        <div className={this.state.type !=='basic'  ? 'subscription_list_container mt25' : 'hide'} >
          <div className='subscription_list mt50'>
            <div className ="row subscription_list_tabs mt25">
              <div className="col-xs-12 col-md-2">{this.translate('user.subscription.date')}</div>
              <div className="col-xs-12 col-md-2">{this.translate('user.subscription.description')}</div>
              <div className="col-xs-12 col-md-2">{this.translate('user.subscription.servicePeriod')}</div>
              <div className="col-xs-12 col-md-2">{this.translate('user.subscription.method')}</div>
              <div className="col-xs-12 col-md-2">{this.translate('user.subscription.subTotal')}</div>
              <div className="col-xs-12 col-md-2">{this.translate('user.subscription.total')}</div>
            </div>
            {SubscriptionList.map(( p , index) => {
              return(
                <div className ="row subscription_list_item mt25">
                  <div className="col-xs-12 col-md-2">{ (new Date(p.date)).toLocaleDateString() }</div>
                  <div className="col-xs-12 col-md-2">{p.description}</div>
                  <div className="col-xs-12 col-md-2">{ (new Date(p.period.init)).toLocaleDateString() } - { (new Date(p.period.end)).toLocaleDateString() }</div>
                  <div className="col-xs-12 col-md-2">{p.method}</div>
                  <div className="col-xs-12 col-md-2">{p.subtotal.amount.toFixed(2)}€ ( +{p.subtotal.iva.toFixed(2)} IVA )</div>
                  <div className="col-xs-12 col-md-2"><span className='singleTabLabel'>{this.translate('user.subscription.total')}</span>{p.total.toFixed(2)}€</div>
                </div>
               )
            })}
          </div>
        </div>
        <div className='balls'>
          {SubscriptionList.map((p , index) => {
            return (
              <div className='ball-item'  >
                <div id={'ball_item_'+index} className={ index == this.state.fase ? 'hidden':'bullEnabled'} onClick={this.clickBallHandler} >&bull;</div>
                <div className={ index != this.state.fase ? 'hidden':'bullDisabled'}   >&bull;</div>
              </div>
            )
          })}
        </div>
        <div className={this.state.type !=='basic'  ? 'hide' : 'row mt50'} >
          <div className="subscription_basic_desc" >
            <p>{this.translate('user.subscription.nonactive1')}</p>
            <p>{this.translate('user.subscription.nonactive2')}</p>
          </div>
          {/*<div className="subscription_basic_op mt25">
            {this.translate('creditCard').toUpperCase()}
          </div>*/}
          <div className="subscription_basic_activate mt25 mb50" >
            <Link to='/premium' >
              <div className="neutralPB_bordered greenTextPB" >
                {this.translate('user.subsNonActive').toUpperCase()}
              </div>
            </Link>
          </div>

          <div className="subscription_basic_op mt25">
            {this.translate('promotionalCode').toUpperCase()}
            <div className="subscription_basic_desc mb25 mt25">{this.translate('code.description')}</div>
          </div>
          <div className="subscription_basic_activate mt25 mb25" >
            <Link to='/promotional' >
              <div className="neutralPB_bordered greenTextPB" >
                {this.translate('user.subsNonActive').toUpperCase()}
              </div>
            </Link>
          </div>
        </div>
        <DeleteAccount />
        <Modal show={this.state.isOpen} onClose={this.toggleModal}  >
          {this.translate(this.state.showedMsg)}
        </Modal>
      </div>
    );
  }
}

Subscription.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Subscription);
export default Subscription;