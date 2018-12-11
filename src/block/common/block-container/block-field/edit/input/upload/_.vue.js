Vue.component('block-field__edit__input--upload', {
	
	mixins : [
		vueMixins.common,
		vueMixins.block_container__block_field__edit,
	],

	data : function() {
		return {
			upload : {
				items : [],
			},
		};
	},

	methods : {
		
		fileUpload__afterSelect : function(event) {

			var _t = this;
			var _e = event;

			if(_e) {
				
				$mctrl.get('Api').upload('Upload/Multiple', _e.target.files, {
					namespace : _t.params.ns.upload,
				}, function(err, resp, meta){
					
					if(err) {
						console.dir(err);
						return;
					}

					if(resp && resp[ _t.params.ns.upload ] && resp[ _t.params.ns.upload ].length) {
						for(var i = 0; i < resp[ _t.params.ns.upload ].length; i++) {
							_t.upload.items.push(resp[ _t.params.ns.upload ][ i ]);
						}
					}

				}, function(percent) {
					
					//console.log('uploading percent', percent);

				});

			}

		},


		
	},

});
