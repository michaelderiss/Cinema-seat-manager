if (typeof document !== "undefined") {
  import("./style.css").then(() => {
    const app = document.querySelector<HTMLParagraphElement>("#app");
    if (app) {
      app.textContent = "If you can see this, Tailwind is working.";
    }
  });
}

console.log("Hello from src/main.ts");


//create seating matrix for a theater with 8 rows and 10 columns

const rows = 8;
const columns = 10;

const seating: boolean[][] =Array.from({ length: rows }, () =>
  new Array(columns).fill(false)
);

// Function to reserve a seat
function reserveSeat(row: number, column: number): boolean 
{
  if(row >= 0 && row < rows && column >= 0 && column < columns) 
    {
      if(!seating[row][column]) 
      {
        seating[row][column] = true;
        console.log(`Seat at row ${row + 1}, column ${column + 1} has been reserved.`);
        return true;
      }
    }
    console.log(`Seat at row ${row + 1}, column ${column + 1} is already reserved or invalid.`);
  return false;
}

function displaySeats(): void 
{
  for (let r = 0; r < rows; r++) 
  {
    let rowString = ""; // Start a fresh string for this row
    for (let c = 0; c < columns; c++) 
    {
      // Add the symbol and a space to the row string
      rowString += seating[r][c] ? "X " : "L ";
    }
    console.log(rowString); // Print the whole row at once
  }
}

function availableSeats(): void
{
  let numTaken = 0;
  for(let r = 0; r < rows; ++r)
  {
    for(let c = 0; c < columns; ++c)
    {
      if(seating[r][c])
      {
        ++numTaken;
      }
    }
  }
  console.log(`There are ${numTaken} seats taken and ${80 - numTaken} seats available`);
}
  



export {};
