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

		'es6transpiler': {
	        dist: {
	            files: {
	                'es5.x.math.js': 'src/x.math.js',
	                'es5.q.js': 'qunit/q.js'
	            },
	            options: {
	            	"environments": ["node", "browser"],
	            	globals: {window: true, test: true, describe: true, strictEqual: true, it: true, deepEqual: true, ok: true, throws: true}
	            }
	        }
		},

		'uglify': {
			src: {
				files: {
					'deploy/algo.js': [
						'es5.x.math.js',
						'src/x.array.js', 
						'src/sorting*.js'
					]
				},
				options: {
					compress: false,
					beautify: true,
					mangle: false
				}
			},
			test: {
				files: {
					'qunit/test.js': [
						'qunit/_uglify.header.js',
						'qunit/q-sorting.js'
					]
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
			all: ['qunit/q-*.js', 'qunit/n-graph.scc.js'],
			scc: ['qunit/n-graph.scc.js'],
			cov: {
				options: {
					reporter: 'html-cov',
					output: 'coverage.html'
				},
				src: ['qunit/test.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-es6-transpiler');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mocha-cov');

	// Default task(s).
	// grunt.registerTask('default', ['node-qunit:all', 'node-qunit:scc']);
	grunt.registerTask('testscc', ['mochacov:scc']);
	grunt.registerTask('default', ['mochacov:all']);
	grunt.registerTask('testcov', ['es6transpiler','uglify:src','uglify:test','mochacov:cov'])
};