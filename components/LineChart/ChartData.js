import React from 'react';
import {StyleSheet} from 'react-native';
import Svg, {G} from 'react-native-svg';
import PropTypes from 'prop-types';
import {
  MARGIN_FROM_TOP,
  MARGIN_FROM_RIGHT,
  MARGIN_FROM_BOTTOM,
  ROWS,
} from './constants';
import ChartElements from './ChartElements';
import XAxis from './XAxis';
import Tooltip from './Tooltip';
import LineChart from './LineChart';
import BarChart from './BarChart';

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
  toolTipCallBackFunction,
  chartType,
}) => {
  const [tooltipState, setTooltipState] = React.useState({
    isVisible: false,
    xPosition: 0,
    yPosition: 0,
    selectedIndex: -1,
    toolTipData: {},
  });
  const xAxisX1Point = MARGIN_FROM_RIGHT;
  const xAxisY1Point = containerHeight - MARGIN_FROM_BOTTOM;
  const xAxisX2Point = xAxisX1Point + itemWidth * chartData.length;
  const xAxisY2Point = containerHeight - MARGIN_FROM_BOTTOM;
  const chartHeight = containerHeight - MARGIN_FROM_TOP - MARGIN_FROM_BOTTOM;

  const toolTipHandler = ({xPosition, yPosition, selectedIndex, data}) => {
    const toolTipData = toolTipCallBackFunction(data);
    setTooltipDisplayed(chartKey);
    setTooltipState({
      xPosition,
      yPosition,
      isVisible: true,
      selectedIndex,
      toolTipData,
    });
  };

  React.useEffect(() => {
    setTooltipState({...tooltipState, isVisible: false});
  }, [left]);

  React.useEffect(() => {
    setTooltipState({...tooltipState, isVisible: false});
  }, [yAxisLimits]);

  const renderYAxisLines = () => {
    const gapBetweenYAxis =
      (containerHeight - MARGIN_FROM_BOTTOM - MARGIN_FROM_TOP) / (ROWS - 1);
    const yAxisY1Point = MARGIN_FROM_TOP;
    return [...new Array(ROWS)].map((_, index) => {
      const yPoint = yAxisY1Point + gapBetweenYAxis * index;
      return (
        <XAxis
          key={`x-axisLine-${index}`}
          {...{
            xAxisX1Point,
            xAxisY1Point: yPoint,
            xAxisX2Point,
            xAxisY2Point: yPoint,
            type: 'yLine',
          }}
        />
      );
    });
  };

  return (
    <Svg
      width={xAxisX1Point + itemWidth * chartData.length}
      style={[
        styles.svgContainer(containerHeight, sectionIndex),
        {left, backgroundColor},
      ]}>
      <G>
        {renderYAxisLines()}
        {chartType === 'line' && (
          <LineChart
            {...{
              chartHeight,
              chartData,
              yAxisLimits,
              itemWidth,
            }}
          />
        )}

        {chartType === 'bar' && (
          <BarChart
            {...{
              chartHeight,
              chartData,
              yAxisLimits,
              itemWidth,
              toolTipHandler,
            }}
          />
        )}
        <ChartElements
          {...{
            yAxisLimits,
            chartData,
            xAxisX1Point,
            chartHeight,
            xAxisY1Point,
            itemWidth,
            onCircle: toolTipHandler,
            chartType,
          }}
        />

        <XAxis {...{xAxisX1Point, xAxisY1Point, xAxisX2Point, xAxisY2Point}} />
        {tooltipState.isVisible && (
          <Tooltip
            {...{chartType, itemWidth, containerHeight}}
            {...tooltipState.toolTipData}
            xPosition={tooltipState.xPosition}
            yPosition={tooltipState.yPosition}
            selectedIndex={tooltipState.selectedIndex}
          />
        )}
      </G>
    </Svg>
  );
};

Chart.propTypes = {
  containerHeight: PropTypes.number,
  chartData: PropTypes.object,
  yAxisLimits: PropTypes.object,
  left: PropTypes.number,
  itemWidth: PropTypes.number,
  setTooltipDisplayed: PropTypes.func,
  chartKey: PropTypes.string,
  sectionIndex: PropTypes.number,
  backgroundColor: PropTypes.string,
  toolTipCallBackFunction: PropTypes.func,
  chartType: PropTypes.string,
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
