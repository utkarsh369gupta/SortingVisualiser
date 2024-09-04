export const quickSort = (array: number[]): [number[], [number, number][]] => {
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
  