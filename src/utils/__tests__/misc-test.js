import { initialsFromName, numberWithSeparators, deeperMerge } from '../misc';

describe('numberWithSeparators', () => {
  test('do not change a small number', () => {
    expect(numberWithSeparators(0)).toEqual('0');
    expect(numberWithSeparators(123)).toEqual('123');
  });

  test('separates numbers with commas at 10 ^ 3', () => {
    expect(numberWithSeparators(12345)).toEqual('12,345');
    expect(numberWithSeparators(-12345)).toEqual('-12,345');
    expect(numberWithSeparators(1234567890)).toEqual('1,234,567,890');
  });
});

describe('deeperMerge', () => {
  test('two empty objects merge into an empty object', () => {
    const a = {};
    const b = {};
    const expectedResult = {};

    const result = deeperMerge(a, b);

    expect(result).toEqual(expectedResult);
  });

  test('two shallow objects get both keys', () => {
    const a = { key1: 1 };
    const b = { key2: 2 };
    const expectedResult = {
      key1: 1,
      key2: 2,
    };

    const result = deeperMerge(a, b);

    expect(result).toEqual(expectedResult);
  });

  test('two deep objects get both keys if keys differ', () => {
    const a = { parentKey1: { key1: 1 } };
    const b = { parentKey2: { key2: 2 } };
    const expectedResult = {
      parentKey1: { key1: 1 },
      parentKey2: { key2: 2 },
    };

    const result = deeperMerge(a, b);

    expect(result).toEqual(expectedResult);
  });

  test('two deep object return a merged key if keys are the same', () => {
    const a = { parentKey: { key1: 1 } };
    const b = { parentKey: { key2: 2 } };
    const expectedResult = { parentKey: { key1: 1, key2: 2 } };

    const result = deeperMerge(a, b);

    expect(result).toEqual(expectedResult);
  });

  test('objects are merged only two levels deep, then the second one overwrites the first one', () => {
    const a = { grandpaKey: { parentKey: { key1: 1 } } };
    const b = { grandpaKey: { parentKey: { key2: 2 } } };
    const expectedResult = { grandpaKey: { parentKey: { key2: 2 } } };

    const result = deeperMerge(a, b);

    expect(result).toEqual(expectedResult);
  });
});

describe('initialsFromName', () => {
  test('empty string returns empty strings of initials', () => {
    const initials = initialsFromName('');
    expect(initials).toEqual('');
  });

  test('a single name has a single letter initial', () => {
    const initials = initialsFromName('John');
    expect(initials).toEqual('J');
  });

  test('two names result in two initials', () => {
    const initials = initialsFromName('John Doe');
    expect(initials).toEqual('JD');
  });

  test('initials are always upper case', () => {
    const initials = initialsFromName('small caps');
    expect(initials).toEqual('SC');
  });

  test('double names produce one initial', () => {
    expect(initialsFromName('Jean-Pierre')).toEqual('J');
    expect(initialsFromName("Mc'Donald")).toEqual('M');
  });
});
