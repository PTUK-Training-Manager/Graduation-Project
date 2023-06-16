import {IdName} from "../types";

// @ts-ignore
export const isProduction = import.meta.env.PROD;

export const convertToIdName = (arr: Array<string>): Array<IdName> =>
    arr.map((item, index) => ({
        id: index.toString(),
        name: item,
    }))

export const isNil = <T>(value: T | null | undefined): value is null | undefined => {
    return value === null || value === undefined;
}

export const isEmptyString = (value: string): boolean => value.trim().length === 0;

export const isEmptyToken = (token: string | null): boolean => {
    return !token || token === "";
}