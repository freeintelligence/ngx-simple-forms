export function addGetterSetter<T>(
  obj: any,
  path: string,
  callback: (oldValue: T, newValue: T) => void
) {
  const parts = path.split('.');
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current)) {
      return;
    }
    current = current[part];
  }

  const lastKey = parts[parts.length - 1];
  let value = current[lastKey];

  Object.defineProperty(current, lastKey, {
    get() {
      return value;
    },
    set(newValue) {
      const oldValue = value;
      value = newValue;
      callback(oldValue, newValue);
    },
    enumerable: true,
    configurable: true,
  });
}
