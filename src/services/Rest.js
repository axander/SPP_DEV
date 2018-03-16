import "isomorphic-fetch"
import { polyfill } from 'es6-promise'; polyfill();
import React from 'react'
import List from './List.js'
import Utils from '../utils/Utils.js'

const API = {
	action: function(_path, _params, _onSuccess, _onError, _singleMethod, _singleMock){
		//
		var fullUrl = _path.indexOf('http');
		var url = '';
		if( fullUrl < 0 && List[_path].service === 'config'){
			url = List[_path].service + '.json';//get config
			var _method  = List[_path].method;
		}else{
			var config = JSON.parse(localStorage.getItem('config'));
			fullUrl >= 0 
			? url = _path
			: url =  config.mocks || _singleMock
						? config.mocksPath+List[_path].service+'.json'
						: config.endpoint+config.partialPath+List[_path].service;
			_singleMethod
			? _method = _singleMethod
			: _method  = ( config.mocks || _singleMock ) ? 'GET' :List[_path].method;
		};

		fetch(
			_method === 'GET' && List[_path].service !== 'config' ? url+"?"+Utils.formatGetParameters(_params) : url , 
			{
				/*mode: 'no-cors',*/
		      	method: _method,
		      	headers: localStorage.getItem('token') && fullUrl < 0 ? new Headers({
		      			'Cache-Control': 'cache',
		      			'Accept':'*/*',
		                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
		                'Authorization': 'Bearer ' + localStorage.getItem('token') ,
		        }) : new Headers({
		        		'Cache-Control': 'cache',
		        		'Accept':'*/*',
		                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
		        }),
		      	body: _method === 'POST' ? Utils.formatGetParameters(_params) : undefined // <-- Post parameters
		    }
		)
	    .then(function(response) {
    		if (response.status >= 400) {
    			window.setSpinner();
		    	_onError(response, 'warning');
		    }
		    return response.json();
		})
		.then(function(data) {
			if(typeof List[_path] !== 'undefined' && List[_path].service === 'config'){
				data.data.token ? localStorage.setItem('token',data.data.token) : null;
				localStorage.setItem('config',JSON.stringify(data.data));
				_onSuccess(data);	
			}else{
				window.setSpinner();
		    	_onSuccess(data);				
			}

		})
	    .catch((error) => {
	    	window.setSpinner();
	    	_onError(error, 'critical');
	    })
	}
}


class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdropContainer" onClick={this.props.onClose}>
        <div className="backdrop" >
          <div className="modal" >
            <div className="modal-contain">
              <p>{this.props.children}</p>
            </div>
            <div className="modal-footer">
              <button>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = {
  Modal,
  API
}