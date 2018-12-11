'use strict';

var $mctrl = new (function(){
	
	var ctrl = this;

	ctrl.__objects = {};
	
	ctrl.randstr = function(l) {
		return (Math.random().toString(l || 36).split('.'))[1];
	};

	ctrl.merge = function() {
		
		var o_type = typeof (new Object());
		var res = {};
		
		for(var i = 0; i < arguments.length; i++) {
			
			var o = arguments[i];
			
			if(typeof o == o_type) {
				for(var k in o) {
					try {
						if(typeof o[k] == o_type) {
							res[k] = ctrl.merge(res[k], o[k]);
						} else {
							res[k] = o[k];
						}
					} catch(e) {
						res[k] = o[k];
					}
				}
			}
			
		}
		
		return res;
		
	};

	ctrl.set = function(uid, o) {
		ctrl.__objects[uid] = o;
	};

	ctrl.get = function(uid) {
		return (ctrl.__objects[uid] ? ctrl.__objects[uid] : null);
	};
	
	return ctrl;
	
	
	/*
	ctrl.replace = function() {
		.replace(/[^0-9]/gim, '')
		.replace(/[«»\"\']/gim, '')
		str.split(search).join(replace)
		strMsg.replace(/<\/?p>/g, '')
	};

	
	function toAbsURL(s) {
		var l = location, h, p, f, i;
		if (/^\w+:/.test(s)) {
			return s;
		}
		h = l.protocol + '//' + l.host + (l.port!=''?(':' + l.port):'');
		if (s.indexOf('/') == 0) {
			return h + s;
		}
		p = l.pathname.replace(/\/[^\/]*$/, '');
		f = s.match(/\.\.\//g);
		if (f) {
			s = s.substring(f.length * 3);
			for (i = f.length; i--;) {
				p = p.substring(0, p.lastIndexOf('/'));
			}
		}
		return h + p + '/' + s;
	}
	var base = document.getElementsByTagName('base')[0];
	base.href = toAbsURL(base.href);

	*/

})();
