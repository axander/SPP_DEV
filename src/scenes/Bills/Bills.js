import React from 'react'
import { Modal, API } from '../../services/Rest.js'
import { Link, Route } from 'react-router-dom'
import TranslatedComponent from '../../utils/TranslatedComponent.js'
import Utils from '../../utils/Utils.js'
import DeleteAccount from '../../components/DeleteAccount/DeleteAccount.js'
import './Bills.scss'

class Bills extends React.Component {
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
        showedMsg: 'bills.' + _response.reason
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
    API.action('getBills', { 'phase': localStorage.getItem('phase_channel') || 0 }, this.onSuccess, this.onError, 'GET');//,
    window.setSpinner();
  }
  render() {
    let BillsList, Card;
    if(typeof this.state.data.collection !== 'undefined'){
      BillsList = this.state.data.collection;
    }else{
      BillsList  = [];
    }
    if(typeof this.state.data.type !== 'undefined'){
      Card = this.state.data.type.card;
    }else{
      Card  = '';
    }
    return (
      <div className="bills mt50" style={this.state.style} >
        <h1>{this.translate('bills')}</h1>
        <div className="bills_data mt50" >
          <div className="bills_data_rot" >{this.translate('user.bills.data').toUpperCase()}</div>
          <div className="bills_data_type mt25" >
            <div className ="row">
              <div className="col-xs-2 col-md-2">{this.translate('user.bills.typeName')}</div>
              <div className="col-xs-2 col-md-3">{Card}</div>
              <div className="col-xs-2 col-md-7 bills_data_type_modify"><div className="neutralPB font20 font_med_grey" >{this.translate('user.bills.modify')}</div></div>
            </div>
          </div>
        </div>
        <div className="bills_list mt50" >
          <div className="bills_list_rot">{this.translate('user.bills').toUpperCase()}</div>
          <div className ="row bills_list_tabs mt25">
            <div className="col-xs-2 col-md-2">{this.translate('user.bills.date')}</div>
            <div className="col-xs-2 col-md-3">{this.translate('user.bills.number')}</div>
            <div className="col-xs-2 col-md-2">{this.translate('user.bills.amount')}</div>
          </div>
          {BillsList.map(( p , index) => {
            return(
              <div className ="row bills_list_item mt25">
                <div className="col-xs-2 col-md-2">{ (new Date(p.date)).toLocaleDateString() }</div>
                <div className="col-xs-2 col-md-3">{p.number}</div>
                <div className="col-xs-2 col-md-2">{p.amount}</div>
                <div className="col-xs-2 col-md-5"><div className="neutralPB font20 font_med_grey" >{this.translate('user.bills.download')}</div></div>
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

Bills.propTypes = {
  //who: React.PropTypes.string.isRequired,
};


// Returns nothing because it mutates the class
TranslatedComponent(Bills);
export default Bills;