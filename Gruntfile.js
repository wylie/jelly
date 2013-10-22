module.exports = function(grunt) {

	// project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			development: {
				options: {
					paths: ["less"],
					report: 'gzip'
				},
				files: {
					"jelly.css": "less/jelly.less"
				}
			},
			production: {
				options: {
					paths: ["less"],
					yuicompress: true,
					report: 'gzip'
				},
				files: {
					"jelly.min.css": "less/jelly.less"
				}
			}
		},
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
					port: 4000
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask("dev", [
		"recess:development",
		"recess:production"
	]);

	grunt.registerTask("server", [
		"express",
		"watch",
		"express-keepalive"
	]);

	grunt.registerTask("pro", [
		"less:development",
		"less:production"
	]);
	
};