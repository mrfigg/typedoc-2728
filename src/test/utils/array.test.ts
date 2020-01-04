import { deepStrictEqual as equal } from 'assert';
import { insertPrioritySorted } from '../../lib/utils';
import { binaryFindPartition } from '../../lib/utils/array';

describe('Array utils', () => {
    describe('insertPrioritySorted', () => {
        const item1 = { priority: 1 };
        const item2 = { priority: 2 };
        const item3 = { priority: 3 };
        const item4 = { priority: 4 };

        it('works with an empty array', () => {
            equal(insertPrioritySorted([], item1), [item1]);
        });

        it('inserts at the start', () => {
            equal(insertPrioritySorted([item2], item1), [item1, item2]);
        });

        it('inserts in the middle', () => {
            equal(insertPrioritySorted([item1, item3], item2), [item1, item2, item3]);
        });

        it('inserts at the end', () => {
            equal(insertPrioritySorted([item2, item3], item4), [item2, item3, item4]);
        });

        it('inserts new items first', () => {
            const item0 = { priority: 1, first: true };
            equal(insertPrioritySorted([item1], item0), [item0, item1]);
        });
    });

    describe('binaryFindPartition', () => {
        it('works with empty array', () => {
            equal(binaryFindPartition([], () => true), -1);
        });

        it('works with one item', () => {
            equal(binaryFindPartition([1], () => true), 0);
        });

        it('works with more items', () => {
            equal(binaryFindPartition([1, 2, 3], n => n > 2), 2);
            equal(binaryFindPartition([1, 2, 3, 4, 5, 6, 7], n => n > 5), 5);
        });

        it('works with no partition', () => {
            equal(binaryFindPartition([1, 2, 3], n => false), -1);
        });

        it('works with big arrays', () => {
            const index = 50168;
            const arr = Array.from<number>({ length: 1e5 })
                .fill(0, 0, index)
                .fill(1, index);

            equal(binaryFindPartition(arr, v => v === 1), index);
        });
    });
});
