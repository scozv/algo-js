module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		'node-qunit': {
			sorting: {
				code: './qunit/q.js',
				tests: './qunit/q-sorting.js' /*testFiles.map(function (n) {return "./tests/" + n;})*/ ,
				done: function (err, res) {
					!err && publishResults("node", res, this.async());
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-node-qunit');

	// Default task(s).
	grunt.registerTask('default', ['node-qunit:sorting']);
};