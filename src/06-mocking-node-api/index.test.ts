import path from 'node:path';
import fsPromises from 'node:fs/promises';

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const timeout = 500;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const timeout = 500;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const timeout = 500;
    const callback = jest.fn();

    doStuffByInterval(callback, timeout);

    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const timeout = 500;
    const callback = jest.fn();
    const callsAmount = 5;

    doStuffByInterval(callback, timeout);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout * callsAmount);

    expect(callback).toBeCalledTimes(callsAmount);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyPathJoin = jest.spyOn(path, 'join');
    const pathToFile = 'folder1/folder2/fake_file.txt';

    await readFileAsynchronously(pathToFile);

    expect(spyPathJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'folder1/folder2/fake_file.txt';

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './index.ts';
    const fileContent = 'Fake file content';
    const promise: Promise<string | Buffer> = new Promise((resolve) =>
      resolve(Buffer.from(fileContent, 'utf-8')),
    );

    jest.spyOn(fsPromises, 'readFile').mockReturnValue(promise);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toEqual(fileContent);
  });
});
