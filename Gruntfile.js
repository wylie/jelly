module.exports = function(grunt) {

	// project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			compile: {
				src: "jelly.less",
				dest: "jelly.css"
			}
		},

		watch: {
			files: ['*.less'],
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
		"express:dev",
		"watch",
		"express-keepalive"
	]);

	grunt.registerTask("release", [
		"express:rel",
		"watch",
		"express-keepalive"
	]);
	
};