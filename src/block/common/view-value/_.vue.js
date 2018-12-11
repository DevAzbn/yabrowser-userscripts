Vue.component('view-value', {
	
	mixins : [
		vueMixins.common,
	],

	props : [
		'template',
		'value',
	],

	inject : [
		'getContext',
		'getContainer',
	],

	data : function () {
		return {
			
			flags : {
				
			},

		}
	},

	created : function() {
			
		var _t = this;

		if(!_t.template) {
			_t.template = 'string--default';
		}

		_t.$options.template = '#' + _t.$options.name + '__' + _t.template;

	},

	filters: {

		string__default : function(v) {
			if (typeof v == 'undefined') {
				return '';
			}
			return v;
		},

		string__pass : function(v) {
			return '*****';
		},

		/*
		string__phone : function(v) {
			if (typeof v == 'undefined') {
				return '';
			}
			var _v = v.split('');
			return `+${_v[0]} (${_v[1]}${_v[2]}${_v[3]}) ${_v[4]$}{_v[5]}${_v[6]}-${_v[7]}${_v[8]}-${_v[9]}${_v[10]}`;
		},
		*/
		
		number__datetime : function(v) {
			if (typeof v == 'undefined') {
				return '';
			}
			v = parseInt(v);
			var d = new Date(v * 1000);
			return [
				d.toLocaleDateString(),
				d.toLocaleTimeString(),
			].join(' ');
		},

		number__pos : function(v) {
			if (typeof v == 'undefined') {
				return '';
			}
			return Math.ceil((v / 9223372036854775807) * 100);
		},

	},

});
