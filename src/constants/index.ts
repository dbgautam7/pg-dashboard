import { ISelectOptions } from "../types";

export const transactionFilterOptions: ISelectOptions[] = [
  { value: "in", label: "Payment In Transaction" },
  { value: "out", label: "Payment Out Transaction" },
];
export const statusFilterOptions: ISelectOptions[] = [
  { value: "", label: "All" },
  { value: "initiate", label: "Initiate" },
  { value: "pending", label: "Pending" },
  { value: "success", label: "Success" },
  { value: "failed", label: "Failed" },
];

export const dateRangeFilterOptions: ISelectOptions[] = [
  {
    label: "Last Day",
    value: "last_day",
  },
  {
    label: "Last 3 Days",
    value: "last_3_days",
  },
  {
    label: "Last Week",
    value: "last_week",
  },
  {
    label: "Last Month",
    value: "last_month",
  },
];
