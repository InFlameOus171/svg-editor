import { __awaiter } from "tslib";
import { partition } from './util';
it(`Splits an array into two arrays, where the first array contains the values that satisfy the requirements of the aggregate function, 
    and the second array contains those that do not`, () => __awaiter(void 0, void 0, void 0, function* () {
    const given = [-1, -2, -3, 1, 2, 3];
    const expectation = [
        [1, 2, 3],
        [-1, -2, -3],
    ];
    const aggregateFunction = (value) => value >= 0;
    const result = partition(given, aggregateFunction);
    expect(result).toEqual(expectation);
}));
//# sourceMappingURL=util.test.js.map