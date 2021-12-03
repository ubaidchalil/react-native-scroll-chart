import React from 'react';
import {G, Line, Rect, Circle, Text as SvgText} from 'react-native-svg';
import {MARGIN_FROM_BOTTOM, MARGIN_FROM_TOP} from './constants';

const TOOL_TIP_HEIGHT = 40;

const Tooltip = ({
  xPosition,
  yPosition,
  selectedIndex,
  containerHeight,
  titleField,
  dataField,
  chartType,
}) => {
  const y1Line = MARGIN_FROM_TOP - 2;
  const y2Line = containerHeight - MARGIN_FROM_BOTTOM;
  const toolTipWidth = 85;

  const mode = selectedIndex % 7;

  const diffArea = toolTipWidth / 2 - 10;

  let additionalArea = mode === 0 ? diffArea : 0;
  additionalArea = mode === 7 - 1 ? -diffArea : additionalArea;
  return (
    <G key="xAxis yAxis">
      <Rect
        x={xPosition - toolTipWidth / 2 + additionalArea}
        y={y1Line - TOOL_TIP_HEIGHT}
        rx="3"
        ry="3"
        width={toolTipWidth}
        height={TOOL_TIP_HEIGHT}
        fill="#000"
      />
      {titleField && (
        <SvgText
          x={-xPosition - additionalArea}
          y={y1Line - TOOL_TIP_HEIGHT + (dataField ? 16 : 24)}
          textAnchor="middle"
          transform="scale(-1,1)"
          fill="rgba(211, 211, 211, 1)">
          {titleField}
        </SvgText>
      )}
      {dataField && (
        <SvgText
          x={-xPosition - additionalArea}
          y={y1Line - TOOL_TIP_HEIGHT + (titleField ? 32 : 26)}
          textAnchor="middle"
          transform="scale(-1,1)"
          fontWeight="bold"
          fill="#fff">
          {dataField}
        </SvgText>
      )}
      {chartType === 'line' && (
        <Circle cx={xPosition} cy={yPosition} fill="#000" r="6" />
      )}
      <Line
        x1={xPosition}
        y1={y1Line}
        x2={xPosition}
        y2={y2Line}
        stroke="#000"
        strokeWidth="1"
        strokeDasharray="5,3"
      />
    </G>
  );
};

export default React.memo(Tooltip);
