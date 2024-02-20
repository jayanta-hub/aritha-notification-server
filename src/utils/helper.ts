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
