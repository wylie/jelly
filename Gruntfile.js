module.exports = function(grunt) {

	// project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		express: {
			rel: {
				options: {
					port: 5000
				}
			}
		},

		sass: {
			dev: {
				options: {
					outputStyle: 'nested'
				},
				files: {
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

	//grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-express');

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
