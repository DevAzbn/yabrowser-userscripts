'use strict';

(function(_){
	
	function __class__() {
		
		var _t = this;

		_t.getClassName = function() {
			return 'Events';
		}

		_t.log = function(data, context) {
			console.log(new Date().getTime(), data);
		}

		_t.error = function(err, data) {
			_.get('vueApp') ? _.get('vueApp').$store.commit('saveError', {
				error : err,
				data : data,
			}) : console.error({
				error : err,
				data : data,
			});
		}

		return _t;

	}
	
	_.set('Events', new __class__());
	
})(_);
