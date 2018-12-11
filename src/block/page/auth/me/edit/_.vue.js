
Vue.component('me-edit', {
	
	template : '#me-edit',

	mixins : [
		vueMixins.common,
		vueMixins.auth,
	],

	props : [
		
	],
	
	data : function () {
		return {
			namespace : $mctrl.randstr(),//'profile',
			multiple : false,
			flags : {
				
			},
		};
	},

	created : function() {

		var _t = this;
		var _s = _t.$store;

	},

	methods : {

		uploadPhoto : function(event) {

			var _t = this;
			var _s = _t.$store.dispatch('uploadFile', {
				namespace : _t.namespace,
				multiple : _t.multiple,
				cb : function(err, resp, meta) {

					if(resp && resp[_t.namespace] ) {
						
						if(resp[_t.namespace] && resp[_t.namespace].length) {

							var item = resp[_t.namespace][0];
							
							if(item && item.item && item.item.id) {
								
								_t.photo = item;

								$mctrl.get('Api').call('Session/Update/Photo', {
									item : {
										id : item.item.id
									}
								}, {

								}, function(_err, _resp, _meta) {

									//console.dir(_resp);
									//_s.dispatch('setSessionPhoto', item);
									//$mctrl.get('aCRM').sessionUpdater();
									$mctrl.get('vueApp').$store.dispatch('setSession', _resp);

								});

							}

						}

					}

				},
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

vueRoutes.push({
	path : "/me/edit/",
	component : Vue.options.components['me-edit'],
	page : {
		title : '',
	},
});

