
Vue.component('me-access', {
	
	template : '#me-access',

	mixins : [
		vueMixins.common,
		vueMixins.auth,
	],

	props : [
		
	],
	
	data : function () {
		return {
			levels : [],
			flags : {
				
			},
		};
	},

	computed : {

		accesses : function() {
			//refactor
			var _t = this;
			var _s = _t.$store;

			var res = {};

			_t.levels = [];

			var access = _s.getters.getSession().profile.access;

			for(var level in access) {

				var level_id = _t.levels.push(level);

				var classes = access[level];

				for(var entity_class in classes) {

					var entity_ids = classes[entity_class];

					if(entity_ids.length) {
						
						if(!res[entity_class]) {
							res[entity_class] = {};
						}

						if(!res[entity_class][level_id]) {
							res[entity_class][level_id] = [];
						}

						res[entity_class][level_id] = entity_ids;

					}

				}

			}

			return res;

		},

	},
	
});

vueRoutes.push({
	path : "/me/access/",
	component : Vue.options.components['me-access'],
	page : {
		title : '',
	},
});

