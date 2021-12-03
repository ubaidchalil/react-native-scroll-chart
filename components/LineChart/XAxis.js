import React from 'react';
import PropTypes from 'prop-types';
import {G, Line} from 'react-native-svg';

const XAxis = ({
  xAxisX1Point,
  xAxisY1Point,
  xAxisX2Point,
  xAxisY2Point,
  type = 'xLine',
}) => {
  return (
    <G key="xAxis yAxis">
      <Line
        x1={xAxisX1Point}
        y1={xAxisY1Point}
        x2={xAxisX2Point}
        y2={xAxisY2Point}
        stroke={type === 'xLine' ? '#000' : '#d6d6d6'}
        strokeWidth="1"
        strokeDasharray="5,3"
      />
    </G>
  );
};

XAxis.propTypes = {
  xAxisX1Point: PropTypes.number,
  xAxisY1Point: PropTypes.number,
  xAxisX2Point: PropTypes.number,
  xAxisY2Point: PropTypes.number,
  type: PropTypes.string,
};

export default React.memo(XAxis);
