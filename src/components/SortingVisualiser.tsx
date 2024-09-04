import React, { useState } from 'react';

const SortingVisualiser: React.FC = () => {

  // random array generator
  const generateRandomArray = (length: number, min: number = 6, max: number = 100): number[] => {
    if (length > (max - min + 1)) {
      throw new Error("Length exceeds the number of unique values in the specified range");
    }
    const uniqueNumbers = new Set<number>();
    uniqueNumbers.add(26);    // as 26 is my lucky number
    while (uniqueNumbers.size < length) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add(num);
    }
    return Array.from(uniqueNumbers);
  };

  const [arr, setArr] = useState<number[]>(() => generateRandomArray(30));
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [speed, setSpeed] = useState<number>(100);

  // Bubble Sort
  const bubbleSort = (array: number[]): [number, number][] => {
    const swaps: [number, number][] = [];
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          swaps.push([j, j + 1]);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return swaps;
  };

  // Merge Sort
  const mergeSort = (array: number[]): [number[], [number, number][]] => {
    const steps: [number, number][] = [];

    const merge = (arr: number[], left: number, mid: number, right: number): void => {
      const n1 = mid - left + 1;
      const n2 = right - mid;
      const leftArray = new Array(n1);
      const rightArray = new Array(n2);

      for (let i = 0; i < n1; i++) leftArray[i] = arr[left + i];
      for (let j = 0; j < n2; j++) rightArray[j] = arr[mid + 1 + j];

      let i = 0, j = 0, k = left;

      while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
          arr[k] = leftArray[i];
          steps.push([k, left + i]);
          i++;
        } else {
          arr[k] = rightArray[j];
          steps.push([k, mid + 1 + j]);
          j++;
        }
        k++;
      }

      while (i < n1) {
        arr[k] = leftArray[i];
        steps.push([k, left + i]);
        i++;
        k++;
      }

      while (j < n2) {
        arr[k] = rightArray[j];
        steps.push([k, mid + 1 + j]);
        j++;
        k++;
      }
    };

    const mergeSortRecursive = (arr: number[], left: number, right: number): void => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);

        mergeSortRecursive(arr, left, mid);
        mergeSortRecursive(arr, mid + 1, right);
        merge(arr, left, mid, right);
      }
    };

    mergeSortRecursive(array, 0, array.length - 1);
    return [array, steps];
  };

  // Quick Sort
  const quickSort = (array: number[]): [number[], [number, number][]] => {
    const steps: [number, number][] = [];
    const quickSortRecursive = (array: number[], start: number, end: number): number[] => {
      if (start >= end) return array;
      const pivotIndex = partition(array, start, end);
      quickSortRecursive(array, start, pivotIndex - 1);
      quickSortRecursive(array, pivotIndex + 1, end);
      return array;
    };

    const partition = (array: number[], start: number, end: number): number => {
      const pivotValue = array[end];
      let pivotIndex = start;
      for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
          [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
          steps.push([i, pivotIndex]);
          pivotIndex++;
        }
      }
      [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
      steps.push([pivotIndex, end]);
      return pivotIndex;
    };

    const sortedArray = quickSortRecursive(array, 0, array.length - 1);
    return [sortedArray, steps];
  };

  // Heap Sort
  const heapSort = (array: number[]): [number[], [number, number][]] => {
    const steps: [number, number][] = [];
    const arr = [...array];
    let n = arr.length;
    const heapify = (arr: number[], n: number, i: number) => {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }
      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        steps.push([i, largest]);
        heapify(arr, n, largest);
      }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      steps.push([0, i]);
      heapify(arr, i, 0);
    }
    return [arr, steps];
  };

  // Animation for sorting
  const animateSwaps = (array: number[], swaps: [number, number][], speed: number = 50) => {
    if (swaps.length === 0) {
      setIsAnimating(false);
      setActiveIndices([]);
      return;
    }
    const [i, j] = swaps.shift()!;
    setActiveIndices([i, j]);
    [array[i], array[j]] = [array[j], array[i]];
    setArr([...array]);

    setTimeout(() => {
      animateSwaps(array, swaps, speed);
    }, speed);
  };

  const playBubbleSort = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const copy = [...arr];
    const swaps = bubbleSort(copy);
    animateSwaps(copy, swaps, speed);
  };

  const playMergeSort = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const [sortedArray, steps] = mergeSort([...arr]);
    animateSwaps([...arr], steps, speed);
  };

  const playQuickSort = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const [sortedArray, steps] = quickSort([...arr]);
    animateSwaps([...arr], steps, speed);
  };

  const playHeapSort = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const [sortedArray, steps] = heapSort([...arr]);
    animateSwaps([...arr], steps, speed);
  };

  return (
    <div className="p-3 bg-slate-500">
      <div className='bg-slate-300 p-6 rounded-lg'>
        <div className='flex flex-row'>
          <div className='basis-1/4'>
            <h1 className="text-3xl font-bold mb-4 pr-16">Sorting Visualiser</h1>
          </div>
          <div className='pl-16 pr-14 basis-3/4 grid grid-flow-col justify-stretch'>
            <div>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2 font-bold"
                onClick={playBubbleSort}
                disabled={isAnimating}>
                Bubble Sort
              </button>
            </div>
            <div>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2 font-bold"
                onClick={playMergeSort}
                disabled={isAnimating}>
                Merge Sort
              </button>
            </div>
            <div>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 font-bold"
                onClick={playQuickSort}
                disabled={isAnimating}>
                Quick Sort
              </button>
            </div>
            <div>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 font-bold"
                onClick={playHeapSort}
                disabled={isAnimating}>
                Heap Sort
              </button>
            </div>
          </div>
        </div>

        <button
          className="px-12 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
          onClick={() => !isAnimating && setArr(generateRandomArray(30))}>
          Generate New Values
        </button>
      </div>

      <div className='mt-6 bottom-0 border-2 border-gray-400 pb-6 rounded-md bg-slate-300'>
        <div className="flex items-end h-96 mt-6">
          {arr.map((value, index) => (
            <div
              key={index}
              className={`text-center mx-1 ${activeIndices.includes(index) ? 'bg-red-700' : 'bg-green-700'} text-white`}
              style={{ height: `${value}%`, width: '3%' }}>
              {value}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center mb-4 mt-8 font-bold justify-center ">
        <div className='border-2 rounded-md border-zinc-400 p-6 bg-slate-300'>
          <label htmlFor="speed" className="mr-2">Speed:</label>
          <input
            type="range"
            id="speed"
            min="50"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32"
          /></div>
      </div>
    </div>
  );
};

export default SortingVisualiser;
