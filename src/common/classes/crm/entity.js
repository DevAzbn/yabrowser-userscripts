'use strict';

(function(_){
	

	function __class__(data) {
		
		this.__data = {
			item : {},
			data : {},
		};
		
		this.setChanges(data);
		
		this.__entity_class = __class__.prototype.__entity_class;
		
	}
	

	__class__.prototype = Object.create(_.get('Classes').getClass('Abstract').prototype);
	__class__.prototype.constructor = __class__;
	

	__class__.prototype.__entity_class = {
		id : 0,
		entity_class : _.get('aCRM').getDefaultEntityClass(),
	};
	

	__class__.prototype.getClass = function(k) {
		
		if(this.__entity_class && k in this.__entity_class) {
			
			return this.__entity_class[k];

		} else {
			
			return this.__entity_class;

		}

	};


	__class__.prototype.getClassName = function() {
		return this.getClass('entity_class');
	}
	

	__class__.prototype.mergeEntityClass = function(ec) {
		
		this.__entity_class = ec;

	};
	
	
	__class__.prototype.setChanges = function(o) {
		
		if(o) {
			
			for(var i in o) {
				for(var j in o[i]) {
					
					if(typeof this.__data[i] == 'undefined') {
						this.__data[i] = {};
					}

					if(typeof this.__data[i][j] == 'undefined') {
						this.__data[i][j] = {};
					}

					this.__data[i][j] = o[i][j];
					
				}
			}
			
		}
		
	}
	

	__class__.prototype.saveChanges = function(o, cb) {
		
		this.setChanges(o);
		
		this.save(cb);
		
	};
	

	__class__.prototype.item = function(k, v) {
		
		if(k) {
			
			if(typeof k == typeof (new Object())) {
				
				this.setChanges({
					item : k,
				});
				
			} else if(typeof v != 'undefined') {
				
				this.__data.item[k] = v;
				
			}
			
			return this.__data.item[k];
			
		} else {
			
			return this.__data.item;
			
		}
		
	};
	

	__class__.prototype.data = function(k, v) {
		
		if(k) {
			
			if(typeof k == typeof (new Object())) {
				
				this.setChanges({
					data : k,
				});
				
			} else if(typeof v != 'undefined') {
				
				this.__data.data[k] = v;
				
			}
			
			return this.__data.data[k];
			
		} else {
			
			return this.__data.data;
			
		}
		
	};


	__class__.prototype.load = function(item, cb) {

		var _t = this;

		$mctrl.get('Api').call('Entity/Item', {
			entity_class : {
				id : this.getClass('id'),
			},
			item : item,
		}, null, function(err, resp, meta){
			
			if(err) {
				
				$mctrl.get('Events').error(err, {module : _t.getClassName(), url : window.location.href});

			}

			if(resp && resp.item && resp.item.id) {
				
				_t.setChanges(resp);

				cb && cb(_t);
				
			} else {
				
				console.log('wrong response', arguments);
				
			}
			
		});

	}
	

	__class__.prototype.save = function(cb) {
		
		var _t = this;
		
		var _p = {
			entity_class : {
				id : _t.__entity_class.id,
				entity_class : _t.__entity_class.entity_class,
			},
			item : _t.item(),
			data : _t.data(),
		};
		
		var method = 'Entity/Create';
		
		if(_t.item('id')) {
			
			method = 'Entity/Update';
			
		}
		
		$mctrl.get('Api').call(method, _p, null, function(err, resp, meta){
			
			if(err) {
				$mctrl.get('Events').error(err, {module : this.getClass('entity_class'), url : window.location.href});
			}

			_t.__data = resp;
			
			cb && cb(_t);
			
		});
		
	};
	

	__class__.prototype.update = function(o, cb) {
		
		var _t = this;
		
		var _p = {
			entity_class : {
				id : _t.__entity_class.id,
				entity_class : _t.__entity_class.entity_class,
			},
			item : {},
			data : {},
		};
		
		if(o) {
			
			for(var i in o) {
				
				if(!_p[i]) {
					_p[i] = {};
				}
				
				for(var j in o[i]) {
					
					_p[i][j] = o[i][j];
					
				}
			}
			
		}
		
		var method = 'Entity/Update';
		
		if(_t.item('id')) {
			
			_p.item.id = _t.item('id');
			
			$mctrl.get('Api').call(method, _p, null, function(err, resp, meta){
				
				if(err) {
					$mctrl.get('Events').error(err, {module : this.getClass('entity_class'), url : window.location.href});
				}

				_t.__data = resp;
				
				cb && cb(_t);
				
			});
			
		}
		
	};


	__class__.prototype.remove = function(cb) {
		//console.dir( $mctrl.get('Debug').getFuncName($mctrl.get('Debug').getTrace()) );
		//console.dir( $mctrl.get('Debug').getStack() );

	};


	__class__.prototype.state = function(cb) {

	};


	__class__.prototype.instate = function(cb) {

	};
	

	__class__.prototype.bound = function(cb) {

	};
	

	__class__.prototype.unbound = function(cb) {

	};
	

	__class__.prototype.bounded = function(cb) {

	};
	

	__class__.prototype.tied = function(cb) {

	};
	

	__class__.prototype.getOpenedStates = function(cb) {

	};
	

	__class__.prototype.getBoundsWith = function(cb) {

	};
	

	__class__.prototype.getStateHistory = function(cb) {

	};
	

	__class__.prototype.toPublicJSON = function() {
		
		return this.__data;

	};
	

	_.get('Classes').setClass(__class__.prototype.getClass('entity_class'), __class__);
	
	
})(_);
