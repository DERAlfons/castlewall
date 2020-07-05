export interface Indices {
  i: number;
  j: number;
}

export function transpose<T>(matrix: T[][]): T[][] {
  let result = [];
  for (let i = 0; i < matrix[0].length; i++) {
    result.push([]);
    for (let j = 0; j < matrix.length; j++) {
      result[i].push(matrix[j][i]);
    }
  }

  return result;
}

export function is_odd(n: number): boolean {
  return !is_even(n);
}

export function is_even(n: number): boolean {
  if (n % 2 == 0) {
    return true;
  }
  else {
    return false;
  }
}

export function count<T>(array: T[], value: T): number {
  let count = 0;
  array.forEach(element => {
    if (element == value) {
      count += 1;
    }
  });

  return count;
}