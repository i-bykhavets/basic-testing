import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const testUrl = 'https://test.page.com';
    const data = [
      { id: 0, name: 'User1' },
      { id: 1, name: 'User2' },
      { id: 2, name: 'User3' },
    ];

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data }),
    });

    await throttledGetDataFromApi(testUrl);

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const testUrl = 'https://test.page.com';
    const data = [
      { id: 0, name: 'User1' },
      { id: 1, name: 'User2' },
      { id: 2, name: 'User3' },
    ];

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data }),
    });

    await throttledGetDataFromApi(testUrl);

    jest.runAllTimers();

    const instance = axios.create();
    expect(instance.get).toHaveBeenCalledWith(testUrl);
  });

  test('should return response data', async () => {
    const testUrl = 'https://test.page.com';
    const data = [
      { id: 0, name: 'User1' },
      { id: 1, name: 'User2' },
      { id: 2, name: 'User3' },
    ];

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data }),
    });

    const responseDate = await throttledGetDataFromApi(testUrl);

    expect(responseDate).toBe(data);
  });
});
