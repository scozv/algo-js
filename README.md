# algo.js

_Dec, 12<sup>th</sup>, 2013_

## Migration
I am starting to migrate algo.js from [Algo.js in Google Code] [4].

## What
This is a project containing implementation of some algorithms in `JavaScript`. I use [QUnit] [1] for unit test, and [Blanket.js] [2] for code coverage.

I try to introduce some OOP into this project, and recently, I am learning functional programming like `Scala`, so that I also try to introduce the functional conception. So we will see `.map()`, `.forEach()`, etc. Fortunately, we have some iteration methods for Array in [ECMA-262, Edition 5] [3].

This project is not the best implementation, but I am taking it easier to use.

## Wiki and API
Read __wiki__ page for details including API of this. However, the API docs are slower than the codes, which you can browse from repo directly.

## Milestone
When | What | Revision
:-------:|:---------|:-------:
 Dec 12, 2013 | Migrating Algo.js from [Google Code] [4] | b39f7f78ab
 Oct 18, 2013 | Proudly finish the implementation of iteration Tarjan algorithm on strongly connected components | 4542b937d827
 Sept 27, 2013 | Start to pay attention on JSLint | 
 Jul 12, 2013 | Add code coverage | 600ee7d899d2
 May 23, 2013 | Start unit test | dad30d64ad70
 May 23, 2013 | Switch SVN to Git | 3b0c92e3b173

[1]: http://qunitjs.com/ "QUnit.js"
[2]: http://blanketjs.org/ "Blanket.js"
[3]: http://www.ecmascript.org/  "ECMA-262"
[4]: https://code.google.com/p/algo-js "Algo.js"
