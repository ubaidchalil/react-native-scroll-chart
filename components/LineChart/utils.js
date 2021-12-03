import dayjs from 'dayjs';
import {LENGTH_ONE_SECTION} from './constants';

export const getDatesAndAverage = ({
  dataList,
  currIndex,
  chartColumns = 7,
  chartType = 'week',
}) => {
  let totalOfValue = 0;
  let totalOfNotNullValue = 0;
  const dates = {startDate: '', endDate: ''};

  for (let i = currIndex - chartColumns; i < currIndex; i++) {
    const {value, date, startDate, endDate} = dataList[i];

    if (i === currIndex - chartColumns) {
      if (chartType === 'week') {
        dates.startDate = date;
      } else {
        dates.startDate = startDate;
      }
    }

    if (i === currIndex - 1) {
      if (chartType === 'week') {
        dates.endDate = date;
      } else {
        dates.endDate = endDate;
      }
    }

    totalOfValue += value || 0;
    totalOfNotNullValue += value ? 1 : 0;
  }

  const _average = totalOfValue / totalOfNotNullValue;
  const average = isNaN(_average) ? '--' : _average;
  const title = `${dayjs(dates.startDate).format('DD MMM')} - ${dayjs(
    dates.endDate,
  ).format('DD MMM')}`;
  return [average, title];
};

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
    const dataArrayIndex = Math.ceil((i + 1) / LENGTH_ONE_SECTION);
    let dataIndex = (i + 1) % LENGTH_ONE_SECTION;
    dataIndex = dataIndex === 0 ? LENGTH_ONE_SECTION : dataIndex;
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
      data1.push({key: i * LENGTH_ONE_SECTION, value: 101, day: 'Sun'});
    }
    for (let j = 0; j < LENGTH_ONE_SECTION; j++) {
      data1.push({
        key: i * LENGTH_ONE_SECTION + j + 1,
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
  const sectionCount = Math.ceil(length / LENGTH_ONE_SECTION);
  for (let i = 0 + currentIndex; i < sectionCount; i++) {
    const endPositionDiff = LENGTH_ONE_SECTION;
    const startPositionDiff = i > 0 ? 1 : 0;
    const startPosition = i * LENGTH_ONE_SECTION - startPositionDiff;
    let endPosition = i * LENGTH_ONE_SECTION + endPositionDiff;
    endPosition = i === sectionCount - 1 ? length : endPosition;
    data.push(dataArr.slice(startPosition, endPosition));
  }
  return data;
};
