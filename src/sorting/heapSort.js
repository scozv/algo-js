import {MinHeap, MaxHeap} from '../type/Heap'

export default function heapSort(arr, option) {
  option = option || {
      'order': 'ASC'
    };

  var heap;

  switch (option.order) {
    case 'ASC':
    case 'asc':
      heap = new MinHeap();
      break;
    case 'DESC':
    case 'desc':
      heap = new MaxHeap();
      break;
    default:
      throw new Error('invalid order option, use one of ASC | DESC');
  }

  // push x into heap
  arr.forEach(function (x) {
    heap.push(x);
  });

  return heap.__toArray__();
}