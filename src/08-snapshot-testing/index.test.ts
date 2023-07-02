import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const lastNode = { value: null, next: null };
    const fourthNode = { value: 1, next: lastNode };
    const thirdNode = { value: 1, next: fourthNode };
    const secondNode = { value: 1, next: thirdNode };
    const firstNode = { value: 1, next: secondNode };
    const expectedListHead = firstNode;

    const elementsForList = [1, 1, 1, 1];

    expect(generateLinkedList(elementsForList)).toStrictEqual(expectedListHead);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elementsForList = [2, 2, 2, 2, 2, 2, 2, 2];
    expect(generateLinkedList(elementsForList)).toMatchSnapshot();
  });
});
