[![Build Status](https://drone.io/github.com/scotv/algo-js/status.png)](https://drone.io/github.com/scotv/algo-js/latest)

# Algo.js
####### [简体中文](https://github.com/scotv/algo-js/blob/master/DUWO.md)
####### _Version: 2.718281828459_
####### _Implementation of some algorithms using JavaScript with Harmony_

## Abstract
This is a project containing implementation of some fudamental algorithms in `JavaScript` with arrow functions enabled. 
I use [Mocha] [1] for unit test, [Blanketjs] [2] for code coverage, and [drone.io] [7] for CI.

## Docs
Read new [__Docs__] [6] page for details including API of this.

## Harmony
I don't like returning value with `return`, so I enable `harmony` option of `nodejs` by default.
Currently, only `Firefox 22.0+` and `Chrome 45+` supports arrow functions ([MDN] [8]).

##### `nodejs --harmony`

## CI Scripts
Use following scripts to initialize your environments.

### drone.io
```bash
nvm install 0.12
nodejs --version
npm -d install
npm install -g grunt-cli
npm install -g mocha
npm test
```
### Travis CI
```yml
# .travis.yml
language: node_js
node_js:
  - "0.12"
script: 'npm i -g grunt-cli mocha && npm test'
```

## Test and Coverage
Use following commands to run tests or coverage.
The result of converge will be located `converage.html`

##### `npm test`
The default `grunt` task has been configured in the `Gruntfile.js` and `package.json`.

##### `grunt default`
Will test all unit tests

##### `grunt testscc`
Only test SCC algorithm

##### `grunt testcov`
Will test all unit tests, and run coverage. The coverage result will be generated as `./coverage.html`.

## Milestone
Use following command to list the history tags.
##### git tag -n

When | What | Where
:-------|:---------|:-------:
 2015&darr; | - | -
 Aug, 03 | publish API page in `zh-cn` | [接口文档](http://scotv.github.io/algo-wiki/zh-cn/index.html)
 Aug, 01 | introduce new tag version naming system |
 Aug, 01 | introduce big test file for SCC algorithm |
 May, 21 | drone.io with `nodejs 0.12` |
 May, 16 | Start to replace `return` with Arrow functions in JavaScript | 
 2014&darr; | - | -
 Aug, 27 | An initial PDF document of API writed in LaTeX has been released | [Releases](https://github.com/scotv/algo-wiki/releases)
 Jun, 14 | Start to migrate API docs to project wiki page | [API page] [6]
 2013&darr; | - | -
 Dec,20 | Introduce Continuous Integration by [drone.io] [7]| [`e03180d`](https://github.com/scotv/algo-js/commit/e03180df15)
 Dec,12 | Start to migrate Algo.js from [Google Code] [4] | [`b39f7f7`](https://github.com/scotv/algo-js/commit/b39f7f78ab)
 Oct,18 | Proudly finish the implementation of iteration Tarjan algorithm on strongly connected components | [`4542b93`](https://github.com/scotv/algo-js/commit/4542b937d827)
 Sept,27 | Start to pay attention on JSLint | 
 Jul,12 | Add code coverage | [`600ee7d`](https://github.com/scotv/algo-js/commit/600ee7d899d2)
 May,23 | Start unit test | [`dad30d6`](https://github.com/scotv/algo-js/commit/dad30d64ad70)
 May,23 | Switch SVN to Git | [`3b0c92e`](https://github.com/scotv/algo-js/commit/3b0c92e3b173)

## Migration
I have migrated this project from [Algo.js in Google Code] [4], with [__API__ page] [6] and [issue] [5].

Due to default option of `git log` in github is no option, 
so please use command below to follow the full history of the codes 
which I have moved from root into `src/` during this migration:

##### `git log --follow src/sorting.js`

[1]: http://mochajs.org/ "Mocha.js"
[2]: http://blanketjs.org/ "Blanket.js"
[3]: http://www.ecmascript.org/  "ECMA-262"
[4]: https://code.google.com/p/algo-js "Algo.js"
[5]: https://github.com/scotv/algo-js/issues "Issues"
[6]: http://scotv.github.io/algo-wiki/en/index.html "Wiki"
[7]: https://drone.io/github.com/scotv/algo-js "drone.io"
[8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Browser_compatibility "Arrow functions"
