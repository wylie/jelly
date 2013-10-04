module.exports = function(grunt) {

	// project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			files: {
				src: "less/jelly.less",
				dest: "examples/jelly.css"
			},
			options: {
				yuicompress: true,
				report: 'gzip'
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
					bases: "examples/"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask("compile", [
		"less"
	]);

	grunt.registerTask("server", [
		"express",
		"watch",
		"express-keepalive"
	]);

	grunt.registerTask("release", [
		"express:rel",
		"watch",
		"express-keepalive"
	]);
	
};