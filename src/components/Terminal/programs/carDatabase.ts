import { TerminalApi, TerminalProgram } from "../Terminal";

/**
 * In-browser reimplementation of the Car-Database C++ hash-table CLI:
 * a menu over a car store (see all, search by year+model, add, delete,
 * compare, update price), with the original's field-by-field prompts and
 * "invalid, enter again" validation.
 */

interface Car {
  year: number;
  make: string;
  model: string;
  city: number;
  hwy: number;
  price: number;
}

// Seed data, verbatim from the project's carData.txt.
const SEED_RAW = `
2020 Honda Civic 32 42 20000
2021 Nissan GT-R 16 22 113540
2017 Toyota Mirai 66 66 58000
2015 Porsche 911 21 28 85000
2015 Bugatti Veyron 8 15 1300000
2015 Toyota Camry 25 35 24000
2020 Nissan Altima 28 39 24100
2020 Volkswagon Jetta 30 40 18895
2020 Toyota 86 24 32 27060
2019 Toyota Camry 29 41 24765
2018 Nissan Maxima 21 30 33915
2021 BMW M3 16 23 69900
2020 Toyota Camry 29 41 24425
2017 Kia Forte 29 38 17300
2019 Nissan Rogue 26 33 25795
2020 Honda Odyssey 19 28 30690
2020 Jeep Cherokee 23 31 34755
2019 Hyundai Elantra 32 40 17200
2020 Hyundai Sonata 28 38 23600
2018 Chevrolet Cruze 31 47 18500
2021 Hyundai Elantra 33 43 19650
2020 Toyota Corolla 31 40 19600
2021 Toyota Corolla 31 40 19925
2020 Toyota Prius 58 53 24325
2018 Toyota Highlander 21 27 32000
2015 Honda Civic 31 41 14900
2018 Honda Accord 30 38 24445
2020 Honda Insight 55 49 22930
`;

function parseSeed(): Car[] {
  return SEED_RAW.trim()
    .split("\n")
    .map((line) => {
      const [year, make, model, city, hwy, price] = line.trim().split(/\s+/);
      return { year: +year, make, model, city: +city, hwy: +hwy, price: +price };
    });
}

const money = (n: number) => "$" + n.toLocaleString("en-US");
const carLine = (c: Car) => `${c.year} ${c.make} ${c.model}  |  City ${c.city} / Hwy ${c.hwy} MPG  |  ${money(c.price)}`;

const parseYear = (s: string): number | null => {
  const y = parseInt(s, 10);
  return Number.isInteger(y) && y >= 1900 && y <= 2100 ? y : null;
};
const parseInt2 = (s: string): number | null => {
  const n = parseInt(s, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
};
const parsePrice = (s: string): number | null => {
  const n = parseInt(s.replace(/[$,\s]/g, ""), 10);
  return Number.isInteger(n) && n > 0 ? n : null;
};

type State =
  | "menu"
  | "search-year"
  | "search-model"
  | "add-year"
  | "add-brand"
  | "add-model"
  | "add-city"
  | "add-hwy"
  | "add-price"
  | "delete-year"
  | "delete-model"
  | "update-year"
  | "update-model"
  | "update-price"
  | "compare-year"
  | "compare-model"
  | "compare-again";

export function createCarDatabase(): TerminalProgram {
  let cars: Car[] = parseSeed();
  let state: State = "menu";
  let draft: Partial<Car> & { matches?: Car[] } = {};
  let compareList: Car[] = [];

  const matchesFor = (year: number, model: string) => cars.filter((c) => c.year === year && c.model.toLowerCase() === model.toLowerCase());

  const showMenu = (api: TerminalApi) => {
    api.println("");
    api.println("MENU ----------------------------------");
    api.println("  1. See all cars");
    api.println("  2. Search for a car (year + model)");
    api.println("  3. Add a new car");
    api.println("  4. Delete a car");
    api.println("  5. Compare cars");
    api.println("  6. Update the price of a car");
    api.println("  8. Exit");
    api.setPrompt("Enter a choice: ");
    state = "menu";
  };

  return {
    boot(api) {
      api.println("Car Database");
      api.println("A C++ hash-table CLI - reimplemented in the browser.");
      api.println(`${cars.length} cars loaded.`);
      showMenu(api);
    },

    input(line, api) {
      const text = line.trim();

      switch (state) {
        case "menu":
          if (text === "1") {
            api.println("");
            api.println(`All cars (${cars.length}):`);
            cars.forEach((c, i) => api.println(`  ${String(i + 1).padStart(2)}. ${carLine(c)}`));
            showMenu(api);
          } else if (text === "2") {
            draft = {};
            state = "search-year";
            api.setPrompt("Enter year of the car to search for: ");
          } else if (text === "3") {
            draft = {};
            state = "add-year";
            api.setPrompt("Enter the year of the car: ");
          } else if (text === "4") {
            draft = {};
            state = "delete-year";
            api.setPrompt("Enter the year of the car to delete: ");
          } else if (text === "5") {
            compareList = [];
            draft = {};
            state = "compare-year";
            api.setPrompt("Enter year of a car to compare: ");
          } else if (text === "6") {
            draft = {};
            state = "update-year";
            api.setPrompt("Enter the year of the car to update: ");
          } else if (text === "8") {
            api.println("Goodbye! The menu is still here whenever you want.");
            showMenu(api);
          } else {
            api.println("  Invalid choice - enter 1-6 or 8.");
            api.setPrompt("Enter a choice: ");
          }
          break;

        // ---- Search ----
        case "search-year": {
          const y = parseYear(text);
          if (y === null) return api.println("  Invalid year, enter again: ");
          draft.year = y;
          state = "search-model";
          api.setPrompt("Enter model of the car to search for: ");
          break;
        }
        case "search-model": {
          const found = matchesFor(draft.year!, text);
          if (!found.length) api.println("  Not found.");
          else {
            api.println(`  Found ${found.length}:`);
            found.forEach((c) => api.println("   - " + carLine(c)));
          }
          showMenu(api);
          break;
        }

        // ---- Add ----
        case "add-year": {
          const y = parseYear(text);
          if (y === null) return api.println("  Invalid year, enter again: ");
          draft.year = y;
          state = "add-brand";
          api.setPrompt("Enter the brand: ");
          break;
        }
        case "add-brand":
          if (!text) return api.println("  Invalid brand, enter again: ");
          draft.make = text;
          state = "add-model";
          api.setPrompt("Enter the model: ");
          break;
        case "add-model":
          if (!text) return api.println("  Invalid model, enter again: ");
          draft.model = text;
          state = "add-city";
          api.setPrompt("Enter the city MPG: ");
          break;
        case "add-city": {
          const m = parseInt2(text);
          if (m === null) return api.println("  Invalid MPG, enter again: ");
          draft.city = m;
          state = "add-hwy";
          api.setPrompt("Enter the highway MPG: ");
          break;
        }
        case "add-hwy": {
          const m = parseInt2(text);
          if (m === null) return api.println("  Invalid MPG, enter again: ");
          draft.hwy = m;
          state = "add-price";
          api.setPrompt("Enter the starting price: ");
          break;
        }
        case "add-price": {
          const p = parsePrice(text);
          if (p === null) return api.println("  Invalid price, enter again: ");
          const car: Car = { year: draft.year!, make: draft.make!, model: draft.model!, city: draft.city!, hwy: draft.hwy!, price: p };
          cars.push(car);
          api.println("  " + carLine(car));
          api.println("  added.");
          showMenu(api);
          break;
        }

        // ---- Delete ----
        case "delete-year": {
          const y = parseYear(text);
          if (y === null) return api.println("  Invalid year, enter again: ");
          draft.year = y;
          state = "delete-model";
          api.setPrompt("Enter the model of the car to delete: ");
          break;
        }
        case "delete-model": {
          const removed = matchesFor(draft.year!, text);
          if (!removed.length) {
            api.println("  Car not found.");
          } else {
            cars = cars.filter((c) => !(c.year === draft.year && c.model.toLowerCase() === text.toLowerCase()));
            removed.forEach((c) => api.println("  " + carLine(c)));
            api.println(`  deleted (${removed.length}).`);
          }
          showMenu(api);
          break;
        }

        // ---- Update price ----
        case "update-year": {
          const y = parseYear(text);
          if (y === null) return api.println("  Invalid year, enter again: ");
          draft.year = y;
          state = "update-model";
          api.setPrompt("Enter the model of the car to update: ");
          break;
        }
        case "update-model": {
          const found = matchesFor(draft.year!, text);
          if (!found.length) {
            api.println("  Car not found.");
            showMenu(api);
            break;
          }
          draft.matches = found;
          api.println(`  Found ${found.length}:`);
          found.forEach((c) => api.println("   - " + carLine(c)));
          state = "update-price";
          api.setPrompt("Enter the price to update the car to: ");
          break;
        }
        case "update-price": {
          const p = parsePrice(text);
          if (p === null) return api.println("  Invalid price, enter again: ");
          draft.matches!.forEach((c) => (c.price = p));
          api.println(`  Updated ${draft.matches!.length} car(s) to ${money(p)}.`);
          showMenu(api);
          break;
        }

        // ---- Compare ----
        case "compare-year": {
          const y = parseYear(text);
          if (y === null) return api.println("  Invalid year, enter again: ");
          draft.year = y;
          state = "compare-model";
          api.setPrompt("Enter model of a car to compare: ");
          break;
        }
        case "compare-model": {
          const found = matchesFor(draft.year!, text);
          if (!found.length) {
            api.println("  Car not found.");
          } else {
            compareList.push(found[0]);
            api.println("  Added: " + carLine(found[0]));
          }
          state = "compare-again";
          api.setPrompt("Enter y to add another car, n to compare: ");
          break;
        }
        case "compare-again": {
          if (text.toLowerCase().startsWith("y")) {
            draft = {};
            state = "compare-year";
            api.setPrompt("Enter year of a car to compare: ");
            break;
          }
          if (compareList.length < 2) {
            api.println("  Need at least two cars to compare.");
          } else {
            api.println("");
            api.println("Comparison:");
            compareList.forEach((c) => api.println("  " + carLine(c)));
            const best = (fn: (c: Car) => number, dir: number) => compareList.reduce((a, b) => (dir * fn(b) > dir * fn(a) ? b : a));
            const eff = best((c) => c.city + c.hwy, 1);
            const cheap = best((c) => c.price, -1);
            api.println(`  Most efficient: ${eff.year} ${eff.make} ${eff.model} (${eff.city}/${eff.hwy} MPG)`);
            api.println(`  Cheapest: ${cheap.year} ${cheap.make} ${cheap.model} (${money(cheap.price)})`);
          }
          showMenu(api);
          break;
        }
      }
    },
  };
}
