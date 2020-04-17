// From https://github.com/reactjs/react-redux/blob/master/src/utils/shallowEqual.js
export const shallowEqual = (objA, objB) => {
  if (objA === objB) {
    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
};

export const getDisplayName = Component =>
  Component.displayName || Component.name || 'UnknownComponent';

const resolved = Promise.resolve();
export const defer = f => {
  resolved.then(f);
};

const isPlainObject = (value: unknown): value is object =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const removeEmptyKey = (obj: object) => {
  Object.keys(obj).forEach(key => {
    const value = obj[key];

    if (!isPlainObject(value)) {
      return;
    }

    if (!objectHasKeys(value)) {
      delete obj[key];
    } else {
      removeEmptyKey(value);
    }
  });

  return obj;
};

export function addAbsolutePositions(hits, perPage, page) {
  return hits.map((hit, index) => ({
    ...hit,
    __position: perPage * page + index + 1,
  }));
}

export function addQueryID(hits, queryID) {
  if (!queryID) {
    return hits;
  }
  return hits.map(hit => ({
    ...hit,
    __queryID: queryID,
  }));
}

export function find<TItem = any>(
  array: TItem[],
  comparator: (item: TItem) => boolean
): TItem | undefined {
  if (!Array.isArray(array)) {
    return undefined;
  }

  for (let i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return array[i];
    }
  }
  return undefined;
}

export function objectHasKeys(object: object | undefined) {
  return object && Object.keys(object).length > 0;
}

// https://github.com/babel/babel/blob/3aaafae053fa75febb3aa45d45b6f00646e30ba4/packages/babel-helpers/src/helpers.js#L604-L620
export function omit(source: { [key: string]: any }, excluded: string[]) {
  if (source === null || source === undefined) {
    return {};
  }
  const target = {};
  const sourceKeys = Object.keys(source);
  for (let i = 0; i < sourceKeys.length; i++) {
    const key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) {
      // eslint-disable-next-line no-continue
      continue;
    }
    target[key] = source[key];
  }
  return target;
}

/**
 * Retrieve the value at a path of the object:
 *
 * @example
 * getPropertyByPath(
 *   { test: { this: { function: [{ now: { everyone: true } }] } } },
 *   'test.this.function[0].now.everyone'
 * ); // true
 *
 * getPropertyByPath(
 *   { test: { this: { function: [{ now: { everyone: true } }] } } },
 *   ['test', 'this', 'function', 0, 'now', 'everyone']
 * ); // true
 *
 * @param object Source object to query
 * @param path either an array of properties, or a string form of the properties, separated by .
 */
export const getPropertyByPath = (object: object, path: string[] | string) =>
  (Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)]/g, '.$1').split('.')
  ).reduce((current, key) => (current ? current[key] : undefined), object);
