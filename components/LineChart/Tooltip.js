import React from 'react';
import {G, Line, Rect, Circle, Text as SvgText} from 'react-native-svg';
import {MARGIN_FROM_BOTTOM, MARGIN_FROM_TOP} from './constants';

const TOOL_TIP_HEIGHT = 40;

const Tooltip = ({xPosition, yPosition, containerHeight, itemWidth}) => {
  const y1Line = MARGIN_FROM_TOP - 2;
  const y2Line = containerHeight - MARGIN_FROM_BOTTOM;
  const toolTipWidth = 85;
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
      <SvgText
        x={-xPosition}
        y={y1Line - TOOL_TIP_HEIGHT + 15}
        textAnchor="middle"
        transform="scale(-1,1)"
        fill="rgba(211, 211, 211, 1)">
        Sep 14, 21
      </SvgText>
      <SvgText
        x={-xPosition}
        y={y1Line - TOOL_TIP_HEIGHT + 32}
        textAnchor="middle"
        transform="scale(-1,1)"
        fontWeight="bold"
        fill="#fff">
        488 kgs
      </SvgText>
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
