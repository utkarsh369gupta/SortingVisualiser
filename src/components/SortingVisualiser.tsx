import React, { useState } from 'react';

const SortingVisualiser: React.FC = () => {

  // random array generator
  const generateRandomArray = (length: number, min: number = 6, max: number = 100): number[] => {
    if (length > (max - min + 1)) {
      throw new Error("Length exceeds the number of unique values in the specified range");
    }
    const uniqueNumbers = new Set<number>();
    while (uniqueNumbers.size < length) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add(num);
    }
    return Array.from(uniqueNumbers);
  };

  const [arr, setArr] = useState<number[]>(() => generateRandomArray(30));
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

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
  const mergeSort = (array: number[]): number[] => {
    if (array.length <= 1) return array;
    const middle = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle));
    return merge(left, right);
  };

  const merge = (left: number[], right: number[]): number[] => {
    const result: number[] = [];
    let leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  // Quick Sort
  const quickSort = (array: number[]): number[] => {
    if (array.length <= 1) return array;
    const pivot = array[Math.floor(array.length / 2)];
    const left = array.filter(item => item < pivot);
    const middle = array.filter(item => item === pivot);
    const right = array.filter(item => item > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
  };

// Heap Sort
  const heapSort = (array: number[]): number[] => {
    const arr = [...array];
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(arr, i, 0);
    }
    return arr;
  }
  
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
      heapify(arr, n, largest);
    }
  }
  
// Animation for Bubble Sort
  const animateSwaps = (array: number[], swaps: [number, number][], speed: number = 50) => {
    if (swaps.length === 0) {
      setIsAnimating(false);
      setActiveIndices([]);
      return;
    }
    const [i, j] = swaps.shift()!;
    setActiveIndices([i,j]);
    [array[i], array[j]] = [array[j], array[i]];
    setArr([...array]);

    setTimeout(() => {
      animateSwaps(array, swaps, speed);
    }, speed);
  };

  const play = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const copy = [...arr];
    const swaps = bubbleSort(copy);
    animateSwaps(copy, swaps);
  };

  return (
    <div className="p-4">
      <div className='flex flex-row'>
        <div className='basis-1/4'>
          <h1 className="text-3xl font-bold mb-4 pr-16">Sorting Visualiser</h1>
        </div>
        <div className='pl-16 pr-14 basis-3/4 grid grid-flow-col justify-stretch'>
          <div>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2 font-bold" 
              onClick={play}
              disabled={isAnimating}>
              Bubble Sort
            </button>
          </div>
          <div>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2 font-bold" 
              onClick={() => !isAnimating && setArr(mergeSort(arr))}>
              Merge Sort
            </button>
          </div>
          <div>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 font-bold" 
              onClick={() => !isAnimating && setArr(quickSort(arr))}>
              Quick Sort
            </button>
          </div>
          <div>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 font-bold" 
              onClick={() => !isAnimating && setArr(heapSort(arr))}>
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

      <div className='mt-6 bottom-0 border border-gray-300'>
        <div className="flex items-end h-96 mt-6">
          {arr.map((value, index) => (
            <div
              key={index}
              className="bg-green-700 text-white text-center mx-1"
              style={{ height: `${value}%`, width: '3%' }}>
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortingVisualiser;
