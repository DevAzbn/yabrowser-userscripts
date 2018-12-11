'use strict';


window.onerror = function(error, url, lineNumber, column, errorObj) {
	console.dir(arguments);
}


var vueRoutes = [];


Vue.directive('require-global', {
	bind : $mctrl.get('VComp').require_global,
});

Vue.directive('require-local', {
	bind : $mctrl.get('VComp').require_local,
});

/*
Vue.directive('dev-test', {
	bind : $mctrl.get('VComp').dev_test,
});
*/



var vueMixins = {


	common : {

		data : function() {
			return {
								
			};
		},

		created : function() {
			
			$mctrl.get('Events').log({
				component_created : this.$options.name,
			}, this);
	
		},

		methods : {

			logEvent : function(event) {

				$mctrl.get('aCRM').logEvent(event, this);

			},

			getFlag : function(uid) {
				
				return this.$store.getters.getFlag(uid);

			},

		},

	},


	auth : {
		
		created : function() {

			var _t = this;
			var _s = _t.$store;
			var _r = _t.$router;

			if(!_s.getters.getFlag('isAuth')) {

				_r.push('/public/login/');

			}

		},

	},


	public : {

		

	},


	block_container__block_field__edit : {
	
		props : [
			'params',//общие параметры
			'index',//индекс текущего блока
			'block',//настройки текущего блока
			'value',//значение
		],
	
		inject : [
			'getContext',
			'getContainer',
		],
	
		data : function () {
			return {
				
				real : typeof this.value != 'undefined' ? this.value : null,
				
				visible : this.value,
				
				flags : {
					required : this.block.field.required,
					private : this.block.field.private,
					multiple : this.block.field.multiple,
				},
	
			}
		},
		
		created : function() {
			
			var _t = this;
			
			_t.$options.template = '#' + _t.$options.name;
	
		},
	
		watch : {
	
			real : function(n,o) {
	
				var _t = this;
				
				_t.block.callback(n);
	
				//_t.getContext().fieldChanged(_t.block.field.uid, n);
	
			},
	
			visible : function(n,o) {
	
				var _t = this;
	
				_t.real = n;
	
			},
	
		},
	
		method : {
	
		},
	
	},


	block_container__block_field__view : {

		props : [
			'params',//общие параметры
			'index',//индекс текущего блока
			'block',//настройки текущего блока
			'value',//значение
		],
	
		inject : [
			'getContext',
			'getContainer',
		],
	
		data : function () {
			return {
				
				flags : {
					
				},
	
			}
		},
		
		created : function() {
			
			var _t = this;

			_t.$options.template = '#' + _t.$options.name;
	
		},

	},


	block_container__block_field__button : {

		props : [
			'params',//общие параметры
			'index',//индекс текущего блока
			'block',//настройки текущего блока
			'value',//значение
		],
	
		inject : [
			'getContext',
			'getContainer',
		],
	
		data : function () {
			return {
				
				flags : {
					
				},
	
			}
		},
		
		created : function() {
			
			var _t = this;
	
			_t.$options.template = '#' + _t.$options.name;
	
		},
		
	},

	
};



var vuexModules = {
	
	session : {
		state : {
			session : {
				profile : null,
			},
			photo : {

			},
			flags : {
				menuOpen: false,
				isAuth : false,
				isLoading : true,
				isDev : $mctrl.get('isDev'),
				classesLoaded : false,
				nearStranger : false,
				errorViewer : true,//$mctrl.get('isDev')
			},
		},
		mutations : {
			
			setFlag : function(state, o) {
				if(state && state.flags && o && Object.keys(o).length) {
					for(var k in o) {
						
						/*
						if(typeof state.flags[k] == 'undefined') {
							state.flags[k] = null;
						}
						*/
						Vue.set(state.flags, k, o[k]);

					}
				}
			},

			setSession : function(state, o) {
				if(state) {
					state.session = o;
				}
			},

			setSessionPhoto : function(state, o) {
				if(state) {
					state.photo = o;
				}
			},

		},
		getters : {
			
			getFlag : function(state, getters, rootState) {
				return function(uid) {
					return state && state.flags && state.flags[uid];
				};
			},
			
			getSession : function(state, getters, rootState) {
				return function() {
					return (state && state.session) ? state.session : null;
				};
			},

			hasAccess : function(state, getters, rootState) {
				return function(level, entity_class, entity_id) {
					var res = false;
					if(getters.getFlag('isAuth') && level) {
						var sess = getters.getSession();
						if(sess && sess.profile.access) {
							var a = sess.profile.access;
							if(a[ level ] && a[ level ][ entity_class ]) {
								if(typeof entity_id == 'undefined') {
									entity_id = 0;
								}
								res = (a[ level ][ entity_class ].indexOf('' + entity_id) > -1) ? true : false;
								res = res || ((a[ level ][ entity_class ].indexOf('' + 0) > -1) ? true : false);
							}
						}
					}
					return res;
				};
			},

		},
		actions : {

			setSession : function(context, o) {

				context.commit('setSession', o);

				if(context.state.session && context.state.session.profile) {

					if(context.state.session.profile.item && context.state.session.profile.item.id) {
						
						context.commit('setFlag', {
							isAuth : true,
						});

						/*
						if(context.state.session.profile.item.photo_id) {



						}
						*/

					} else {
						
						context.commit('setFlag', {
							isAuth : false,
						});

					}

					if(context.state.session.profile.data) {
						
						var nearStranger = parseInt(context.state.session.profile.data.nearStranger);

						context.commit('setFlag', {
							nearStranger : nearStranger,
						});

					}

				} else {

					context.commit('setFlag', {
						isAuth : false,
					});

				}

			},

			setSessionPhoto : function(context, o) {

				context.commit('setSessionPhoto', o);

			},

		},
	},
	
	menu : {
		state : {
			left_pos1 : [
				{
					title : 'Живая лента',
					path : '/mainpage/',
				},
				{
					title : 'Сущности',
					path : '/auth/admin/entity/classes/',
				},
			],
			sale : [
				{
					title : 'Осмотры',
					path : '/inspections/',
				},
				{
					title : 'Входящие звонки',
					path : '/incomings/',
				},
				{
					title : 'Встречи',
					path : '/meetings/',
				},
				{
					title : 'ДОУ продажа',
					path : '/contract/sale/',
				},
				{
					title : 'Реклама',
					path : '/contract/ad/',
				},
			],
			bay : [
				{
					title : 'Входящие звонки',
					path : '/incomings/',
				},
				{
					title : 'Показы',
					path : '/shows/',
				},
				{
					title : 'Встречи',
					path : '/meetings/',
				},
				{
					title : 'ДОУ покупка',
					path : '/contract/bay/',
				},
			],
			company : [
				{
					title : 'Сотрудники',
					path : '/team/',
				},
				{
					title : 'Чат',
					path : '#Чат',
				},
				{
					title : 'Форум',
					path : '#Форум',
				},
				{
					title : 'Обучение',
					path : '#Обучение',
				},
			],
			bases : [
				{
					title : 'Клиенты',
					path : '#Клиенты',
				},
				{
					title : 'Объявления',
					path : '#Объявления',
				},
				{
					title : 'Новостройки',
					path : '#Новостройки',
				},
			],
			left : [
				/*{
					title : 'главная страница',
					path : '/mainpage/',
				},
				{
					title : 'Покупка',
					path : '#',
				},
				{
					title : 'сущности',
					path : '/auth/admin/entity/classes/',
				},
				{
					title : 'входящие звонки',
					path : '/incomings/',
					children : [
						{
							title : 'добавить',
							path : '/incomings/add/',
						}
					]
				},*/
			],
		},
	},

	errors : {
		state : {
			errors : [],
		},
		mutations : {
			saveError : function(state, o) {
				if(o) {
					o.created_at = new Date().getTime();
					state.errors.push(o);
				}
			},
		},
		getters : {
			getErrors : function(state, getters, rootState) {
				return state.errors;
			},
		},
	},

	modals : {
		state : {
			modals : [],
		},
		mutations : {
			openModal : function(state, o) {
				if(o) {
					//o.created_at = new Date().getTime();
					if(!o.params) {
						o.params = {};
					}
					state.modals.push(o);
				}
			},
			closeModal : function(state, o) {
				if(o && o.uid && state.modals && state.modals.length) {
					for(var i in state.modals) {
						var m = state.modals[i];
						if(m.uid == o.uid) {
							state.modals.splice(i, 1);
						}
					}
				}
			},
		},
		getters : {
			getModals : function(state, getters, rootState) {
				return state.modals;
			},
		},
	},

	uploads : {
		state : {
			uploads_in_process : {},
			uploaded : [],
		},
		mutations : {
			createUploadTask : function(state, o) {
				if(o) {
					
					if(!o.percent) {
						o.percent = 0;
					}

					//state.uploads_in_process[ o.uid ] = o;
					
					Vue.set(state.uploads_in_process, o.uid, o);

				}
			},
			archiveUploadTask : function(state, o) {
				if(o) {
					if(state.uploads_in_process[ o.uid ]) {

						var t = state.uploads_in_process[ o.uid ];

						Vue.delete(state.uploads_in_process, o.uid);

						state.uploaded.push(t);

					}
				}
			},
			setUploadProcessPercent : function(state, o) {
				if(state.uploads_in_process[ o.uid ]) {
					
					state.uploads_in_process[ o.uid ].percent = o.percent;

				}
			},
		},
		getters : {
			getUploadsInProcess : function(state, getters, rootState) {
				
				return state.uploads_in_process;

			},
			getUploaded : function(state, getters, rootState) {
				
				return state.uploaded;

			},
		},
		actions : {

			uploadFile : function(context, o) {

				//context.commit('addUploadTask', o);
				/*
				{
					cb
				}
				if(!o.uid) {
					o.uid = $mctrl.randstr();
				}
				*/

				var input = document.createElement('input');
				input.setAttribute('type', 'file');
				input.setAttribute('name', o.namespace);
				if(o.multiple) {
					input.setAttribute('multiple', 'multiple');
				}
				input.onchange = function() {
					
					//console.dir(input.files);
					
					if(input.files && input.files.length) {
						for(var i = 0; i < input.files.length; i++) {
							
							(function(file) {
								
								var uid = $mctrl.randstr();

								var fo = {
									uid : uid,
									namespace : o.namespace || uid,
									title : file.name,
									size : file.size,
									percent : 0,
								};

								context.commit('createUploadTask', fo);
			
								$mctrl.get('Api').upload('Upload/Multiple', [ file ], {
									namespace : fo.namespace,
								}, function(err, resp, meta) {
				
									input.parentNode && input.parentNode.removeChild(input);
			
									if(o.cb) {
										o.cb(err, resp, meta);
									}
			
									setTimeout(function() {
			
										context.commit('archiveUploadTask', fo);
			
									}, 5000);
				
								}, function(percent) {
									
									context.commit('setUploadProcessPercent', {
										uid : uid,
										percent : percent,
									});
				
								});

							})(input.files[ i ]);

						}
					}

				}
				input.click();

			},

		},
	},

};

/*
Vue.directive('compile', {
	bind : function(el) {
		console.dir(arguments);
	},
	inserted: function(el) {
		console.dir(arguments);
	},
	update : function(el) {
		console.dir(arguments);
	},
	componentUpdated : function(el) {
		console.dir(arguments);
	},
	unbind : function(el) {
		console.dir(arguments);
	},
});
*/

/*

var callApi = function(route, params, others, cb) {

	var api_params = JSON.parse(document.body.getAttribute('data-api-params') || '{}');
	//path = (path ? path : 'default') + api_params.suffix;

	var p = {
		baseURL : api_params.url.api,
		url : route,
		method : api_params.method,
		transformRequest : [function (data, headers) {
			return data;
		}],
		transformResponse : [function (data) {
			return data;
		}],
		headers : {
			'X-API-Key' : api_params.keys.api,
			'X-Organization-Key' : api_params.keys.organization,
			'X-Profile-Key' : api_params.keys.profile,
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

	var _meta = others || {};
	
	p.data = {
		meta : _meta,
		data : params,
	}
	
	axios(p)
		.then(function(response) {
			//console.debug(response);
			cb && response && response.data && cb(response.data.data ? response.data.data : {}, response.data.meta ? response.data.meta : {});
		})
		.catch(function(error) {
			console.error(error);
			cb && cb(null, null, error);
		})
		.finally(function() {
			
		})
	;
	
}

var uploadFiles = function(route, params, others, cb, percent_cb) {

	var api_params = JSON.parse(document.body.getAttribute('data-api-params') || '{}');

	var data = new FormData();

	for(var k = 0; k < params.length; k++) {
		data.append(others.namespace + '[]', params[k]);
	}
	
	var config = {
		onUploadProgress : function(progressEvent) {
			var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
			percent_cb && percent_cb(percentCompleted);
		},
		headers : {
			'X-API-Key' : api_params.keys.api,
			'X-Organization-Key' : api_params.keys.organization,
			'X-Profile-Key' : api_params.keys.profile,
			'Content-Type' : 'multipart/form-data',
		},
		timeout : 10000,
		withCredentials : true,
		responseType : 'json',
		responseEncoding : 'utf8',
		validateStatus : function (status) {
			return status >= 200 && status < 300;
		},
	};

	axios.post(api_params.url + route, data, config)
		.then(function(response) {
			//console.debug(response);
			cb && response && response.data && cb(response.data.data ? response.data.data : {}, response.data.meta ? response.data.meta : {});
		})
		.catch(function(error) {
			console.error(error);
			cb && cb(null, null, error);
		})
		.finally(function() {
			
		})
	;

}
*/