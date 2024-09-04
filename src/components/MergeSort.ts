export const mergeSort = (array: number[]): [number[], [number, number][]] => {
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
          steps.push([k, left + i]); // Track indices for visualization
          i++;
        } else {
          arr[k] = rightArray[j];
          steps.push([k, mid + 1 + j]); // Track indices for visualization
          j++;
        }
        k++;
      }
  
      // Copy the remaining elements of leftArray, if any
      while (i < n1) {
        arr[k] = leftArray[i];
        steps.push([k, left + i]); // Track indices for visualization
        i++;
        k++;
      }
  
      // Copy the remaining elements of rightArray, if any
      while (j < n2) {
        arr[k] = rightArray[j];
        steps.push([k, mid + 1 + j]); // Track indices for visualization
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
  
    const sortedArray = [...array];
    mergeSortRecursive(sortedArray, 0, sortedArray.length - 1);
    return [sortedArray, steps];
  };
  