import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Path} from 'react-native-svg';
import {
  LENGTH_ONE_SECTION,
  MARGIN_FROM_RIGHT,
  MARGIN_FROM_TOP,
} from './constants';

const getPreviousDPath = ({
  data,
  chartData,
  index,
  itemWidth,
  chartHeight,
  yAxisLimits,
  path,
}) => {
  const diffCurrentPrev =
    Math.floor(data.dataIndex / LENGTH_ONE_SECTION) * LENGTH_ONE_SECTION -
    data.prevValueIndex;
  let finalDiff = diffCurrentPrev - 1;
  if (index === chartData.length - 1) {
    finalDiff = finalDiff - LENGTH_ONE_SECTION;
  }

  const lastX = -(finalDiff * itemWidth + itemWidth / 2);

  const lastY =
    MARGIN_FROM_TOP +
    chartHeight -
    ((data.previousValue - yAxisLimits.min) /
      (yAxisLimits.max - yAxisLimits.min)) *
      chartHeight;

  path += `M${lastX} ${lastY}`;
  return path;
};

const getNextDPath = ({data, itemWidth, chartHeight, yAxisLimits, path}) => {
  let finalDiff =
    data.nextValueIndex -
    data.prevValueIndex +
    (data.prevValueIndex % LENGTH_ONE_SECTION);
  if (data.dataIndex - data.prevValueIndex > LENGTH_ONE_SECTION) {
    finalDiff = data.nextValueIndex - data.dataIndex + LENGTH_ONE_SECTION;
  }
  if (data.dataIndex === LENGTH_ONE_SECTION) {
    finalDiff = finalDiff - 1;
  }
  const nextX = finalDiff * itemWidth + itemWidth / 2;
  const nextY =
    MARGIN_FROM_TOP +
    chartHeight -
    ((data.nextValue - yAxisLimits.min) / (yAxisLimits.max - yAxisLimits.min)) *
      chartHeight;

  path += `L${nextX} ${nextY}`;
  return path;
};

const getDPath = ({chartHeight, chartData, yAxisLimits, itemWidth}) => {
  if (yAxisLimits.max === 0) {
    return '';
  }

  let prefix = 'M';
  const dPath = chartData.reduce((path, data, index) => {
    const x = index * itemWidth + MARGIN_FROM_RIGHT + itemWidth / 2;
    const y =
      MARGIN_FROM_TOP +
      chartHeight -
      ((data.value - yAxisLimits.min) / (yAxisLimits.max - yAxisLimits.min)) *
        chartHeight;

    if (prefix === 'M' && data.value && data.prevValueIndex) {
      path = getPreviousDPath({
        data,
        chartData,
        index,
        itemWidth,
        chartHeight,
        yAxisLimits,
        path,
      });
      prefix = 'L';
      if (data.value) {
        path += `L${x} ${y}`;
      }
      return path;
    }
    if (index === chartData.length - 1 && data.nextValue && !data.value) {
      if (prefix === 'M' && !data.value) {
        path = getPreviousDPath({
          data,
          chartData,
          index,
          itemWidth,
          chartHeight,
          yAxisLimits,
          path,
        });
        prefix = 'L';
      }
      path = getNextDPath({
        data,
        itemWidth,
        chartHeight,
        yAxisLimits,
        path,
      });

      return path;
    }

    if (!data.value) {
      return path;
    }

    path += `${prefix}${x} ${y}`;

    prefix = 'L';

    return path;
  }, '');
  return dPath;
};

const LineChart = ({chartHeight, chartData, yAxisLimits, itemWidth}) => {
  const dPath = useMemo(
    () =>
      getDPath({
        chartHeight,
        chartData,
        yAxisLimits,
        itemWidth,
      }),
    [chartHeight, chartData, yAxisLimits, itemWidth],
  );
  return <Path d={dPath} stroke="#000" strokeWidth={1.5} fill="none" />;
};

LineChart.propTypes = {
  chartHeight: PropTypes.number,
  chartData: PropTypes.object,
  yAxisLimits: PropTypes.object,
  itemWidth: PropTypes.number,
};

export default LineChart;
