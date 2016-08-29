require('./q');

var algo = require('../bundle').default;
var T = algo.type;
var Sorting = algo.sorting;
var Graph = T.Graph;
var graph = algo.graph;
var should = require('should');

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
  inputFiles: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '99'],
  bigFiles: ['99'],
  toString: function () {
  }
};

test('SCC tests on reading file', () => {
  helper.inputFiles.forEach(function (fileIndex) {
  it('SCC test on file named ' + fileIndex, function (done) {
    var input = helper.inputPath + 'scc' + fileIndex + '.i',
      output = helper.outputPath + 'scc' + fileIndex + '.o',
      fs = require('fs'),
      assert = require('assert');

    if (helper.bigFiles.some(i => i === fileIndex))
    {
      this.timeout(1 << 16);
    }

    fs.readFile(input, 'UTF-8', (err, data) => {
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
    assert.equal(result, flat(graph.sccKosaraju(g)), 'Kosaraju SCC');
    assert.equal(result, flat(graph.sccTarjan(g)), 'Tarjan SCC');
  }

    // async done
    done();
  })
    ;
  });
});
})
;