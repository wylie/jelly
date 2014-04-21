module.exports = function(grunt) {

	// project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		express: {
			rel: {
				options: {
					port: 3000
				}
			}
		},

		shell: {
			start: {
				command: './start.sh',
				options: {
					stdout: true,
					stderr: true,
					failOnError: true
				}
			},
			clean: {
				command: [
	                'rm -rf node_modules dist',
	                'npm cache clean',
	                'npm install',
	                'bower install',
	                'grunt build'
	            ].join('&&'),
				options: {
					stdout: true,
					stderr: true,
					failOnError: true
				}
			}
		},

		sass: {
			dev: {
				options: {
					outputStyle: 'nested'
				},
				files: {
					"jam.scss": "sass/jam.scss",
					"jam.css": "sass/jam.scss"
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					"jam.min.scss": "sass/jam.scss",
					"jam.min.css": "sass/jam.scss"
				}
			}
		},

		watch: {
			files: ['sass/*.scss','Gruntfile.js'],
			tasks: ['sass']
		}

	});

	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask('start', [
		'shell:start'
	]);

	grunt.registerTask('clean', [
		'shell:clean'
	]);

	grunt.registerTask("build", [
		"sass"
	]);

	grunt.registerTask("server", [
		"express",
		"watch",
		"express-keepalive"
	]);

	grunt.registerTask("pro", [
		"sass:dev",
		"sass:dist"
	]);

};
