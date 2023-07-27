import { CreateDataGridOptions } from "../types";

export const getDefaultOptions = <T extends object>(options: CreateDataGridOptions<T>) =>
  ({
    shouldFlexGrowCells: false,
    pagination: "on",
    pageSize: 20,
    ...options,
  }) as Required<CreateDataGridOptions<T>>;
