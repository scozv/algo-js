[![Build Status](https://drone.io/github.com/scotv/algo-js/status.png)](https://drone.io/github.com/scotv/algo-js/latest)

# Algo.js
####### _版本: 2.718281828459_
####### _使用带箭头的`JavaScript`实现的基础算法包_

## 摘要

这是一个用`JavaScript`写的基础算法包，包含基本数据结构、线性算法、树和图，
并试图将`V8`环境下耗时的递归算法重构为迭代算法（[解释] [9]）。
项目借助[Mocha] [1]、[Blanketjs] [2]和[drone.io] [7]平台，搭建了单元测试、代码覆盖率的持续集成。

## 文档

完整的API文档可以访问[该页面] [6]，而基于`LaTeX`编译的PDF文档，可参考[LaTeX发布页面] [10]。
当前只有英文的API文档。

## ES6

我喜欢用`lambda`来表达函数——`Scala !`——所以，我默认开启了`nodejs`的`harmony`选项。
需要注意的是，浏览器方面，目前只有`Firefox 22.0+` 支持箭头函数（[MDN] [8]）。

##### `nodejs --harmony`

## 初始环境配置脚本

使用如下脚本配置测试的初始环境。

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

## 测试和代码覆盖

使用如下的命令，执行单元测试和代码覆盖。
代码覆盖率的结果会输出到`converage.html`文件中。

如果使用大文件测试强联通算法，需要开启`Mocha`的耗时选项。
耗时的瓶颈来自`V8`的文件读取，而非算法本身的时间复杂度。

##### `npm test`
默认的`grunt`任务配置在如下两个文件：`Gruntfile.js`和`package.json`。

##### `grunt default`
运行所有的单元测试和代码覆盖。

##### `grunt testscc`
单独运行强联通算法的单元测试。

## 历史版本

使用如下命令查看历史的重大版本信息.

##### git tag -n

时间 | 说明 | 参考源
:-------|:---------|:-------:
 2015&darr; | - | -
 八月, 01 | 引入新的版本编号方式 |
 八月, 01 | 引入强联通图的大文件测试 | [测试文件] [11]
 五月, 21 | 将`nodejs 0.12`设为drone.io的默认环境 |
 五月, 16 | 逐步用`ES6`的箭头来表达函数 | 
 2014&darr; | - | -
 八月, 27 | 基于`LaTeX`编译的第一份PDF文档发布 | [发布页面] [10]
 六月, 14 | 逐步用`gitbook`重写API文档 | [API文档页面] [6]
 2013&darr; | - | -
 十二月,20 | 引入持续集成 [drone.io] [7]| [`e03180d`](https://github.com/scotv/algo-js/commit/e03180df15)
 十二月,12 | 逐步将该项目从[Google Code] [4]迁移过来 | [`b39f7f7`](https://github.com/scotv/algo-js/commit/b39f7f78ab)
 十月,18 | 自豪地实现了迭代版本的Tarjan强联通算法 | [`4542b93`](https://github.com/scotv/algo-js/commit/4542b937d827)和[解释][9]
 九月,27 | 开始留意JSLint | 
 七月,12 | 引入代码覆盖率测试 | [`600ee7d`](https://github.com/scotv/algo-js/commit/600ee7d899d2)
 五月,23 | 引入单元测试 | [`dad30d6`](https://github.com/scotv/algo-js/commit/dad30d64ad70)
 五月,23 | 从SVN到GIT | [`3b0c92e`](https://github.com/scotv/algo-js/commit/3b0c92e3b173)

## 迁移

项目最初托管在[Google Code] [4]上面。

[1]: http://mochajs.org/ "Mocha.js"
[2]: http://blanketjs.org/ "Blanket.js"
[3]: http://www.ecmascript.org/  "ECMA-262"
[4]: https://code.google.com/p/algo-js "Algo.js"
[5]: https://github.com/scotv/algo-js/issues "Issues"
[6]: http://scotv.github.io/algo-wiki "Wiki"
[7]: https://drone.io/github.com/scotv/algo-js "drone.io"
[8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Browser_compatibility "Arrow functions"
[9]: http://scotv.github.io/algo/2013/11/10/how-to-write-iterative-tarjan-scc-algorithm-part-zero 'Iterative Tarjan'
[10]: https://github.com/scotv/algo-wiki/releases 'LaTeX Releases'
[11]: https://github.com/scotv/algo-js/releases/tag/2.7182818284 'Big file for SCC'
