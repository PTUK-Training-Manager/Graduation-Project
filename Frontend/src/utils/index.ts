import {IdName} from "../types";

// @ts-ignore
export const isProduction = import.meta.env.PROD;

export const convertToIdName = (arr: Array<string>): Array<IdName> =>
    arr.map((item, index) => ({
        id: index.toString(),
        name: item,
    }))