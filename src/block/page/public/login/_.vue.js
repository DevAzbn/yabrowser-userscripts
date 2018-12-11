
Vue.component('public-login', {
	
	template : '#public-login',

	mixins : [
		vueMixins.common,
		vueMixins.public,
	],

	props : [
		
	],

	inject : [
		
	],

	created : function() {

		var _t = this;
		var _s = _t.$store;
		var _r = _t.$router;

		if(_s.getters.getFlag('isAuth')) {

			_r.push('/');

		}

	},
	
	data : function () {
		return {
			form : {
				login : '',
				pass : '',
			},
			flags : {
				errors : {
					empty_login : false,
					empty_pass : false,
					wrong_access : false,
				},
				states : {
					in_process : false,
				},
			},
		}
	},
	
	methods : {
		
		sendForm : function(event) {
			//refactor
			//_t.$els.custom.submit();
			
			var _t = this;
			
			_t.flags.errors.empty_login = false;
			_t.flags.errors.empty_pass = false;
			_t.flags.errors.wrong_access = false;
			
			if(!_t.form.login || _t.form.login == '') {
				
				_t.flags.errors.empty_login = true;
				
			}
			if(!_t.form.pass || _t.form.pass == '') {
					
				_t.flags.errors.empty_pass = true;
				
			}
			
			if(!_t.flags.errors.empty_login && !_t.flags.errors.empty_pass) {
				
				var _t = _t;
				
				var p = {
					login : _t.form.login,
					pass : _t.form.pass,
				};

				_t.flags.states.in_process = true;
				
				$mctrl.get('Api').call('Session/Login', p, null, function(err, resp, meta){
					
					_t.flags.states.in_process = false;
					
					if(resp && resp.profile && resp.profile.item && resp.profile.item.id) {
						
						$mctrl.get('vueApp').$store.dispatch('setSession', resp);

					} else {
						
						_t.flags.errors.wrong_access = true;

						_t.form.pass = '';
						
						$mctrl.get('Events').log({
							'wrong_access' : p,
						}, _t);
						
					}
					
				});
				
			}
			
		},
		
	}
	
});

vueRoutes.push({
	path : "/public/login/",
	component : Vue.options.components['public-login'],
	page : {
		title : '',
	},
});