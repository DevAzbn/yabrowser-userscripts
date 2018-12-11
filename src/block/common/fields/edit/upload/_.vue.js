
Vue.component('field-edit__upload', {
	
	template : '#field-edit__upload',

	mixins : [
		vueMixins.common,
	],

	props : [
		
		'namespace',
		'multiple',
	],

	inject : [
		
	],
	
	data : function () {
		return {
			items : [],
			flags : {
				in_process : false,
			},
		}
	},
	
	methods : {
		
		upload : function(event) {

			var _t = this;
			var _e = event;

			if(_e) {
				
				$mctrl.get('Api').upload('Upload/Multiple', _e.target.files, {
					namespace : _t.namespace,
				}, function(err, resp, meta){
					
					if(err) {
						console.dir(err);
						return;
					}

					//console.dir(resp);

					if(resp && resp[ _t.namespace ] && resp[ _t.namespace ].length) {
						for(var i = 0; i < resp[ _t.namespace ].length; i++) {
							_t.items.push(resp[ _t.namespace ][ i ]);
						}
					}

				}, function(percent) {
					
					//console.log('uploading percent', percent);

				});

			}

		},
		
	}
	
});