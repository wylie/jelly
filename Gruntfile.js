module.exports = function(grunt) {

	// project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			development: {
				options: {
					paths: ["less"]
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

		// less: {
		// 	production: {
		// 		files: {
		// 			src: "less/jelly.less",
		// 			dest: "jelly.css"
		// 		}
		// 	},
		// 	development: {
		// 		files: {
		// 			src: "less/jelly.less",
		// 			dest: "jelly.min.css"
		// 		},
		// 		options: {
		// 			yuicompress: true,
		// 			report: 'gzip'
		// 		}
		// 	}
		// },

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
	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask("dev", [
		"less:development"
	]);

	grunt.registerTask("pro", [
		"less:production"
	]);

	grunt.registerTask("server", [
		"express",
		"watch",
		"express-keepalive"
	]);

	grunt.registerTask("dist", [
		"express:development",
		"watch",
		"express-keepalive"
	]);
	
};