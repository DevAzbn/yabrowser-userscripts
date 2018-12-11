
Vue.component('common-header', {
 
	template : '#common-header',

	mixins : [
		vueMixins.common,
	],
	
	props : [
		
	],
	
	data : function () {
		return {
			buttonActive : false,
			session : this.$store.getters.getSession(),
		};
	},
	methods : {

		logOut : function() {

			var _t = this;
			var _s = _t.$store;
			var _r = _t.$router;

			$mctrl.get('Api').call('Session/Logout', null, null, function(err, resp, meta){
				
				_t.$store.dispatch('setSession', {profile:null});

				if(!_s.getters.getFlag('isAuth')) {

					_r.push('/public/login/');
	
				}

			});

		},
		hamb : function() {
			var _t = this;
			_t.$store.commit('setFlag', {
				menuOpen : !_t.$store.getters.getFlag('menuOpen'),
			});
			_t.buttonActive = !_t.buttonActive;
		},
		
		changeNearStranger : function() {

			var _t = this;

			_t.$store.commit('setFlag', {
				nearStranger : !_t.$store.getters.getFlag('nearStranger'),
			});
			
			$mctrl.get('Api').call('Runtime/Profile/NearStranger', {
				near : _t.$store.getters.getFlag('nearStranger') ? 1 : 0,
			}, null, function(err, resp, meta){
				
			});

		},
	},
	computed : {

		photo_path : function() {

			var res = null;

			var _api = $mctrl.get('Api').getApiParams();

			var _t = this;
			var _s = _t.$store;

			//
			//if(_t.photo && _t.photo.item && _t.photo.item.id) {
			if(_s.state.session && _s.state.session.photo && _s.state.session.photo.item && _s.state.session.photo.item.id) {
				if(_s.state.session.photo.item.path != '') {
					res = _api.url.upload + _s.state.session.photo.item.path;
				}
			}

			return res;

		},

	},
});