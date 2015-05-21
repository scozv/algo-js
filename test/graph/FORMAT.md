# Format Specification

This specification indicates the format of input files for __graph__ algorithm unit test.

The two files with same file name except suffix, like `A.i` and `A.o` are input and output file for unit test. `A.i` is input, while `A.o` is output.

That means, we read input, apply algorithm, compare result to output file.

## Archives
Input and output files are compressed into archives by:
	
	cd qunit/graph
	tar cjvf scc.tar *.i *.o
	cd ../..

Command for decompressing in `npm test` scripts is (see `package.json`):
	
	tar xjkvf qunit/graph/scc.tar -C qunit/graph/

`k` in `tar xjkvf` means [keeping old file](http://www.gnu.org/software/tar/manual/html_node/Keep-Old-Files.html#SEC77).

## SCC Test
The file named `scc??.i` or `scc??.o` is for SCC algorithm.

The format of SCC test input file is:

	n
	i1 j1
	i2 j2
	i3 j3

* There are exact `n` vertex in the __directed__ graph.
* The __index__ of vertex should (must) __start from 1__.
* Then the each of following line means there is __only one edge__ from `i1` to `j2`.
* More than one blankspaces __may__ occur between `i` and `j`.
* The last line of input file __is or is not__ empty line.

The format of SCC test output file is:

	x,a,b,c,d,e

We have 3 segments of output.

0. The number of SCC is exact `x`.
0. Each following number sperated by comma (,) is the size of a SCC.
    * The size of all SCC is __in descending order__.
    * if `x` grate than `100`, we __take the first `100`__ sizes, still in descending order.
0. Then, each following number is the __distinct__ number of size array, taking only top 100 in descending order.

And, 

* __No blankspace__ occurs between comma.
* The last line of input file __is or is not__ empty line.