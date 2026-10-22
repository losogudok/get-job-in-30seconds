import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mapLimit } from './mapLimit.ts';

test('преобразует элементы и возвращает результаты', async () => {
  const result = await mapLimit(
    ['cat', 'hello'],
    2,
    async (word) => word.length,
  );

  assert.deepEqual(result, [3, 5]);
});

test('количество запущенных workers равно limit', async () => {
  let active = 0;
  let maxActive = 0;

  await mapLimit(
    ['cat', 'hello', 'world', 'typescript', 'nodejs'],
    2,
    async (item) => {
      active++;
      maxActive = Math.max(maxActive, active);

      try {
        await new Promise(resolve => setTimeout(resolve, 20));
        return item;
      } finally {
        active--;
      }
    },
  );

  assert.equal(maxActive, 2);
  assert.equal(active, 0);
});

test('сохраняет порядок результатов', async () => {
  const delays = [50, 10, 10, 10, 10];
  const result = await mapLimit(
    ['cat', 'hello', 'world', 'typescript', 'nodejs'],
    2,
    async (item, index) => {
      await new Promise(resolve => setTimeout(resolve, delays[index]));
      return item;
    },
  );

  assert.deepEqual(result, ['cat', 'hello', 'world', 'typescript', 'nodejs']);
});