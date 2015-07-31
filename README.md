[![Build Status](https://drone.io/github.com/scotv/algo-js/status.png)](https://drone.io/github.com/scotv/algo-js/latest)

# Algo.js
###### _Implementation of some algorithms using JavaScript with Harmony_

## Abstract || 摘要
This is a project containing implementation of some fudamental algorithms in `JavaScript` with arrow functions enabled. 
I use [Mocha] [1] for unit test, [Blanketjs] [2] for code coverage, and [drone.io] [7] for CI.

这是一个用`JavaScript`写的基础算法包，包含基本数据结构、线性算法、树和图。
目前已经借助[Mocha] [1]、[Blanketjs] [2]和[drone.io] [7]平台，搭建了单元测试、代码覆盖率的持续集成。

## Docs || 文档
Read new [__Docs__] [6] page for details including API of this.

完整的API文档可以访问[该页面] [6]。目前API文档还是英文。

## Harmony || ES6
I don't like returning value with `return`, so I enable `harmony` option of `nodejs` by default.
Currently, only `Firefox 22.0+` supports arrow functions ([MDN] [8]).

我喜欢用`lambda`表达函数——`Scala !`——所以，我默认开启了`nodejs`的`harmony`选项。
需要注意的是，浏览器方面，目前只有`Firefox 22.0+` 支持`arrow functions`（[MDN] [8]）。

##### `nodejs --harmony`

## CI Scripts || 初始环境配置脚本
Use following scripts to initialize your environments.

使用如下脚本配置初始环境。

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

## Test and Coverage || 测试和代码覆盖命令
Use following commands to run tests or coverage.
The result of converge will be located `converage.html`

使用如下的命令，执行单元测试和代码覆盖。
代码覆盖率的结果会输出到`converage.html`文件中。

##### `npm test`
The default `grunt` task has been configured in the `Gruntfile.js` and `package.json`.

##### `grunt default`
Will test all unit tests

##### `grunt testscc`
Only test SCC algorithm

##### `grunt testcov`
Will test all unit tests, and run coverage. The coverage result will be generated as `./coverage.html`.

## Milestone || 历史
When | What | Where
:-------|:---------|:-------:
 2015&darr; | - | -
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

## Migration || 迁移
I have migrated this project from [Algo.js in Google Code] [4], with [__API__ page] [6] and [issue] [5].

项目最初托管在[Google Code] [4]上面。

Due to default option of `git log` in github is no option, 
so please use command below to follow the full history of the codes 
which I have moved from root into `src/` during this migration:

##### `git log --follow src/sorting.js`

[1]: http://mochajs.org/ "Mocha.js"
[2]: http://blanketjs.org/ "Blanket.js"
[3]: http://www.ecmascript.org/  "ECMA-262"
[4]: https://code.google.com/p/algo-js "Algo.js"
[5]: https://github.com/scotv/algo-js/issues "Issues"
[6]: http://scotv.github.io/algo-wiki "Wiki"
[7]: https://drone.io/github.com/scotv/algo-js "drone.io"
[8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Browser_compatibility "Arrow functions"
