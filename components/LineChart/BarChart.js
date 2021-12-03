import React from 'react';
import PropTypes from 'prop-types';
import {Rect} from 'react-native-svg';
import {MARGIN_FROM_RIGHT, MARGIN_FROM_TOP} from './constants';

const barWidthDiffPercentage = 0.38;

const BarChart = ({
  chartHeight,
  chartData,
  yAxisLimits,
  itemWidth,
  toolTipHandler,
}) => {
  const diff = itemWidth * barWidthDiffPercentage;
  return chartData.map((data, index) => {
    const dataXPoint =
      yAxisLimits.max === 0 ? 0 : index * itemWidth + MARGIN_FROM_RIGHT;
    const dataYPoint =
      yAxisLimits.max === 0
        ? 0
        : MARGIN_FROM_TOP +
          chartHeight -
          ((data.value - yAxisLimits.min) /
            (yAxisLimits.max - yAxisLimits.min)) *
            chartHeight;
    let height = chartHeight + MARGIN_FROM_TOP - dataYPoint;
    height = data.value ? height : 0;

    return (
      <Rect
        key={`bar-${index}`}
        x={dataXPoint + diff / 2}
        y={dataYPoint}
        width={itemWidth - diff}
        height={height}
        fill="#000"
        onPress={() =>
          toolTipHandler({
            xPosition: dataXPoint + itemWidth / 2,
            yPosition: dataYPoint,
            selectedIndex: data.dataIndex,
            data,
          })
        }
      />
    );
  });
};

BarChart.propTypes = {
  chartHeight: PropTypes.number,
  chartData: PropTypes.object,
  yAxisLimits: PropTypes.object,
  itemWidth: PropTypes.number,
  toolTipHandler: PropTypes.func,
};

export default BarChart;
