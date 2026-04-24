export const rows = 8;
export const columns = 10;

const seating: boolean[][] = Array.from({ length: rows }, () =>
  new Array(columns).fill(false)
);

export function reserveSeat(row: number, column: number): boolean {
  if (row >= 0 && row < rows && column >= 0 && column < columns) {
    if (!seating[row][column]) {
      seating[row][column] = true;
      return true;
    }
  }

  return false;
}

export function adjacentSeats(): boolean {
  for (let r = 0; r < rows; ++r) {
    for (let c = 0; c < columns - 1; ++c) {
      if (!seating[r][c] && !seating[r][c + 1]) {
        return true;
      }
    }
  }

  return false;
}

export function displaySeats(): void {
  for (let r = 0; r < rows; r++) {
    let rowString = "";
    for (let c = 0; c < columns; c++) {
      rowString += seating[r][c] ? "X " : "L ";
    }
    console.log(rowString);
  }
}

export function availableSeats(): void {
  let numTaken = 0;
  for (let r = 0; r < rows; ++r) {
    for (let c = 0; c < columns; ++c) {
      if (seating[r][c]) {
        ++numTaken;
      }
    }
  }

  console.log(`There are ${numTaken} seats taken and ${rows * columns - numTaken} seats available`);
}

export function isSeatReserved(row: number, column: number): boolean {
  if (row < 0 || row >= rows || column < 0 || column >= columns) {
    return false;
  }
  return seating[row][column];
}

export function takenSeatCount(): number {
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (seating[r][c]) {
        count++;
      }
    }
  }
  return count;
}

export function resetSeating(): void {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      seating[r][c] = false;
    }
  }
}
