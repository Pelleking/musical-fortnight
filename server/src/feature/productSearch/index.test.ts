import { deepEqual } from 'node:assert/strict'
import { test } from "node:test"
import { productSearch } from ''

test('it works', () => {
    deepEqual(0, 0);
})

test('zero test case', () => {
    const result = productSearch('');
    deepEqual(result, []);
})
