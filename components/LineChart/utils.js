export const getMaxAndMin = ({
  dataList,
  currIndex,
  diff = 10,
  prevMin = 0,
  prevMax = 0,
  chartColumns = 7,
}) => {
  let min = 100;
  let max = 100;

  for (let i = currIndex - chartColumns; i < currIndex; i++) {
    const dataArrayIndex = Math.ceil((i + 1) / 35);
    let dataIndex = (i + 1) % 35;
    dataIndex = dataIndex === 0 ? 35 : dataIndex;
    dataIndex = dataArrayIndex > 1 ? dataIndex + 1 : dataIndex;

    const value = dataList[dataArrayIndex - 1][dataIndex - 1].value;

    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  }

  if (min >= prevMin && min <= prevMin - 7) {
    min = prevMin;
  }
  if (max <= prevMax && max >= prevMax - 7) {
    max = prevMax;
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
  for (let i = 0; i < 40; i++) {
    const data1 = [];
    if (i > 0) {
      data1.push({key: i * 35, value: 101, day: 'Sun'});
    }
    for (let j = 0; j < 35; j++) {
      data1.push({
        key: i * 35 + j + 1,
        value: Math.floor(Math.random() * 100) + 100,
        day: 'Sun',
      });
    }

    data.push(data1);
  }

  return data;
};
