import { FilterFn } from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { isEmptyString } from "src/utils";

export const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const dateBetweenFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  const columnValue = row.getValue(columnId) as string; // YYYY-MM-DD
  const columnValueTimestamp = new Date(columnValue).getTime();

  if (Array.isArray(value)) {
    const [startDate, endDate] = value;

    const startDateTimestamp =
      !startDate || isEmptyString(startDate) ? null : new Date(startDate).getTime();

    const endDateTimestamp =
      !endDate || isEmptyString(endDate) ? null : new Date(endDate).getTime();

    let isBetween = true;

    if (startDateTimestamp && endDateTimestamp) {
      isBetween =
        columnValueTimestamp >= startDateTimestamp && columnValueTimestamp <= endDateTimestamp;
    } else if (startDateTimestamp) {
      isBetween = columnValueTimestamp >= startDateTimestamp;
    } else if (endDateTimestamp) {
      isBetween = columnValueTimestamp <= endDateTimestamp;
    }

    addMeta({
      isBetween,
    });

    return isBetween;
  }

  return true;
};

// Temporarily used to generate random dates for the table
export const generateRandomDate = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the time range in milliseconds
  const range = end.getTime() - start.getTime();

  // Generate a random number within the range
  const randomTime = Math.random() * range;

  // Calculate the timestamp for the random date
  const randomTimestamp = start.getTime() + randomTime;

  // Create a new Date object using the random timestamp
  return new Date(randomTimestamp).toISOString().slice(0, 10);
};
