import React from 'react';
import {G, Line, Text as SvgText, Circle, Rect} from 'react-native-svg';
import {MARGIN_FROM_TOP, MARGIN_FROM_RIGHT, ITEM_WIDTH} from './constants';

const ChartElements = ({
  extrema,
  chartData,
  xAxisX1Point,
  chartHeight,
  xAxisY1Point,
}) => {
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

export default React.memo(ChartElements);
