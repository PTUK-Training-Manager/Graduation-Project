import { FilterFn } from "@tanstack/react-table";
// import {FilterFnOption} from "@tanstack/table-core/src/features/Filters";
// import {RowData} from "@tanstack/table-core/src/types";

declare module "@tanstack/table-core" {
  interface FilterFns {
    dateBetween: FilterFn<unknown>;
    fuzzy: FilterFn<unknown>;
  }
}

export {};
