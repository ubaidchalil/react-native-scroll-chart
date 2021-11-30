import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';
import {
  MARGIN_FROM_TOP,
  MARGIN_FROM_RIGHT,
  MARGIN_FROM_BOTTOM,
} from './constants';
import ChartElements from './ChartElements';
import XAxis from './XAxis';
import Tooltip from './Tooltip';
const ITEM_LENGTH_IN_SECTION = 7;
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
    Math.floor(data.dataIndex / ITEM_LENGTH_IN_SECTION) *
      ITEM_LENGTH_IN_SECTION -
    data.prevValueIndex;
  let finalDiff = diffCurrentPrev - 1;
  if (index === chartData.length - 1) {
    finalDiff = finalDiff - ITEM_LENGTH_IN_SECTION;
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
    (data.prevValueIndex % ITEM_LENGTH_IN_SECTION);
  if (data.dataIndex - data.prevValueIndex > ITEM_LENGTH_IN_SECTION) {
    finalDiff = data.nextValueIndex - data.dataIndex + ITEM_LENGTH_IN_SECTION;
  }
  if (data.dataIndex === ITEM_LENGTH_IN_SECTION) {
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

const Chart = ({
  containerHeight,
  chartData,
  yAxisLimits,
  left = 0,
  itemWidth,
  setTooltipDisplayed,
  chartKey,
  sectionIndex = 0,
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

  const onCircle = ({xPosition, yPosition, selectedIndex}) => {
    setTooltipDisplayed(chartKey);
    setTooltipState({xPosition, yPosition, isVisible: true, selectedIndex});
  };

  React.useEffect(() => {
    setTooltipState({...tooltipState, isVisible: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  React.useEffect(() => {
    setTooltipState({...tooltipState, isVisible: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yAxisLimits]);

  return (
    <Svg
      width={xAxisX1Point + itemWidth * chartData.length}
      style={[
        styles.svgContainer(containerHeight, sectionIndex),
        {left, backgroundColor},
      ]}>
      <G>
        {tooltipState.isVisible && (
          <Tooltip
            xPosition={tooltipState.xPosition}
            yPosition={tooltipState.yPosition}
            selectedIndex={tooltipState.selectedIndex}
            containerHeight={containerHeight}
            itemWidth={itemWidth}
          />
        )}
        <LineChart
          {...{
            chartHeight,
            chartData,
            yAxisLimits,
            itemWidth,
          }}
        />

        <ChartElements
          {...{
            yAxisLimits,
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
  svgContainer: (height, sectionIndex = 0) => ({
    height,
    zIndex: sectionIndex * 1 + 6,
    backgroundColor: '#fff',
    position: 'absolute',
  }),
});

export default Chart;
