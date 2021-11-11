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

export const getYAxisLabel = (max, min) => {
  const diff = max - min;
  const step = Math.round(diff / 3);
  const labels = [];
  for (let i = 0; i <= 3; i++) {
    labels.push(max - step * i);
  }
  return labels;
};

export const getData = () => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    const data1 = [];
    if (i > 0) {
      data1.push({key: i * 35, value: 101, day: 'Sun'});
    }
    for (let j = 0; j < 35; j++) {
      data1.push({key: i * 35 + j + 1, value: 101, day: 'Sun'});
    }

    data.push(data1);
  }

  return data;
};
