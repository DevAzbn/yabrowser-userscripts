'use strict';

(function(_){
	
	function __class__(ns) {
		
		var prop = ns + 'Storage';

		var o = null;

		if(ns && ns != '' && prop in window) {

			var s = window[prop];
			
			o = {
				
				__prefix : 'crm.',

				__modUid : function(uid) {
					return o.__prefix + uid;
				},

				set : function(uid, value) {
					s.setItem(o.__modUid(uid), JSON.stringify(value));
				},

				get : function(uid, def) {
					var item = s.getItem(o.__modUid(uid));
					if(typeof item !== 'undefined' && item != null) {
						return JSON.parse(item);
					} else {
						return def;
					}
				},

				remove : function(uid) {
					s.removeItem(o.__modUid(uid));
				},

				clear : function() {
					s.clear();
				},

			}
		
		} else {

			o = {
			
				get : function(uid, def) {
					
					def = def || null;

					var matches = document.cookie.match(new RegExp(
						'(?:^|; )' + uid.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
					));

					return matches ? decodeURIComponent(matches[1]) : def;

				},
				
				set : function(uid, value, options) {
					
					options = options || {};
		
					if(!options.path) {
						options.path = '/';
					}
		
					//if(!options.domain) {
					//	options.domain = '.' + window.location.hostname;
					//}
					
					var expires = options.expires;
					
					if (expires && typeof expires == 'number') {
						var d = new Date();
						d.setTime(d.getTime() + expires * 1000);
						expires = options.expires = d;
					}
		
					if (expires && expires.toUTCString) {
						options.expires = expires.toUTCString();
					}
					
					value = encodeURIComponent(value);
					
					var updatedCookie = uid + '=' + value;
					
					for (var propName in options) {
						updatedCookie += '; ' + propName;
						var propValue = options[propName];
						if (propValue !== true) {
							updatedCookie += '=' + propValue;
						}
					}
					
					document.cookie = updatedCookie;

				},
				
				remove : function(uid) {
					o.set(uid, '', {
						expires : (-1).toUTCString(),
					});
				},
		
				clear : function() {
					
					var cookies = document.cookie.split(";");

					for (var i = 0; i < cookies.length; i++) {
						var cookie = cookies[i];
						var eqPos = cookie.indexOf("=");
						var uid = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
						document.cookie = uid + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
					}

				},
				
			}

		}

		return o;

	}
	
	__class__.prototype.getClassName = function() {
		//return this.constructor.toString().match(/function ([^(]*)\(/)[1];
		return 'Storage';
	}

	_.get('Classes').setClass(__class__.prototype.getClassName(), __class__);
	
})(_);