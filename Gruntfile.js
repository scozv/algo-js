module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		'node-qunit': {
			sorting: {
				code: './qunit/q.js',
				tests: './qunit/q-sorting.js',
				done: function (err, res) {
					!err && publishResults("node", res, this.async());
				}
			},
			scc: {
				code: './qunit/q.js',
				tests: './qunit/n-graph.scc.js',
				done: function (err, res) {
					!err && publishResults("node", res, this.async());
				}
			},
			all: {
				code: './qunit/q.js',
				tests: [
					'q-x.math', 'q-x.math.vector',
					'q-t.linkedlist', 'q-t.queue', 'q-t.stack', 'q-t.tree', 'q-t.unionfind',
					'q-list', 'q-sorting',
					'q-graph'
				].map(function (n) {
					return './qunit/' + n + '.js';
				}),
				done: function (err, res) {
					!err && publishResults("node", res, this.async());
				}
			}
		}, 
		
		// must name as 'mochacov'
		'mochacov': {
			options: {
					require : ['./qunit/q.js'],
					reporter: 'spec',
					log: true,
					harmony: true				
				},
			all : ['qunit/q-x.math.js']
		}
	});

	grunt.loadNpmTasks('grunt-node-qunit');
	// must load it
	grunt.loadNpmTasks('grunt-mocha-cov');

	// Default task(s).
	grunt.registerTask('default', ['node-qunit:all', 'node-qunit:scc']);
	grunt.registerTask('test', ['mochacov:all']);
};