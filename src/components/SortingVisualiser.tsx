import React, { useState } from 'react';

const SortingVisualiser: React.FC = () => {
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

  // Sorting Algorithms
  const bubbleSort = (array: number[]): number[] => {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  };

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

  const quickSort = (array: number[]): number[] => {
    if (array.length <= 1) return array;
    const pivot = array[Math.floor(array.length / 2)];
    const left = array.filter(item => item < pivot);
    const middle = array.filter(item => item === pivot);
    const right = array.filter(item => item > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
  };

  return (
    <div className="p-4">
      <div className=' flex flex-row '>
        <div className='basis-1/4'>
          <h1 className="text-3xl font-bold mb-4 pr-16">Sorting Visualiser</h1>
        </div>
        <div className='pl-16 pr-14 basis-3/4 grid grid-flow-col justify-stretch'>
          <div>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2 font-bold" onClick={() => setArr(bubbleSort(arr))}>
              Bubble Sort
            </button>
          </div>
          <div>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2 font-bold" onClick={() => setArr(mergeSort(arr))}>
              Merge Sort
            </button>
          </div>
          <div>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 font-bold" onClick={() => setArr(quickSort(arr))}>
              Quick Sort
            </button>
          </div>
          <div>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 font-bold" onClick={() => setArr(quickSort(arr))}>
              Heap Sort
            </button>
          </div>
        </div>
      </div>

      <button className="px-12 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2" onClick={() => setArr(generateRandomArray(30))}>
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
