if (typeof document !== "undefined") {
  import("./style.css").then(() => {
    const app = document.querySelector<HTMLDivElement>("#app");
    if (app) {
      app.innerHTML = `
        <div class="w-full max-w-5xl rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-300/40 backdrop-blur">
          <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Cinema Seat Manager</p>
              <h1 class="font-serif text-3xl font-bold text-slate-900 md:text-4xl">Choose Your Seats</h1>
              <p class="mt-1 text-sm text-slate-600">Click any available seat to reserve it.</p>
            </div>
            <div class="flex gap-2">
              <button id="check-adjacent" class="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Check adjacent seats</button>
              <button id="reset-seats" class="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500">Reset</button>
            </div>
          </div>

          <div class="mb-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-100">Screen</div>

          <div class="mb-5 flex flex-wrap items-center gap-4 text-sm text-slate-700">
            <div>Available: <span id="available-count" class="font-bold text-emerald-700">0</span></div>
            <div>Reserved: <span id="reserved-count" class="font-bold text-rose-700">0</span></div>
            <div>Adjacent available: <span id="adjacent-status" class="font-bold text-sky-700">Yes</span></div>
          </div>

          <div id="seat-map" class="grid gap-2"></div>
          <p id="status" class="mt-4 text-sm font-medium text-slate-600">Ready. Pick a seat.</p>
        </div>
      `;

      const seatMap = document.querySelector<HTMLDivElement>("#seat-map");
      const availableCount = document.querySelector<HTMLSpanElement>("#available-count");
      const reservedCount = document.querySelector<HTMLSpanElement>("#reserved-count");
      const adjacentStatus = document.querySelector<HTMLSpanElement>("#adjacent-status");
      const status = document.querySelector<HTMLParagraphElement>("#status");
      const resetButton = document.querySelector<HTMLButtonElement>("#reset-seats");
      const checkAdjacentButton = document.querySelector<HTMLButtonElement>("#check-adjacent");

      if (!seatMap || !availableCount || !reservedCount || !adjacentStatus || !status || !resetButton || !checkAdjacentButton) {
        return;
      }

      seatMap.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;

      const seatLabel = (row: number, column: number): string => {
        const rowName = String.fromCharCode(65 + row);
        return `${rowName}${column + 1}`;
      };

      const paintStats = (): void => {
        const taken = takenSeatCount();
        const total = rows * columns;
        availableCount.textContent = String(total - taken);
        reservedCount.textContent = String(taken);
        adjacentStatus.textContent = adjacentSeats() ? "Yes" : "No";
      };

      const renderSeats = (): void => {
        seatMap.innerHTML = "";

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < columns; c++) {
            const button = document.createElement("button");
            const taken = isSeatReserved(r, c);

            button.type = "button";
            button.textContent = seatLabel(r, c);
            button.className = [
              "h-10 rounded-lg text-xs font-bold tracking-wide transition",
              taken
                ? "cursor-not-allowed border border-rose-700 bg-rose-600/90 text-white"
                : "border border-emerald-500 bg-emerald-100 text-emerald-900 hover:scale-105 hover:bg-emerald-200",
            ].join(" ");
            button.disabled = taken;

            button.addEventListener("click", () => {
              const didReserve = reserveSeat(r, c);
              if (didReserve) {
                status.textContent = `Reserved seat ${seatLabel(r, c)}.`;
              } else {
                status.textContent = `Seat ${seatLabel(r, c)} is unavailable.`;
              }
              renderSeats();
              paintStats();
            });

            seatMap.appendChild(button);
          }
        }
      };

      resetButton.addEventListener("click", () => {
        resetSeating();
        status.textContent = "All seats were reset.";
        renderSeats();
        paintStats();
      });

      checkAdjacentButton.addEventListener("click", () => {
        status.textContent = adjacentSeats()
          ? "At least one pair of adjacent seats is available."
          : "No adjacent seats are available.";
        paintStats();
      });

      renderSeats();
      paintStats();
    }
  });
}

import { adjacentSeats, columns, isSeatReserved, reserveSeat, resetSeating, rows, takenSeatCount } from "./seating";


export {};
