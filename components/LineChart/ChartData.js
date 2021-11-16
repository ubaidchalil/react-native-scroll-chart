import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Svg, {G, Line, Path} from 'react-native-svg';
import {
  MARGIN_FROM_TOP,
  MARGIN_FROM_RIGHT,
  MARGIN_FROM_BOTTOM,
} from './constants';
import ChartElements from './ChartElements';
import XAxis from './XAxis';

const getDPath = ({
  chartHeight,
  chartData,
  extrema,
  lastValue,
  nextValue,
  itemWidth,
}) => {
  if (extrema.max === 0) {
    return '';
  }

  const dPath = chartData.reduce((path, data, index) => {
    const x = index * itemWidth + MARGIN_FROM_RIGHT + itemWidth / 2;
    const y =
      MARGIN_FROM_TOP +
      chartHeight -
      ((data.value - extrema.min) / (extrema.max - extrema.min)) * chartHeight;
    if (index === 0 && lastValue) {
      const lastX = -(MARGIN_FROM_RIGHT + itemWidth / 2);
      const lastY =
        MARGIN_FROM_TOP +
        chartHeight -
        ((lastValue - extrema.min) / (extrema.max - extrema.min)) * chartHeight;
      path += `M${lastX} ${lastY}L${x} ${y}`;
      return path;
    }

    if (index === chartData.length - 1 && nextValue) {
      const nextX = (index + 1) * itemWidth + MARGIN_FROM_RIGHT + itemWidth / 2;
      const nextY =
        MARGIN_FROM_TOP +
        chartHeight -
        ((nextValue - extrema.min) / (extrema.max - extrema.min)) * chartHeight;
      path += `L${x} ${y}L${nextX} ${nextY}`;
      return path;
    }

    const prefix = index === 0 ? 'M' : 'L';
    path += `${prefix}${x} ${y}`;
    return path;
  }, '');
  return dPath;
};

const LineChart = ({
  chartHeight,
  chartData,
  extrema,
  lastValue,
  nextValue,
  itemWidth,
}) => {
  const dPath = useMemo(
    () =>
      getDPath({
        chartHeight,
        chartData,
        extrema,
        lastValue,
        nextValue,
        itemWidth,
      }),
    [chartHeight, chartData, extrema, lastValue, nextValue, itemWidth],
  );
  return <Path d={dPath} stroke="#000" strokeWidth={1} fill="none" />;
};

const Chart = ({
  containerHeight,
  chartData,
  extrema,
  left = 0,
  lastValue,
  nextValue,
  itemWidth,
}) => {
  const xAxisX1Point = MARGIN_FROM_RIGHT;
  const xAxisY1Point = containerHeight - MARGIN_FROM_BOTTOM;
  const xAxisX2Point = xAxisX1Point + itemWidth * chartData.length;
  const xAxisY2Point = containerHeight - MARGIN_FROM_BOTTOM;
  const chartHeight = containerHeight - MARGIN_FROM_TOP - MARGIN_FROM_BOTTOM;

  return (
    <Svg
      width={xAxisX1Point + itemWidth * chartData.length}
      style={[styles.svgContainer, {left}]}>
      <G>
        <LineChart
          {...{
            chartHeight,
            chartData,
            extrema,
            lastValue,
            nextValue,
            itemWidth,
          }}
        />

        <ChartElements
          {...{
            extrema,
            chartData,
            xAxisX1Point,
            chartHeight,
            xAxisY1Point,
            itemWidth,
          }}
        />
        <XAxis {...{xAxisX1Point, xAxisY1Point, xAxisX2Point, xAxisY2Point}} />
      </G>
    </Svg>
  );
};

const styles = StyleSheet.create({
  svgContainer: {
    height: 250,
    zIndex: 6,
    backgroundColor: '#fff',
    position: 'absolute',
  },
});

export default Chart;
