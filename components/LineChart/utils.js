import dayjs from 'dayjs';

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

    const value = dataList[dataArrayIndex - 1][dataIndex - 1]?.value;

    if (value < min) {
      min = value || 0;
    }
    if (value > max) {
      max = value || 0;
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

export const getData2 = (dataArr, currentIndex = 0) => {
  const data = [];

  const length = dataArr.length;

  const sectionCount = Math.ceil(length / 35);
  for (let i = 0 + currentIndex; i < sectionCount; i++) {
    const endPositionDiff = i > 0 ? 36 : 35;
    const startPositionDiff = i > 0 ? 1 : 0;
    const startPosition = i * 35 - startPositionDiff;
    let endPosition = i * 35 + endPositionDiff;
    endPosition = i === sectionCount - 1 ? length : endPosition;
    data.push(dataArr.slice(startPosition, endPosition));
  }
  return data;
};

// weekly | monthly;

const lastEnrty = '2021-11-30';

const weekendDate = '2021-12-05';

const monthly = [
  {
    startDate: '2021-11-29',
    endDate: '2021-12-05',
    value: 0,
    previousValue: null,
    label: '11/29-12/5',
  },
  {
    startDate: '2021-11-29',
    endDate: '2021-12-05',
    value: 210,
    previousValue: 0,
    label: '11/29-12/5',
  },
];
