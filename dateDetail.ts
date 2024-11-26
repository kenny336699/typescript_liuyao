import { Solar } from "lunar-typescript";

export function getCurrentDateDetails(): {
  gregorian: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
  ganZhi: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
} {
  // Get current date
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // JavaScript months are 0-indexed
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Create Solar (Gregorian) date object
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, second);

  // Get the corresponding Lunar date
  const lunar = solar.getLunar();

  // Get Gan-Zhi (Heavenly Stems and Earthly Branches)
  const gzYear = lunar.getYearInGanZhi(); // Year's Gan-Zhi
  const gzMonth = lunar.getMonthInGanZhi(); // Month's Gan-Zhi
  const gzDay = lunar.getDayInGanZhi(); // Day's Gan-Zhi
  const gzHour = lunar.getTimeZhi(); // Hour's Gan-Zhi

  return {
    gregorian: {
      year,
      month,
      day,
      hour,
      minute,
      second,
    },
    ganZhi: {
      year: gzYear,
      month: gzMonth,
      day: gzDay,
      hour: gzHour,
    },
  };
}

// Example usage
function displayCurrentDateDetails(): void {
  const details = getCurrentDateDetails();

  console.log("Gregorian Date:");
  console.log(`Year: ${details.gregorian.year}`);
  console.log(`Month: ${details.gregorian.month}`);
  console.log(`Day: ${details.gregorian.day}`);
  console.log(`Hour: ${details.gregorian.hour}`);
  console.log(`Minute: ${details.gregorian.minute}`);
  console.log(`Second: ${details.gregorian.second}`);

  console.log("\nGan-Zhi:");
  console.log(`Year Gan-Zhi: ${details.ganZhi.year}`);
  console.log(`Month Gan-Zhi: ${details.ganZhi.month}`);
  console.log(`Day Gan-Zhi: ${details.ganZhi.day}`);
  console.log(`Hour Gan-Zhi: ${details.ganZhi.hour}`);
}
