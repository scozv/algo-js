module.exports = function (grunt) {

	var sourcePath = 'src/',
		sourceFiles = [
			'x.array','x.math','x.math.stats','x.math.vector',
			't','t.linkedlist','t.queue','t.stack','t.tree','t.unionfind','t.heap',
			't.graph','t.graph.weighted',
			'list','hash',
			'sorting','sorting.mergeSort','sorting.quickSort',
			'graph.cut','graph.mst','graph.mst.kruskal','graph.search',
			'graph.path','graph.path.bellmanFord','graph.path.floydWarshall',
			'dynamic.knapsack'
		],
		es6transpilerMapping = {},
		es6transpilerGlobal = {
			window:1,test:1,describe:1,strictEqual:1,
			it:1,deepEqual:1,ok:1,throws:1,
			T:1,Sorting:1,Graph:1,List:1,UnionFind:1,
			// maybe global var leak
			result:1,l:1,subCapacity:1},
		testPath = 'qunit/',
		testFiles = [
			'q-x.math','q-x.math.vector',
			'q-t.linkedlist','q-t.queue','q-t.stack','q-t.tree','q-t.unionfind',
			'q-graph','q-list','q-sorting'
			/*,'n-graph.scc'*/
		];

	// build es6transpiler mapping rule
	sourceFiles.forEach(function(file){
		es6transpilerMapping['es5.'+file+'.js'] = sourcePath + file +'.js';
	});
	es6transpilerMapping['es5.q.js'] = 'qunit/q.js';
	es6transpilerMapping['es5.n-graph.scc.js'] = 'qunit/n-graph.scc.js';

	// build uglify test files
	var uglifyTestFiles = ['qunit/_uglify.header.js'];
	testFiles.forEach(function(file){
		uglifyTestFiles.push(testPath+file+'.js');
	});
	uglifyTestFiles.push('es5.n-graph.scc.js');

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

		// uglify does support es6 (harmony) right now
		'es6transpiler': {
	        dist: {
	            files: es6transpilerMapping,
	            options: {
	            	"environments": ["node", "browser"],
	            	globals: es6transpilerGlobal
	            }
	        }
		},

		'uglify': {
			src: {
				files: {
					'deploy/algo.js': sourceFiles.map(function(file){return 'es5.'+file+'.js';})
				},
				options: {
					compress: false,
					beautify: true,
					mangle: false
				}
			},
			test: {
				files: {
					'qunit/test.js': uglifyTestFiles
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