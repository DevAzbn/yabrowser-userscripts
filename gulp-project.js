'use strict';

module.exports = function(G, params) {

	var data = require('./data')(params);
	var webpack_config = require('./webpack.config.js');
	
	G.gulp.task('default', [
		'concat.jquery.plugin',
		'concat.jquery.event',
		'concat.jquery.main',
		'concat.vue.components',
		'concat.vue.html',
		'concat.less',
		//'webpack.vue',
		'html',
		'server',
		'dev',
	]);

	G.gulp.task('dev', [
		'html',
		'js.main',
		'less.main',
		'svg:sprite',
		//'webpack.vue',
		//'email',
	]);

	G.gulp.task('server', function(){

		G.browserSync.init({
			server : params.path.build.root,
			port : params.port,
			ui : {
				port : params.port + 1,
			}
		});

	});


	G.gulp.watch(params.path.src.page + '/**/*.html', ['html']);
	G.gulp.watch(params.path.src._ + '/**/*.html', ['html']);
	G.gulp.watch(params.path.src.block + '/**/*.vue.html', ['concat.vue.html']);
	
	//G.gulp.watch(params.path.src.webpack + '/**/*.js', ['webpack.vue']);
	//G.gulp.watch(params.path.src.webpack + '/**/*.vue', ['webpack.vue']);
	
	G.gulp.watch(params.path.src.js + '/**/*.js', ['js.main']);
	G.gulp.watch(params.path.src._ + '/**/*.js', ['js.main']);
	G.gulp.watch(params.path.src.block + '/**/*.plugin.js', ['concat.jquery.plugin']);
	G.gulp.watch(params.path.src.block + '/**/*.event.js', ['concat.jquery.event']);
	G.gulp.watch(params.path.src.block + '/**/*.main.js', ['concat.jquery.main']);
	G.gulp.watch(params.path.src.block + '/**/*.vue.js', ['concat.vue.components']);


	G.gulp.watch(params.path.src.common + '/**/*.less', ['less.main']); //+
	G.gulp.watch(params.path.src.less + '/**/*.less', ['less.main']);
	G.gulp.watch(params.path.src._ + '/**/*.less', ['less.main']);
	G.gulp.watch(params.path.src.block + '/**/*.less', ['concat.less']);
	G.svgmin && G.svgSprite && G.gulp.watch(params.path.src.svg + '/**/*.svg', ['svg:sprite']);//+
	
	G.gulp.task('html', function(){
		return G.gulp.src(params.path.src.page + '/**/*.html')
			.pipe(G.plumber())
			.pipe(G.pagebuilder2(params.path.root, data))
			.pipe(G.htmlmin({
				collapseWhitespace : true,
				removeComments : true,
			}))
			.pipe(G.gulp.dest(params.path.build.root))
			.pipe(G.browserSyncReload(params.browserSync))
		;
	});

	G.gulp.task('concat.vue.html', function(){
		return G.gulp.src(params.path.src.block + '/**/*.vue.html')
			.pipe(G.plumber())
			.pipe(G.pagebuilder2(params.path.root, data))
			.pipe(G.concat('concat.vue.html'))
			.pipe(G.gulp.dest(params.path.src._))
		;
	});


	G.gulp.task('js.main', function(){
		return G.gulp.src(params.path.src.js + '/**/*.js')
			.pipe(G.plumber())
			.pipe(G.pagebuilder2(params.path.root, data))
			.pipe(G.babel(params.babel))
			/*
			.pipe(G.webpack_stream({
				config : webpack_config,
			}, null, function(_err, _stats) {
				
			}))
			*/
			.pipe(G.uglify())
			.pipe(G.gulp.dest(params.path.build.js))
			.pipe(G.browserSyncReload(params.browserSync))
		;
	});

	G.gulp.task('concat.jquery.plugin', function(){
		return G.gulp.src(params.path.src.block + '/**/*.plugin.js')
			.pipe(G.plumber())
			.pipe(G.concat('concat.jquery.plugin.js'))
			.pipe(G.gulp.dest(params.path.src._))
		;
	});

	G.gulp.task('concat.jquery.event', function(){
		return G.gulp.src(params.path.src.block + '/**/*.event.js')
			.pipe(G.plumber())
			.pipe(G.concat('concat.jquery.event.js'))
			.pipe(G.gulp.dest(params.path.src._))
		;
	});

	G.gulp.task('concat.jquery.main', function(){
		return G.gulp.src(params.path.src.block + '/**/*.main.js')
			.pipe(G.plumber())
			.pipe(G.concat('concat.jquery.main.js'))
			.pipe(G.gulp.dest(params.path.src._))
		;
	});

	G.gulp.task('concat.vue.components', function(){
		return G.gulp.src(params.path.src.block + '/**/*.vue.js')
			.pipe(G.plumber())
			.pipe(G.concat('concat.vue.components.js'))
			.pipe(G.gulp.dest(params.path.src._))
		;
	});
	

	G.gulp.task('less.main', function(){
		return G.gulp.src(params.path.src.less + '/**/*.less')
			.pipe(G.plumber())
			.pipe(G.less())
			.pipe(G.autoprefixer({
				browsers : ['> 2% in RU', 'last 4 version', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
				cascade : true,
			}))
			.pipe(G.cleanCSS())
			//.pipe(minifyCss())
			.pipe(G.gulp.dest(params.path.build.css))
			.pipe(G.browserSyncReload(params.browserSync))
		;
	});

	G.gulp.task('concat.less', function(){
		return G.gulp.src(params.path.src.block + '/**/*.less')
			.pipe(G.plumber())
			.pipe(G.concat('concat.less'))
			//.pipe(G.cleanCSS())
			.pipe(G.gulp.dest(params.path.src._))
		;
	});
	
	G.svgmin && G.svgSprite && G.gulp.task('svg:sprite', function () {
		return G.gulp.src(params.path.src.svg + '/**/*.svg')
		// minify svg
			.pipe(G.svgmin({
				js2svg: {pretty: true}
			}))
			// remove all fill, style and stroke declarations in out shapes
			.pipe(G.cheerio({
				run: function ($) {
					//$('[fill]').removeAttr('fill');
					//$('[stroke]').removeAttr('stroke');
					$('[style]').removeAttr('style');
					$('[id]').removeAttr('id');
					$('[class]').removeAttr('class');
				},
				parserOptions: {xmlMode: true}
			}))
			// cheerio plugin create unnecessary string '&gt;', so replace it.
			.pipe(G.replace('&gt;', '>'))
			// build svg sprite
			.pipe(G.svgSprite({
				mode: {
					symbol: {
						/*sprite: params.path.build.svg+"/sprite.svg",
						render: {
							less: {
								dest: params.path.src.less + "/sprite.less",
								template: params.path.src.less + "/sprite_template.css"
							}

						}*/
						sprite: "../sprite.svg",
						render: {
							less: {
								dest: "../../../../src/common/sprite.less",
								template: params.path.src.common + "/sprite_template.less"
							}

						}
					}
				}
			}))
			.pipe(G.gulp.dest(params.path.build.svg));
	}) ? null : G.gulp.task('svg:sprite', function () {return null;});
	//
	//G.gulp.task('webpack.vue', function(){
	//	return G.gulp.src(params.path.src.webpack + '/**/*.js')
	//		.pipe(G.plumber())
	//		.pipe(G.webpack_stream({
	//			config : webpack_config,
	//		}, G.webpack, function(_err, _stats) {
	//			
	//		}))
	//		.pipe(G.babel(params.babel))
	//		.pipe(G.uglify())
	//		.pipe(G.gulp.dest(params.path.build.js))
	//		.pipe(G.browserSyncReload(params.browserSync))
	//	;
	//});
	//
	
}