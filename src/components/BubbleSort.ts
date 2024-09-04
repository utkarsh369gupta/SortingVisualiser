export const bubbleSort = (array: number[]): [number, number][] => {
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
  