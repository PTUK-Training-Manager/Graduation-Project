export const noop = () => {};

export const noopArray = () => [];

export const notImplementedYet = (...args: any) => {
    throw new Error("Not Implemented yet!");
};

export const isEmptyObject = (objectName: object | null | undefined) => {
    return (
      objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
    );
  };

export const identity = <T>(v: T) => v;