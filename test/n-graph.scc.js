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
	inputPath: './test/graph/',
	outputPath: './test/graph/',
	inputFiles: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '99'].map(x=>'scc'+x),
	toString: function () {}
};

test('SCC tests on reading file', ()=>{
	helper.inputFiles.forEach(function (fileName) {
		it('SCC test on file named ' + fileName, function(done){
			var input = helper.inputPath + fileName + '.i',
				output = helper.outputPath + fileName + '.o',
				fs = require('fs'),
				assert = require('assert');
			
			fs.readFile(input, 'UTF-8', (err, data)=>{
				if (err) {
					console.warn('reading error (details below): ');
					// throw new Error(err);
				} else {
					var g = helper.buildGraph(data),
					result = fs.readFileSync(output, 'UTF-8').replace('\r\n', ''),
					flat = function (r) {
						var t = r[0] + ',' + r[1].join(',') + ',' + r[2].join(',');
						return t;
					};

					// test it
					assert.equal(result, flat(Graph.sccKosaraju(g)), 'Kosaraju SCC');
					assert.equal(result, flat(Graph.sccTarjan(g)), 'Tarjan SCC');
				}
				
				// async done
				done();
			});
		});
	});
});