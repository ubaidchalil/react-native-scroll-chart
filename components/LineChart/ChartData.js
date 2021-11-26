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
import Tooltip from './Tooltip';

const getDPath = ({
  chartHeight,
  chartData,
  extrema,
  itemWidth,
  diffIndex,
  section,
}) => {
  if (extrema.max === 0) {
    return '';
  }

  let prefix = 'M';
  const dPath = chartData.reduce((path, data, index) => {
    const x = index * itemWidth + MARGIN_FROM_RIGHT + itemWidth / 2;
    const y =
      MARGIN_FROM_TOP +
      chartHeight -
      ((data.value - extrema.min) / (extrema.max - extrema.min)) * chartHeight;

    if (prefix === 'M' && data.value && data.prevValueIndex) {
      const diffCurrentPrev =
        Math.floor(data.dataIndex / 7) * 7 - data.prevValueIndex;
      let finalDiff = diffCurrentPrev - 1;
      if (index === chartData.length - 1) {
        const mod = diffCurrentPrev % 7;
        finalDiff = mod === 0 ? 7 : mod - 1;
      }

      const lastX = -(finalDiff * itemWidth + itemWidth / 2);

      const lastY =
        MARGIN_FROM_TOP +
        chartHeight -
        ((data.previousValue - extrema.min) / (extrema.max - extrema.min)) *
          chartHeight;

      path += `M${lastX} ${lastY}`;
      prefix = 'L';
      if (data.value) {
        path += `L${x} ${y}`;
      }

      return path;
    }
    if (index === chartData.length - 1 && data.nextValue && !data.value) {
      const nextX =
        (data.nextValueIndex -
          data.prevValueIndex +
          (data.prevValueIndex % 7)) *
          itemWidth +
        itemWidth / 2;
      const nextY =
        MARGIN_FROM_TOP +
        chartHeight -
        ((data.nextValue - extrema.min) / (extrema.max - extrema.min)) *
          chartHeight;
      if (data.value) {
        path += `L${x} ${y}`;
      }
      path += `L${nextX} ${nextY}`;
      return path;
    }

    if (!data.value) {
      return path;
    }

    // const prefix = index === 0 ? 'M' : 'L';

    path += `${prefix}${x} ${y}`;

    prefix = 'L';

    return path;
  }, '');
  return dPath;
};

const LineChart = ({
  chartHeight,
  chartData,
  extrema,
  itemWidth,
  diffIndex,
  section,
}) => {
  const dPath = useMemo(
    () =>
      getDPath({
        chartHeight,
        chartData,
        extrema,
        itemWidth,
        diffIndex,
        section,
      }),
    [chartHeight, chartData, extrema, itemWidth, diffIndex, section],
  );
  return <Path d={dPath} stroke="#fff" strokeWidth={5} fill="none" />;
};

const Chart = ({
  containerHeight,
  chartData,
  extrema,
  left = 0,
  itemWidth,
  tooltipDisplayed,
  setTooltipDisplayed,
  chartKey,
  diffIndex = 1,
  section = 0,
  backgroundColor,
}) => {
  const [tooltipState, setTooltipState] = React.useState({
    isVisible: false,
    xPosition: 0,
    yPosition: 0,
    selectedIndex: -1,
  });
  const xAxisX1Point = MARGIN_FROM_RIGHT;
  const xAxisY1Point = containerHeight - MARGIN_FROM_BOTTOM;
  const xAxisX2Point = xAxisX1Point + itemWidth * chartData.length;
  const xAxisY2Point = containerHeight - MARGIN_FROM_BOTTOM;
  const chartHeight = containerHeight - MARGIN_FROM_TOP - MARGIN_FROM_BOTTOM;

  const onCircle = ({xPosition, yPosition}) => {
    setTooltipDisplayed(chartKey);
    setTooltipState({xPosition, yPosition, isVisible: true});
  };

  React.useEffect(() => {
    if (tooltipDisplayed !== chartKey) {
      setTooltipState({isVisible: false});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipDisplayed]);

  React.useEffect(() => {
    setTooltipState({...tooltipState, isVisible: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extrema]);

  return (
    <Svg
      width={xAxisX1Point + itemWidth * chartData.length}
      style={[
        styles.svgContainer(containerHeight, section),
        {left, backgroundColor},
      ]}>
      <G>
        {tooltipState.isVisible && (
          <Tooltip
            xPosition={tooltipState.xPosition}
            yPosition={tooltipState.yPosition}
            containerHeight={containerHeight}
            itemWidth={itemWidth}
          />
        )}
        <LineChart
          {...{
            chartHeight,
            chartData,
            extrema,
            itemWidth,
            diffIndex,
            section,
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
            onCircle,
          }}
        />
        <XAxis {...{xAxisX1Point, xAxisY1Point, xAxisX2Point, xAxisY2Point}} />
      </G>
    </Svg>
  );
};

const styles = StyleSheet.create({
  svgContainer: (height, section = 0) => ({
    height,
    zIndex: section * 1 + 6,
    backgroundColor: '#fff',
    position: 'absolute',
  }),
});

export default Chart;
