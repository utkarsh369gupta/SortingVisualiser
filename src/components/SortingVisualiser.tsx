import React, { useState } from 'react';
import { bubbleSort } from './BubbleSort';
import { mergeSort } from './MergeSort';
import { quickSort } from './QuickSort';
import { heapSort } from './HeapSort';

const SortingVisualiser: React.FC = () => {
  // Random array generator
  const generateRandomArray = (length: number, min: number = 6, max: number = 100): number[] => {
    if (length > max - min + 1) {
      throw new Error("Length exceeds the number of unique values in the specified range");
    }
    const uniqueNumbers = new Set<number>();
    uniqueNumbers.add(26); // 26 is my lucky number
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
                onClick={playQuickSort}
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
      <div className="flex flex-row items-center mb-4 mt-8 font-bold justify-center">
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

      {/* Footer */}
      <footer className="footer text-center py-4 bg-gray-800 text-white">
        <p>© 2024 Sorting Visualiser Project. All rights reserved.</p>
        <p>Made by Utkarsh Gupta</p>
      </footer>
    </div>
  );
};

export default SortingVisualiser;
