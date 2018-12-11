'use strict';

(function(_){
	
	function __class__() {
		
		var _t = this;

		_t.getClassName = function() {
			//return this.constructor.toString().match(/function ([^(]*)\(/)[1];
			return 'Debug';
		}

		_t.ed = function(v, not_format) {
			if(not_format) {
				return JSON.stringify(v);
			} else {
				return JSON.stringify(v, null, '	');
			}
		}



		_t.getStack = function() {

			var stack;
			
			try {
				throw Exception();
			} catch(e) {
				stack = e.stack.split(/\n/g);
			}
			
			/* exp msg */
			//stack.shift();

			return stack.map(function(s) {
				return s.trim();
			});

		}

		_t.getTrace = function() {
			
			var stack;
			
			try {
				throw Exception();
			} catch(e) {
				stack = e.stack.split(/\n/g);
			}
			
			/* exp msg */
			stack.shift();
			
			return stack.map(function(s) {
				
				var row = s.replace(/^\s*at\s+/,''), m;
				
				if( m = row.match(/([^\s\(]+) \(([^:]+):(\d+):(\d+)\)/) ) {
					return {funcName:m[1],filePath:m[2],strNum:m[3],colNum:m[4]}
				} else if( m = row.match(/([^:]+):(\d+):(\d+)/) ) {
					return {filePath:m[1],strNum:m[2],colNum:m[3]}
				} else {
					return null;
				}
					
			});

		};

		_t.getFuncName = function(stack) {

			var res = null;

			if(stack && stack[1]) {

				res = stack[1].funcName ? stack[1].funcName : null;

				if(res) {

					var _res = res.split('.');

					if(_res[1]) {

						res = _res[1];

					}

				}

			}

			return res;

		};



		return _t;

	}
	
	_.set('Debug', new __class__());
	
})(_);