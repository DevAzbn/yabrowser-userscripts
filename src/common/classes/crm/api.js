'use strict';

(function(_){
	
	function __class__() {
		
		var _t = this;

		_t.api_params = {};

		_t.getClassName = function() {
			return 'Api';
		};

		_t.updateApiParams = function(data) {
			_t.api_params = data;
		};

		_t.getApiParams = function() {
			return _t.api_params;
		};

		_t.updateApiParams(JSON.parse(document.body.getAttribute('data-api-params') || '{}'));

		_t.apiInstance = axios.create({
			baseURL : _t.api_params.url.api,
			method : _t.api_params.method,
			headers : {
				'X-API-Key' : _t.api_params.keys.api,
				'X-Organization-Key' : _t.api_params.keys.organization,
				'X-Profile-Key' : _t.api_params.keys.profile,
				//'X-Requested-With' : 'XMLHttpRequest',
				//'Content-Type' : 'multipart/form-data',
				//'Content-Type' : 'application/x-www-form-urlencoded',
			},
			timeout : 10000,
			withCredentials : true,
			responseType : 'json',
			responseEncoding : 'utf8',
			validateStatus : function (status) {
				return status >= 200 && status < 300; // default
			},
		});

		_t.responseCb = function(cb) {
			return function(response) {
				if(cb) {
					if(response && response.data) {
						
						var r = response.data.data || {};
						var m = response.data.meta || {};

						cb(null, r, m);

					} else {
						
						cb(error);

					}
				}
			};
		};

		_t.catchCb = function(cb) {
			return function(error) {
				
				_.get('Events').error(error, {module : _t.getClassName(), url : window.location.href});
				cb && cb(error);

			}
		};

		_t.finallyCb = function(cb) {
			return function(error) {
				
			}
		};

		_t.call = function(route, params, others, cb) {
	
			var p = {
				url : route,
				data : {
					meta : others || {},
					data : params,
				},
			}
			
			_t.apiInstance.request(p)
				.then(_t.responseCb(cb))
				.catch(_t.catchCb(cb))
				.finally(_t.finallyCb(cb))
			;
			
		};

		_t.upload = function(route, params, others, cb, percent_cb) {
	
			var data = new FormData();
	
			for(var k = 0; k < params.length; k++) {
				data.append(others.namespace + '[]', params[k]);
			}
			
			var p = {
				onUploadProgress : function(progressEvent) {
					var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
					percent_cb && percent_cb(percentCompleted);
				},
				headers : {
					'Content-Type' : 'multipart/form-data',
				},
			};
	
			_t.apiInstance.post(_t.api_params.url.api + route, data, p)
				.then(_t.responseCb(cb))
				.catch(_t.catchCb(cb))
				.finally(_t.finallyCb(cb))
			;
			
		}

		return _t;

	}
	
	_.set('Api', new __class__());
	
})(_);

/*
var p = {
			baseURL : _t.api_params.url.api,
			url : route,
			method : _t.api_params.method,
			transformRequest : [function (data, headers) {
				return data;
			}],
			transformResponse : [function (data) {
				return data;
			}],
			headers : {
				'X-API-Key' : _t.api_params.keys.api,
				'X-Organization-Key' : _t.api_params.keys.organization,
				'X-Profile-Key' : _t.api_params.keys.profile,
				//'X-Requested-With' : 'XMLHttpRequest',
				//'Content-Type' : 'multipart/form-data',
				//'Content-Type' : 'application/x-www-form-urlencoded',
			},
			//params : params,
			//data : params,
			timeout : 10000,
			withCredentials : true,
			//auth : { username: '', password: '' },
			responseType : 'json',
			responseEncoding : 'utf8',
			//xsrfCookieName : 'XSRF-TOKEN',
			//xsrfHeaderName : 'X-XSRF-TOKEN',
			onUploadProgress: function (progressEvent) {
			
			},
			onDownloadProgress: function (progressEvent) {
			
			},
			validateStatus : function (status) {
				return status >= 200 && status < 300; // default
			},
			proxy : {
				host : '127.0.0.1',
				port : 9000,
				auth : {
					username : '',
					password : ''
				}
			},
		}
*/