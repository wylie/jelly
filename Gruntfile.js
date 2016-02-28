module.exports = function(grunt) {

	// project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		express: {
			server: {
				options: {
					port: 8010,
					host: 'http://localhost',
					bases: 'dist/example/'
				}
			}
		},

		less: {
			dev: {
				files: {
					'dist/css/jam.css': 'dev/less/jam.less',
					'dist/example/jam.css': 'dev/less/jam.less'
				}
			}
		},

		copy: {
			html: {
				files: [
					{
						expand: true,
						src: 'dev/example/*.html',
						dest: 'dist/example/',
						flatten: true,
						filter: 'isFile'
					}
				]
			}
		},

		watch: {
			less: {
				files: ['dev/less/*.less'],
				tasks: ['less']
			},
			html: {
				files: ['dev/example/*.html'],
				tasks: ['copy:html']
			}
		}

	});

	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'build',
		'server'
	]);

	grunt.registerTask('build', [
		'copy',
		'less'
	]);

	grunt.registerTask('server', [
		'express',
		'watch',
		'less',
		'express-keepalive'
	]);

};
