const ITEM_LENGTH_IN_SECTION = 7;
export const getMaxAndMin = ({
  dataList,
  currIndex,
  diff = 10,
  prevMin = 0,
  prevMax = 0,
  chartColumns = 7,
  dataType = 'weight',
}) => {
  let min = prevMin;
  let max = prevMax;

  for (let i = currIndex - chartColumns; i < currIndex; i++) {
    const dataArrayIndex = Math.ceil((i + 1) / ITEM_LENGTH_IN_SECTION);
    let dataIndex = (i + 1) % ITEM_LENGTH_IN_SECTION;
    dataIndex = dataIndex === 0 ? ITEM_LENGTH_IN_SECTION : dataIndex;
    dataIndex = dataArrayIndex > 1 ? dataIndex + 1 : dataIndex;
    if (dataType === 'weight') {
      min = min;
    }
    const {value, previousValue, nextValue} =
      dataList[dataArrayIndex - 1][dataIndex - 1];

    const checkingValue = value || previousValue || nextValue;

    const minValue = Math.min(
      checkingValue,
      previousValue || checkingValue,
      nextValue || checkingValue,
    );
    const maxValue = Math.max(
      checkingValue,
      previousValue || checkingValue,
      nextValue || checkingValue,
    );

    if (dataType === 'weight') {
      min = min || minValue;
      max = max || maxValue;
    }

    if (minValue < min) {
      min = minValue || 0;
    }
    if (maxValue > max) {
      max = maxValue || 0;
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
    labels.push(Math.round(max - step * i));
  }
  return labels;
};

export const getData = () => {
  const data = [];
  for (let i = 0; i < 40; i++) {
    const data1 = [];
    if (i > 0) {
      data1.push({key: i * ITEM_LENGTH_IN_SECTION, value: 101, day: 'Sun'});
    }
    for (let j = 0; j < ITEM_LENGTH_IN_SECTION; j++) {
      data1.push({
        key: i * ITEM_LENGTH_IN_SECTION + j + 1,
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
