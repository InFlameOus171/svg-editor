import { Partition } from '../../types/util.types';
import { partition } from './util';

it(`Splits an array into two arrays, where the first array contains the values that satisfy the requirements of the aggregate function, 
    and the second array contains those that do not`, async () => {
  const given: number[] = [-1, -2, -3, 1, 2, 3];
  const expectation: Partition<number> = [
    [1, 2, 3],
    [-1, -2, -3],
  ];
  const aggregateFunction = (value: number) => value >= 0;
  const result = partition(given, aggregateFunction);
  console.log(result);
  expect(result).toEqual(expectation);
});
