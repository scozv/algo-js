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
		testPath = 'test/',
		testFiles = [
			'q', 'q-x.math', 'q-x.math.vector',
			'q-t.linkedlist','q-t.queue','q-t.stack','q-t.tree','q-t.unionfind',
			'q-graph','q-list','q-sorting',
			'n-graph.scc'
		];

	// build es6transpiler mapping rule
	sourceFiles.forEach(function(file){
		es6transpilerMapping['deploy/es5.'+file+'.js'] = sourcePath + file +'.js';
	});

  testFiles.forEach(function(file){
    es6transpilerMapping['deploy/es5.'+file+'.js'] = testPath + file +'.js';
  });

	// build uglify test files
  var uglifySourceFiles = 
    sourceFiles.map(function(file){return 'deploy/es5.'+file+'.js';});

	var uglifyTestFiles = [testPath + '_uglify.header.js'];
	testFiles.forEach(function(file){
		uglifyTestFiles.push('deploy/es5.'+file+'.js');
	});

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

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
					'deploy/algo.js': uglifySourceFiles
				},
				options: {
					compress: {drop_console: 1, conditionals: 0},
					beautify: true,
					mangle: false,
					banner: [
						'/*',
						'<%= pkg.name %>',
						'v<%= pkg.version %>',
						'<%= grunt.template.today("yyyy-mm-dd") %>',
						'This file is uglified from many sources, for only coverage purpose',
						'*/',
						'\r\n'].join('\r\n')
				}
			},
			test: {
				files: {
					'test/test.js': uglifyTestFiles
				}
			}
		},
		
		// must name as 'mochacov'
		'mochacov': {
			options: {
					require : ['<%= pkg.main %>'],
					reporter: 'spec',
					log: true,
					harmony: true				
				},
			all: [testPath + 'q-*.js', testPath + 'n-graph.scc.js'],
			scc: [testPath + 'n-graph.scc.js'],
			cov: {
				options: {
					reporter: 'html-cov',
					output: 'coverage.html'
				},
				src: [testPath + 'test.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-es6-transpiler');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mocha-cov');

	// Default task(s).
	grunt.registerTask('testscc', ['mochacov:scc']);
	// grunt.registerTask('default', ['mochacov:all']);
	grunt.registerTask('testcov', ['es6transpiler','uglify:src','uglify:test','mochacov:cov']);
	grunt.registerTask('default', ['es6transpiler','uglify:src','uglify:test','mochacov:cov', 'mochacov:all']);
};