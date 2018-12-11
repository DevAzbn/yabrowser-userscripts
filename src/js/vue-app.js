'use strict';

Vue.config.silent = false;
Vue.config.productionTip = false;
Vue.config.devtools = true;

//Vue.config.errorHandler = function (err, vm, info) {
//	$mctrl.get('Events').error(err, info);
//};

//Vue.config.warnHandler = Vue.config.errorHandler;

$mctrl.set('vueApp', new Vue({
	
	el : '#vueApp',
	
	template : '#vueApp-template',

	replace : true,

	data : {
		
	},

	store : new Vuex.Store({
		modules : vuexModules,
		strict : $mctrl.get('isDev'),
	}),

	router : new VueRouter({
		routes : vueRoutes,
	}),

	created : function() {

		var _t = this;

		//refactor
		$mctrl.get('aCRM').loadSession(function(){
			
			_t.$store.commit('setFlag', {
				isLoading : false,
			});

			$mctrl.get('aCRM').loadEntityClasses(function(classes){
				
				_t.$store.commit('setFlag', {
					classesLoaded : true,
				});

				$mctrl.get('aCRM').sessionUpdater();

			});

		});

	},

	watch : {

		'$route' : function(n, o) {
			$mctrl.get('Events').log({
				url_changed : [
					n, o
				],
			}, this);
		},

	}
	
}));

/*
mergeObjects : function() {
	
	var res = {};
	
	for(var i = 0; i < arguments.length; i++) {
		
		var o = arguments[i];
		
		for(var k in o) {
			try {
				if(o.constructor == Object) {
					res[k] = this.mergeObjects(res[k], o[k]);
				} else {
					res[k] = o[k];
				}
			} catch(e) {
				res[k] = o[k];
			}
		}
		
	}
	
	return res;
	
},

getParam : function(uid) {

	uid = uid || 'id';

	var res = null;
	var s_arr = window.location.search;

	if(s_arr && s_arr != '') {
		s_arr = s_arr.split('?');
		if(s_arr[1]) {
			s_arr = s_arr[1].split('&');
			if(s_arr && s_arr.length) {
				for(var i = 0; i < s_arr.length; i++) {
					var item = s_arr[i];
					var item_arr = item.split('=');
					if(item_arr[0] && item_arr[1]) {
						if(item_arr[0] == uid) {
							res = item_arr[1];
						}
					}
				}
			}
		}
	}

	return res;

},

hasAccess : function() {
	var res = false;
	if($mctrl.get('Session').isAuth()) {
		res = true;
	}
	return res;
},
*/