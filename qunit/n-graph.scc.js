// unit test for SCC algorithm, 
// by reading big input using file system of Node.js

var helper = {
	buildGraph: function (input) {
		var lines = input
			.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
			.split('\n')
			.map(function (line) {
				return line.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			}),
			graph, info;

		lines
			.forEach(function (line, i) {
				if (i === 0) {
					graph = new T.Graph(+line, true);
				} else {
					info = line.split(' ')
						.map(function (x) {
							return (+(x.replace(/^\s\s*/, '').replace(/\s\s*$/, '')));
						})
						.filter(function (x) {
							return x > 0;
						});

					graph.__pushEdge__(info[0], info[1]);
				}
			});

		return graph;
	},
	inputPath: './qunit/graph/',
	outputPath: './qunit/graph/',
	inputFiles: ['00', '01', '02', '03', '04', '05', '06', '07', '08'],
	toString: function () {}
};

var fileReadingTest = function () {
	helper.inputFiles.forEach(function (name) {
		var input = helper.inputPath + 'scc' + name + '.i',
			output = helper.outputPath + 'scc' + name + '.o',
			fs = require('fs');

		/*		*/

		asyncTest("asynchronous test on file " + name, function () {
			expect(2);

			fs.readFile(input, 'UTF-8', function (err, data) {
				if (err) {
					console.log('reading error (details below): ');
					throw new Error(err);
				} else {
					var g = helper.buildGraph(data),
						result = fs.readFileSync(output, 'UTF-8').replace('\r\n', ''),
						flat = function (r) {
							return r[0] + ',' + r[1].join(',') + ',' + r[2].join(',');
						};

					// test it
					deepEqual(flat(Graph.sccKosaraju(g)), result, 'Kosaraju SCC on file: ' + name);
					deepEqual(flat(Graph.sccTarjan(g)), result, 'Tarjan SCC on file: ' + name);
					start();
				}
			});
		});
	});
};

fileReadingTest();