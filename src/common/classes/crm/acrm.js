'use strict';

(function(_){
	
	function __class__() {

		var _t = this;

		_t.__classes = null;

		_t.__entities = {};

		_t.__intervals = {
			loadSession : null,
		};

		_t.getClassName = function() {
			return 'aCRM';
		};

		_t.getDefaultEntityClass = function() {
			return 'Common\\Entity';
		}

		_t.loadEntityClasses = function(cb) {
			
			var _s = _.get('SS');
	
			if(_t.__classes && Object.keys(_t.__classes).length) {
	
				cb && cb(_t.__classes);
			
			} else {
	
				var items = _s.get('classes');
	
				if(items && Object.keys(items).length) {
					
					_t.__classes = items;
	
					cb && cb(_t.__classes);
	
				} else {
	
					_.get('Api').call('Entity/Classes', null, null, function(err, resp, meta){
						
						if(err) {
							_.get('Events').error(err, {module : _t.getClassName(), url : window.location.href});
						}
	
						_t.__classes = {};
						
						for(var i in resp) {
							var ec = resp[i].entity_class;
							_t.__classes[ ec ] = resp[i];
							_t.__entities[ ec ] = {};
						}
		
						_s.set('classes', _t.__classes);
		
						cb && cb(_t.__classes);
						
					});
	
				}
			
			}
			
		};

		_t.loadSession = function(cb) {
	
			_.get('Api').call('Session/Get', null, null, function(err, resp, meta){
				
				if(err) {
					_.get('Events').error(err, {module : _t.getClassName(), url : window.location.href});
				}

				_.get('vueApp').$store.dispatch('setSession', resp);

				if(resp && resp.profile && resp.profile.item && resp.profile.item.photo_id) {

					_t.getFileInfo(resp.profile.item.photo_id, function(_err, _resp, _meta){

						_.get('vueApp').$store.dispatch('setSessionPhoto', _resp);

					});

				}
	
				cb && cb(err, resp, meta);
				
			});
	
		};

		_t.sessionUpdater = function(v) {
		
			v = v || 4000;
	
			_t.clearSessionUpdater();
	
			_t.__intervals.loadSession = setInterval(_t.loadSession, v);
	
		};

		_t.clearSessionUpdater = function() {
			
			if(_t.__intervals.loadSession) {
				
				clearInterval(_t.__intervals.loadSession);

			}

		};

		_t.initEntity = function(ec, item, cb) {
			
			var e = null;
			
			var ec = _.get('Classes').getClass(ec);
			
			if(ec) {
				
				e = new ec(item);
				
				cb && cb(e);
				
			} else {
				
				ec = _.get('Classes').getClass(_t.getDefaultEntityClass());
				
				e = new ec(item);
				
				cb && cb(e);
				
			}
	
			return e;
			
		};

		_t.buildEntity = function(c) {

			var _c = _.get('Classes').getClass(c);

			if(_c) {
				
			} else {

				_c = _.get('Classes').getClass(_t.getDefaultEntityClass());

			}

			return new (_c)();

		};

		_t.loadEntity = function(ec, item, cb) {
					
			if(_t.__classes[ ec ]) {
				
				if(item && item.id && _t.__entities[ ec ] && _t.__entities[ ec ][ item.id ]) {
					
					cb(_t.__entities[ ec ][ item.id ]);
					
				} else {
					
					_.get('Api').call('Entity/Item', {
						entity_class : {
							id : _t.__classes[ ec ].id,
							//entity_class : _t.__classes[ ec ].entity_class,
						},
						item : item,
					}, null, function(err, resp, meta){
						
						if(err) {
							_.get('Events').error(err, {module : _t.getClassName(), url : window.location.href});
						}
	
						if(resp && resp.item && resp.item.id) {
							
							var _ec = _.get('Classes').getClass(ec);
	
							if(!_t.__entities[ ec ]) {
								_t.__entities[ ec ] = {}
							}
							
							if(_ec) {
								
								_t.__entities[ ec ][ resp.item.id ] = new _ec(resp);
								
								cb(_t.__entities[ ec ][ resp.item.id ]);
								
							} else {
								
								_ec = _.get('Classes').getClass(_t.getDefaultEntityClass());
								
								_t.__entities[ ec ][ resp.item.id ] = new _ec(resp);
								
								_t.__entities[ ec ][ resp.item.id ].mergeEntityClass(_t.__classes[ ec ]);
								
								cb(_t.__entities[ ec ][ resp.item.id ]);
								
							}
							
						} else {
							
							//cb_err && cb_err(err);
							console.log('wrong response', arguments);
							
						}
						
					});
					
				}
				
			} else {
				
				console.error('Not founded class', ec);
				
			}
			
		};

		_t.loadEntities = function(ec, prm, cb) {
			
			if(_t.__classes[ ec ]) {
				
				var p = {
					entity_class : {
						id : _t.__classes[ ec ].id,
					},
				};
	
				if(prm.pagination) {
					p.pagination = prm.pagination;
				}
	
				if(prm.order_by) {
					p.order_by = prm.order_by;
				}
	
				if(prm.where) {
					p.where = prm.where;
				}
	
				_.get('Api').call('Entity/Items', p, null, function(err, resp, meta){
					
					if(err) {
						_.get('Events').error(err, {module : _t.getClassName(), url : window.location.href});
					}
	
					cb && cb(err, resp, meta);
	
				});
				
			} else {
				
				console.error('Not founded class', ec);
				
			}
	
		};

		_t.logEvent = function(event, context) {

			_.get('Api').call('Log/Event', event, null, function(err, resp, meta){
				
				if(err) {
					_.get('Events').error(err, {module : _t.getClassName(), url : window.location.href});
				}
				
				console.debug(resp);
				
			});
	
		};

		_t.getFileInfo = function(file_id, cb) {

			if(file_id) {

				_.get('Api').call('Common/File/Get', {
					entity_class : {
						entity_class : 'Common\\Entity\\File',
					},
					item : {
						id : file_id
					},
				}, null, function(err, resp, meta){
				
					if(err) {
						
						_.get('Events').error(err, {module : _t.getClassName(), url : window.location.href});

					} else {

						cb && cb(err, resp, meta);
						
					}
					
				});

			}

		};

		return _t;

	};

	_.set('aCRM', new __class__());
	
})(_);

/*
_t.hasAccess = function(level, entity_class, entity_id) {

			var res = false;
	
			if(level && entity_class) {
				if(_t.__session && _t.__session.profile && _t.__session.profile.access) {
					if(_t.__session.profile.access[level] && _t.__session.profile.access[level][entity_class]) {
						
						if(typeof entity_id == 'undefined') {
							
							entity_id = 0;
	
						}
	
						res = (_t.__session.profile.access[level][entity_class].indexOf('' + entity_id) > -1) ? true : false;
	
						res = res || ((_t.__session.profile.access[level][entity_class].indexOf('' + 0) > -1) ? true : false);
	
					}
				}
			}
	
			return res;
	
		}

		_t.state = function(k, v) {

			if(k) {
				
				if(!(k in _t.__state)) {
					
					Vue && Vue.set(_t.__state, k, null);

				}
				
				if(typeof k == typeof (new Object())) {

					_t.__state = k;

				} else if(typeof v != 'undefined') {
	
					_t.__state[k] = v;
	
				}
	
				return _t.__state[k];
	
			} else {
	
				return _t.__state;
	
			}
	
		}
*/