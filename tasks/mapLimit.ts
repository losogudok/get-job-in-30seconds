// Требования:

// - Одновременно выполняется не больше `limit` вызовов `worker`.
// - Освободилось место — запускается следующая задача, без ожидания остальных.
// - Результаты возвращаются в порядке входных элементов, независимо от порядка завершения.
// - При первой ошибке общий Promise отклоняется, новые задачи больше не запускаются. Уже запущенные принудительно отменять не требуется.
// - Пустой массив возвращает `[]`; некорректный `limit` — ошибка. Допустимы только положительные целые числа.

// Например, при `limit = 2` запускаются задачи A и B. Если B закончилась раньше A, сразу запускается C. В результате всё равно должен быть порядок `[результат A, результат B, результат C]`.

// Напиши тесты на ограничение параллелизма, порядок результатов, ошибку и граничные случаи. Используй **`node:test` и `node:assert/strict`**, запуск TypeScript — через имеющийся `tsx`.

// Сначала сделай собственную попытку, затем разберём. Запиши фактическое время и места, где понадобилась документация.

export async function mapLimit<T, R>(
  items: readonly T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  if (limit <= 0 || !Number.isInteger(limit)) {
    throw new RangeError('Limit must be a positive integer');
  }

  let failed = false;
  let nextIndex = 0;
  const results: R[] = [];
  const workers: Promise<void>[] = [];

  async function runWorker() {
    while (!failed && nextIndex < items.length) {
      const index = nextIndex;
      nextIndex++;

      // Вызови worker для items[index] и дождись результата.
      // Запиши результат в results[index].
      try {
        const result = await worker(items[index], index);
        results[index] = result;
      } catch (error) {
        failed = true;
        throw error;
      }
    }
  }

  for (let i = 0; i < limit && i < items.length; i++) {
    workers.push(runWorker());
  }

  await Promise.all(workers);

  return results;
}
