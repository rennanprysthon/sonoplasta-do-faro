export function parseToMatrix<T>(itemsPerRow: number, array: T[]): T[][] {
  return array.reduce((resultArray: T[][], item, index) => {
    const chunkIndex = Math.floor(index / itemsPerRow);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
}
