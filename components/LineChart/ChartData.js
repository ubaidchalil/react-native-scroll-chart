import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Svg, {
  G,
  Line,
  Text as SvgText,
  Path,
  Circle,
  Rect,
} from 'react-native-svg';
import {
  MARGIN_FROM_TOP,
  MARGIN_FROM_RIGHT,
  MARGIN_FROM_BOTTOM,
  ITEM_WIDTH,
} from './constants';

const getDPath = ({chartHeight, chartData, extrema, lastValue, nextValue}) => {
  if (extrema.max === 0) {
    return '';
  }

  const dPath = chartData.reduce((path, data, index) => {
    const x = index * ITEM_WIDTH + MARGIN_FROM_RIGHT + ITEM_WIDTH / 2;
    const y =
      MARGIN_FROM_TOP +
      chartHeight -
      ((data.value - extrema.min) / (extrema.max - extrema.min)) * chartHeight;
    if (index === 0 && lastValue) {
      const lastX = -(MARGIN_FROM_RIGHT + ITEM_WIDTH / 2);
      const lastY =
        MARGIN_FROM_TOP +
        chartHeight -
        ((lastValue - extrema.min) / (extrema.max - extrema.min)) * chartHeight;
      path += `M${lastX} ${lastY}L${x} ${y}`;
      return path;
    }

    if (index === chartData.length - 1 && nextValue) {
      const nextX =
        (index + 1) * ITEM_WIDTH + MARGIN_FROM_RIGHT + ITEM_WIDTH / 2;
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

const LineChart = ({chartHeight, chartData, extrema, lastValue, nextValue}) => {
  const dPath = useMemo(
    () =>
      getDPath({
        chartHeight,
        chartData,
        extrema,
        lastValue,
        nextValue,
      }),
    [chartHeight, chartData, extrema, lastValue, nextValue],
  );
  return <Path d={dPath} stroke="#000" strokeWidth={1} fill="none" />;
};

const Chart = ({
  containerHeight,
  chartData,
  extrema,
  left = 0,
  lastValue,
  backgroundColor,
  nextValue,
}) => {
  const xAxisX1Point = MARGIN_FROM_RIGHT;
  const xAxisY1Point = containerHeight - MARGIN_FROM_BOTTOM;
  const xAxisX2Point = xAxisX1Point + ITEM_WIDTH * chartData.length;
  const xAxisY2Point = containerHeight - MARGIN_FROM_BOTTOM;
  const chartHeight = containerHeight - MARGIN_FROM_TOP - MARGIN_FROM_BOTTOM;

  const renderLineChartData = () => {
    return chartData.map((item, index) => {
      const xPoint = xAxisX1Point + ITEM_WIDTH * index;

      const dataXPoint =
        extrema.max === 0 ? 0 : index * ITEM_WIDTH + MARGIN_FROM_RIGHT;
      const dataYPoint =
        extrema.max === 0
          ? 0
          : MARGIN_FROM_TOP +
            chartHeight -
            ((item.value - extrema.min) / (extrema.max - extrema.min)) *
              chartHeight;
      return (
        <G key={`data-section-${index}`}>
          <Circle
            cx={dataXPoint + ITEM_WIDTH / 2}
            cy={dataYPoint}
            fill="#000"
            r="3"
          />
          <Rect
            x={xPoint - 5}
            y={xAxisY1Point}
            width={ITEM_WIDTH + 10}
            height={50}
            fill="#fff"
          />
          <Line
            key={index}
            x1={xPoint}
            y1={xAxisY1Point}
            x2={xAxisX1Point + ITEM_WIDTH * index}
            y2={xAxisY1Point + 6}
            stroke={'#000'}
            strokeWidth={1}
          />

          <SvgText
            transform="scale(-1,1)"
            x={-(xPoint + ITEM_WIDTH / 2)}
            y={xAxisY1Point + 20}
            textAnchor="middle"
            fill="#000">
            {item.key}
          </SvgText>
        </G>
      );
    });
  };
  const renderXAxis = () => {
    return (
      <G key="xAxis yAxis">
        <Line
          x1={xAxisX1Point}
          y1={xAxisY1Point}
          x2={xAxisX2Point}
          y2={xAxisY2Point}
          stroke="#000"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
      </G>
    );
  };
  return (
    <Svg
      width={xAxisX1Point + ITEM_WIDTH * chartData.length}
      style={[styles.svgContainer, {left}]}>
      <G>
        <LineChart
          {...{chartHeight, chartData, extrema, lastValue, nextValue}}
        />

        {renderLineChartData()}
        {renderXAxis()}
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
