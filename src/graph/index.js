import {mergeVertex, minimumCut, multiMinimumCut} from './cut'
import {mstKruskal, mstPrim} from './mst'
import {dijkstra, tspHeldKarp} from './path'
import {topologicalSort,sccTarjan, sccKosaraju, bfs, dfs, undirectedConnected} from './search'

export default {
  // cut
  mergeVertex, minimumCut, multiMinimumCut,

  // mst
  mstKruskal, mstPrim,

  // path
  dijkstra, tspHeldKarp,

  // search
  topologicalSort,sccTarjan, sccKosaraju, bfs, dfs, undirectedConnected,
}