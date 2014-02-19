module.exports = function(grunt) {

	// project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			development: {
				options: {
					outputStyle: 'nested'
				},
				files: {
					"jam.css": "sass/jam.scss"
				}
			},
			production: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					"jam.min.css": "sass/jam.scss"
				}
			}
		},
		watch: {
			files: ['sass/*.scss','Gruntfile.js'],
			tasks: ['sass']
		},
		express: {
			rel: {
				options: {
					port: 5000
				}
			}
		}
	});

	//grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask("dev", [
		"sass"
	]);

	grunt.registerTask("server", [
		"express",
		"watch",
		"express-keepalive"
	]);

	grunt.registerTask("pro", [
		"sass:development",
		"sass:production"
	]);
	
};