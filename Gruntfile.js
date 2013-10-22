module.exports = function(grunt) {

	// project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		recess: {
			development: {
				options: {
					compile: true,
					compress: false,
					strictPropertyOrder: false,
					prefixWhitespace: false,
					zeroUnits: false
				},
				files: {
					'jelly.css': ['less/jelly.less']
				}
			},
			production: {
				options: {
					compile: true,
					compress: true,
					strictPropertyOrder: true,
					prefixWhitespace: true,
					zeroUnits: true
				},
				files: {
					'jelly.min.css': ['less/jelly.less']
				}
			}
		},
		watch: {
			files: ['less/*.less'],
			tasks: ['less']
		},
		express: {
			rel: {
				options: {
					port: 4000,
					livereload: true,
					showStack: true
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask("dev", [
		"recess:development"
	]);

	grunt.registerTask("server", [
		"express",
		"watch",
		"express-keepalive"
	]);

	grunt.registerTask("pro", [
		"recess:development",
		"recess:production"
	]);
	
};