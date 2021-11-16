import React from 'react';
import {G, Line, Rect, Circle} from 'react-native-svg';
import {MARGIN_FROM_BOTTOM, MARGIN_FROM_TOP} from './constants';

const TOOL_TIP_HEIGHT = 30;

const Tooltip = ({xPosition, yPosition, containerHeight, itemWidth}) => {
  const y1Line = MARGIN_FROM_TOP - 2;
  const y2Line = containerHeight - MARGIN_FROM_BOTTOM;
  const toolTipWidth = itemWidth - 5;
  return (
    <G key="xAxis yAxis">
      <Rect
        x={xPosition - toolTipWidth / 2}
        y={y1Line - TOOL_TIP_HEIGHT}
        rx="3"
        ry="3"
        width={toolTipWidth}
        height={TOOL_TIP_HEIGHT}
        fill="#000"
      />
      <Circle cx={xPosition} cy={yPosition} fill="#000" r="6" />
      <Line
        x1={xPosition}
        y1={y1Line}
        x2={xPosition}
        y2={y2Line}
        stroke="#000"
        strokeWidth="1"
      />
    </G>
  );
};

export default React.memo(Tooltip);
