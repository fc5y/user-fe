/**
 * This is util to get the range number of pagination
 * @param {number} chosen
 * @param {number} numberOfPage
 */
export const getSeriesOfPagination = (chosen, numberOfPage) => {
  if (!chosen || !numberOfPage || chosen > numberOfPage) {
    return [];
  }

  if (numberOfPage <= 5) {
    return Array.from({ length: numberOfPage }, (_, i) => i + 1);
  }

  if (chosen <= 3) {
    return [1, 2, 3, 4, '...', numberOfPage];
  }

  if (chosen >= numberOfPage - 2 && chosen <= numberOfPage) {
    return [1, '...', numberOfPage - 3, numberOfPage - 2, numberOfPage - 1, numberOfPage];
  }

  return [1, '...', chosen - 1, chosen, chosen + 1, '...', numberOfPage];
};
