import { subDays } from "date-fns";

export const getDateRange = (value: string | number) => {
  const today = new Date();
  let startDate;

  switch (value) {
    case "last_day":
      startDate = subDays(today, 1);
      break;
    case "last_3_days":
      startDate = subDays(today, 3);
      break;
    case "last_week":
      startDate = subDays(today, 7);
      break;
    case "last_month":
      startDate = subDays(today, 30);
      break;
    default:
      startDate = subDays(today, 7);
      break;
  }

  return { startDate, endDate: today };
};
