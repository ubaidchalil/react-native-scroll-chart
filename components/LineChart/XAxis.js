import React from 'react';
import {G, Line} from 'react-native-svg';

const XAxis = ({xAxisX1Point, xAxisY1Point, xAxisX2Point, xAxisY2Point}) => {
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

export default React.memo(XAxis);