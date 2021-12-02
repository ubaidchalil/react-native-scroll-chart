import React from 'react';
import {StyleSheet} from 'react-native';
import Svg, {G, Line, Text as SvgText} from 'react-native-svg';
import {
  MARGIN_FROM_LEFT,
  MARGIN_FROM_TOP,
  MARGIN_FROM_BOTTOM,
  ROWS,
} from './constants';

const YAxis = ({yAxisLabelArray, containerHeight}) => {
  const yAxisX1Point = MARGIN_FROM_LEFT;
  const yAxisY1Point = MARGIN_FROM_TOP;
  const yAxisX2Point = MARGIN_FROM_LEFT;
  const yAxisY2Point = containerHeight - MARGIN_FROM_BOTTOM;
  const gapBetweenYAxis =
    (containerHeight - MARGIN_FROM_BOTTOM - MARGIN_FROM_TOP) / (ROWS - 1);

  const renderYAxisLabels = () => {
    return yAxisLabelArray.map((item, index) => {
      const yPoint = yAxisY1Point + gapBetweenYAxis * index;
      return (
        <G key={`y-axis-${index}`}>
          <Line
            key={index}
            x1={yAxisX1Point}
            y1={yPoint}
            x2={yAxisX1Point - 6}
            y2={yPoint}
            stroke={'#000'}
            strokeWidth="1"
          />
          <SvgText
            y={yPoint + 5}
            x={yAxisX1Point - 25}
            textAnchor="middle"
            fill="#000">
            {item}
          </SvgText>
        </G>
      );
    });
  };

  const renderYAxis = () => {
    return (
      <G key="xAxis yAxis">
        <Line
          x1={yAxisX1Point}
          y1={yAxisY1Point - 10}
          x2={yAxisX2Point}
          y2={yAxisY2Point}
          stroke="#000"
          strokeWidth="1"
          strokeDasharray="5,3"
        />
      </G>
    );
  };
  return (
    <Svg style={styles.svgContainer}>
      {renderYAxis()}
      {renderYAxisLabels()}
    </Svg>
  );
};

export default React.memo(YAxis);

const styles = StyleSheet.create({
  svgContainer: {
    position: 'absolute',
  },
});
