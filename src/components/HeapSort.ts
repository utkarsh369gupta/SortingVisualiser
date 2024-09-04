export const heapSort = (array: number[]): [number[], [number, number][]] => {
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
  