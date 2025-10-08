import { deepEqual } from 'node:assert/strict'
import { productSearch } from "node:test"
productSearch('it works', () => {
    deepEqual(0, 0);
})