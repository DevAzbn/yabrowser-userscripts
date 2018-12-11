
Vue.component('auth-admin-profiles-items', {
	
	template : '#auth-admin-profiles-items',

	mixins : [
		vueMixins.common,
		vueMixins.auth,
	],

	props : [
		
	],

	inject : [
		
	],
	
	data : function () {
		return {
			entity_class_str : 'Common\\Entity\\Profile',
			
			entity_class_id : 0,
			entity_class : {},

			fields : {},
			items : [],

			pagination : {
				page : 1,
				start : 1,
				size : 50,
				amount : 0,
			},
			order_by : {
				id : 'ASC',
			},
			where : {
				item : {
					//collection : "= 'incoming_req_region'",
				},
				data : {

				},
			},
			
			flags : {
				
			},
		};
	},
	
	created : function() {
		
		var _t = this;

		//_t.entity_class_str = _t.$route.query && _t.$route.query.entity_class ? _t.$route.query.entity_class : null;
		_t.pagination.page = parseInt(_t.$route.query.page || _t.pagination.start);

		if(_t.entity_class_str) {

			$mctrl.get('aCRM').loadEntityClasses(function(classes){
				
				_t.entity_class = classes[_t.entity_class_str];
				_t.fields = _t.entity_class.fields;

				_t.loadItems();
				
			});

		}
		
	},
	
	methods : {

		loadItems : function() {
			
			var _t = this;

			var p = {
				/*
				entity_class : {
					id : _id,
				},
				*/
				pagination : _t.pagination,
				order_by : _t.order_by,
				where : _t.where,
			};

			$mctrl.get('aCRM').loadItems(_t.entity_class_str, p, function(err, resp, meta){
				_t.items = resp;
				_t.pagination = meta.pagination;
			});

		},
		
	},

	watch : {

		'$route' : function(n, o) {
			var _t = this;
			_t.pagination.page = parseInt(n.query.page || _t.pagination.start);
			_t.loadItems();
		},

	},
	
});

vueRoutes.push({
	path : "/auth/admin/profiles/items/",
	component : Vue.options.components['auth-admin-profiles-items'],
	page : {
		title : '',
	},
});
