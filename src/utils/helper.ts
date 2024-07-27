import { UnauthorizedException } from '@nestjs/common';

/**
 * The function `compareObject` compares two objects recursively to check if they have the same keys
 * and values.
 * @param {object} obj1 - An object representing the first object to compare.
 * @param {object} obj2 - I see you have a function `compareObject` that compares two objects
 * recursively. If you provide me with the `obj2` parameter, I can help you compare it with another
 * object using this function. Please provide the `obj2` object for comparison.
 * @returns The `compareObject` function is returning a boolean value - `true` if the two input objects
 * `obj1` and `obj2` are deeply equal (i.e., their properties have the same values), and `false`
 * otherwise.
 */
export function compareObject(obj1: object, obj2: object) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;
  const isObject = (object) => object !== null && typeof object === 'object';

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !compareObject(val1, val2)) ||
      (!areObjects && val1 !== val2)
    )
      return false;
  }
  return true;
}

/**
 * The ErrorMessage function in TypeScript throws an UnauthorizedException with the provided message.
 * @param {string} message - The `message` parameter in the `ErrorMessage` function is a string that
 * represents the error message that will be thrown when the function is called.
 */
export function ErrorMessage(message: string) {
  throw new UnauthorizedException(message);
}
