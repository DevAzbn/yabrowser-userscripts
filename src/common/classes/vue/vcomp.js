'use strict';

(function(_){
	
	function __class__() {
		
		var _t = this;

		_t.__components = {};
		_t.__in_request = {};
		_t.__in_request_cb = {};

		_t.api_params = {};

		_t.updateApiParams = function(data) {
			_t.api_params = data;
		};

		_t.updateApiParams(JSON.parse(document.body.getAttribute('data-api-params') || '{}'));

		_t.apiInstance = axios.create({
			baseURL : _t.api_params.url.vcomp,
			method : 'get',
			headers : {
				'X-API-Key' : _t.api_params.keys.api,
				'X-Organization-Key' : _t.api_params.keys.organization,
				'X-Profile-Key' : _t.api_params.keys.profile,
				//'Content-Type' : 'text/javascript',
				//'Content-Type' : 'text/html',
			},
			timeout : 10000,
			withCredentials : true,
			responseEncoding : 'utf8',
			validateStatus : function (status) {
				return status >= 200 && status < 300; // default
			},
		});

		_t.buildPath = function(arg, mods) {
			var ns = [arg];
			if(Object.keys(mods).length) {
				ns = ns.concat(Object.keys(mods));
			}
			return ns;
		};

		_t.setComponent = function(path, c) {

			if(!c || !path) {
				return;
			}

			var path_arr = path;

			if(typeof path_arr == 'string') {
				path_arr = path_arr.split('/');
			}

			var _c = _t.__components;
			path_arr.forEach(function(item, i){
				if(!_c[item]) {
					_c[item] = {};
				}
				if(i < (path_arr.length - 1)) {
					_c = _c[item];
				} else {
					_c[item] = c;
					_c = _c[item];
				}
			});

			return _c;

		};

		_t.getComponent = function(path, def) {
			
			var path_arr = path;

			if(typeof path_arr == 'string') {
				path_arr = path_arr.split('/');
			}

			var _c = _t.__components;
			path_arr.forEach(function(item, i){
				if(!_c[item]) {
					return;
				} else {
					_c = _c[item];
				}
			});

			return _c;

		};

		_t.isComponent = function(path) {

			if(!path) {
				return false;
			}

			var res = false;

			var path_arr = path;

			if(typeof path_arr == 'string') {
				path_arr = path_arr.split('/');
			}

			var _c = _t.__components;
			path_arr.forEach(function(item, i){
				_c = _c && _c[item] ? _c[item] : null;
				if(_c && i == (path_arr.length - 1)) {
					if(typeof _c == typeof (new Object())) {
						res = true;
					}
				}
			});

			return res;

		};

		_t.loadComponentByUrl = function(path, params, cb) {

			var b = document.body;

			_t.apiInstance.request({
				url : path + '.vcomp.html',
				params : params,
			})
				.then(function(resp) {

					var temp = document.createElement('div');
					temp.innerHTML = resp.data;

					var arr = [];

					Array.prototype.map.call(temp.childNodes, function(node) {
						
						if(node.nodeType === 1) {
							
							var tn = node.tagName.toLowerCase();
							var nn = document.createElement(tn);

							for(var k of node.getAttributeNames()) {
								var v = node.getAttribute(k);
								nn.setAttribute(k, v);
							}

							nn.innerHTML = node.innerHTML.trim();
							b.appendChild(nn);

							arr.push(nn);
							
						}

						return null;//node.nodeType === 1 ? node.outerHTML : node.nodeValue;

					});

					cb && cb(arr);
	
				})
				.catch(function(error) {
					
					$mctrl.get('Events').error(error, {module : 'vcomp', url : window.location.href});

				})
				.finally(function() {
					
				})
			;

		};

		_t.require_global = function(el, p, vnode, oldvnode) {
			//el.tagName el.textContent p.arg p.name p.modifiers p.value p.rawName
			//el.tagName.toLowerCase();
			//Vue.options.components[ el_tag ]
			//vnode.context.$forceUpdate();

			var c = vnode && vnode.context ? vnode.context : null;

			if(c) {
				
				var el_tag = el.tagName.toLowerCase();

				var path_arr = _t.buildPath(p.arg, p.modifiers);
				var path = path_arr.join('/');

				if(Vue.options.components[ el_tag ] || _t.__in_request[ path ]) {
					
					if(!_t.__in_request_cb[ path ]) {
						_t.__in_request_cb[ path ] = [];
					}

					_t.__in_request_cb[ path ].push(function(){
						if(!Vue.options.components[ el_tag ]) {
							Vue.component(el_tag, _t.getComponent(path_arr, {}));
						}
						c.$forceUpdate();
					});

					//return;

				} else if(_t.isComponent(path_arr)) {
					
					Vue.component(el_tag, _t.getComponent(path_arr, {}));

					c.$forceUpdate();

				} else {

					_t.__in_request[ path ] = true;
					_t.__in_request_cb[ path ] = [];

					var _p = {
						tag : el_tag,
						path : path,
						value : p.value,
						rawName : p.rawName,
					};
	
					_t.loadComponentByUrl(path, _p, function(created_elements){
	
						Vue.component(el_tag, _t.getComponent(path_arr, {}));

						_t.__in_request_cb[ path ].forEach(function(item){
							item();
						});
						_t.__in_request_cb[ path ] = [];
						_t.__in_request[ path ] = false;
	
						c.$forceUpdate();
	
					});

				}
				
			}

		};

		_t.require_local = function(el, p, vnode, oldvnode) {
			
			var c = vnode && vnode.context ? vnode.context : null;
			
			if(c) {
				
				var el_tag = el.tagName.toLowerCase();

				var path_arr = _t.buildPath(p.arg, p.modifiers);
				var path = path_arr.join('/');

				if(c.$options.components[el_tag] || _t.__in_request[ path ]) {
					
					if(!_t.__in_request_cb[ path ]) {
						_t.__in_request_cb[ path ] = [];
					}

					_t.__in_request_cb[ path ].push(function(){
						if(!c.$options.components[el_tag]) {
							c.$options.components[el_tag] = _t.getComponent(path_arr, {});
						}
						c.$forceUpdate();
					});
					
					//return;

				} else if(_t.isComponent(path_arr)) {
					
					c.$options.components[el_tag] = _t.getComponent(path_arr, {});

					c.$forceUpdate();

				} else {
					
					_t.__in_request[ path ] = true;
					_t.__in_request_cb[ path ] = [];

					var _p = {
						tag : el_tag,
						path : path,
						value : p.value,
						rawName : p.rawName,
					};
	
					_t.loadComponentByUrl(path, _p, function(created_elements){
	
						c.$options.components[el_tag] = _t.getComponent(path_arr, {});

						_t.__in_request_cb[ path ].forEach(function(item){
							item();
						});
						_t.__in_request_cb[ path ] = [];
						_t.__in_request[ path ] = false;
	
						c.$forceUpdate();
	
					});

				}

			}

		};

		_t.dev_test = function(el, p, vnode, oldvnode) {
			var ns = [p.arg];
			if(Object.keys(p.modifiers).length) {
				ns = ns.concat(Object.keys(p.modifiers));
			}
			el.innerHTML = ns.join('/');
		}

		return _t;

	}

	_.set('VComp', new __class__());
	
})(_);

/*

$mctrl.get('VComp').disableTagsForRequire({
	'require-global' : {
		'div' : true,
	},
});

_t.disableTagsForRequire = function(arr) {
	for(var d in arr) {
		if(!_t.__comps[ d ]) {
			_t.__comps[ d ] = {};
		}
		for(var i in arr[ d ]) {
			_t.__comps[ d ][ i ] = arr[ d ][ i ];
		}
	}
};

var _f = function(suffix){
	var _p = {
		url : el_tag + suffix,//'.js',
		params : _p,
	};
	return _t.apiInstance.request(_p);
}

var fnc_arr = [
	_f('.js'),
	_f('.html'),
	_f('.css'),
];

axios.all(fnc_arr)
	.then(axios.spread(function(js, html, css) {

		var b = document.body;//document.getElementsByTagName('head')[0];//
		
		var tpl = document.createElement('template');
		tpl.setAttribute('id', el_tag);
		tpl.innerHTML = html.data;
		b.appendChild(tpl);

		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.innerHTML = js.data;
		b.appendChild(script);

		var style = document.createElement('style');
		style.innerHTML = css.data;
		b.appendChild(style);

	}))
;
*/

/*
if(tn == 'script') {
	
	var script = document.createElement('script');
	//script.setAttribute('type', 'text/javascript');
	script.innerHTML = node.innerHTML.trim();
	b.appendChild(script);

} else {
	
	b.appendChild(node);

}

//var c = node.innerHTML.trim();
//var e = document.createElement(node.tagName.toLowerCase());
//e.innerHTML = c;
*/

/*
_t.apiInstance.request({
	url : el_tag + '.vue.html',
})
	.then(function(resp) {
		
		var tpl = document.createElement('div');
		tpl.innerHTML = resp.data;

		document.body.appendChild(tpl);

	})
	.catch(function(error) {
		
		console.error('vcomp', error);

	})
	.finally(function() {
		
	})
;

		var tpl = document.createElement('div');
		tpl.innerHTML = resp.data;

		document.body.appendChild(tpl);
*/