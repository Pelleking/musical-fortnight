import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('dogSearch endpoint', () => {
  describe('Zero - no dogs found', () => {
    it('should return empty array when no dogs match the search criteria', async () => {
      const response = await fetch('http://localhost:3000/dogSearch?breed=nonexistent');
      const data = await response.json();
      
      assert.strictEqual(response.status, 200);
      assert.deepStrictEqual(data, []);
    });
  });

  describe('One - single dog found', () => {
    it('should return array with one dog when search matches exactly one dog', async () => {
      const response = await fetch('http://localhost:3000/dogSearch?breed=poodle');
      const data = await response.json();
      
      assert.strictEqual(response.status, 200);
      assert.strictEqual(data.length, 1);
      assert.strictEqual(data[0].breed, 'poodle');
      assert.ok(data[0].name);
      assert.ok(data[0].id);
    });
  });

  describe('Many - multiple dogs found', () => {
    it('should return array with multiple dogs when search matches many dogs', async () => {
      const response = await fetch('http://localhost:3000/dogSearch?breed=labrador');
      const data = await response.json();
      
      assert.strictEqual(response.status, 200);
      assert.ok(data.length > 1);
      data.forEach((dog: any) => {
        assert.strictEqual(dog.breed, 'labrador');
        assert.ok(dog.name);
        assert.ok(dog.id);
      });
    });
  });
});
