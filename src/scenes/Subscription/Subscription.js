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
    this.state = {
      'data':[ ]
    }
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
  componentDidMount(){
    this.setState({
      'style':{
        'margin-top':document.querySelector('.breadcrumb') ? document.querySelector('.breadcrumb').offsetHeight + 'px' : '0'
      }
    })
    API.action('getSubscriptionList', { 'phase': localStorage.getItem('phase_channel') || 0 }, this.onSuccess, this.onError, 'GET');//,
    window.setSpinner();
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
      Type  = [];
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
            <div className="col-xs-3 col-md-3">
              <div className="subscription_data_rot" >
                {this.translate('user.subscription.type').toUpperCase()}
              </div>
            </div>
            <div className="col-xs-7 col-md-7">
              <div className="subscription_data_value" >
                {Type}
              </div>
            </div>
          </div>
          <div className ="row mt50">
            <div className="col-xs-3 col-md-3">
              <div className="subscription_data_rot" >
                {this.translate('user.subscription.charge').toUpperCase()}
              </div>
            </div>
            <div className="col-xs-7 col-md-7">
              <div className="subscription_data_value" >
                {this.translate('user.subscription.charge1')} {(new Date(Next)).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className="subscription_list mt50" >
          <div className="subscription_list_rot">{this.translate('user.subscription.period').toUpperCase()}</div>
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
                <div className="col-xs-12 col-md-2">{p.total.toFixed(2)}€</div>
              </div>
             )
          })}
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