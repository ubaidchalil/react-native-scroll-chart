export const getMaxAndMin = ({
  dataArray,
  prevMin,
  prevMax,
  currIndex,
  diff = 10,
}) => {
  let min = dataArray[currIndex - 7].value;
  let max = dataArray[currIndex - 7].value;

  for (let i = currIndex - 7; i < currIndex; i++) {
    if (dataArray[i].value < min) {
      min = dataArray[i].value;
    }
    if (dataArray[i].value > max) {
      max = dataArray[i].value;
    }
  }
  min = min - diff < 0 ? 0 : min - diff;
  max = max + diff + 1;
  return [min, max];
};
