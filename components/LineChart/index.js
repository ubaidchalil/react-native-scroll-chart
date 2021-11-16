import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {MARGIN_FROM_LEFT, MARGIN_FROM_RIGHT, width} from './constants';
import Chart from './ChartData';
import YAxis from './YAxis';
import {getMaxAndMin, getYAxisLabel} from './utils';

const ITEM_LENGTH_IN_SECTION = 35;

const LineChart = ({
  chartData,
  containerHeight,
  dataCount,
  chartColumns = 4,
}) => {
  const [displayedColumns, setDisplayedColumns] = useState(null);
  const [extrema, setExtrema] = useState({min: 0, max: 0});
  const [chartState, setChartState] = React.useState(null);
  const [chartDataState, setChartDataState] = React.useState({
    section1: {data: [], left: 0, lastValue: null},
    section2: {data: [], left: 0, lastValue: null},
    section3: {data: [], left: 0, lastValue: null},
  });

  const itemWidth =
    (width - MARGIN_FROM_LEFT - MARGIN_FROM_RIGHT) / chartColumns;

  useEffect(() => {
    if (chartData.length > 0) {
      setChartDataState({
        ...chartDataState,
        section1: {data: chartData[0], left: 0, lastValue: null},
      });

      if (!chartState) {
        setChartState({
          navigationMode: 'NEXT',
          section: 1,
        });
      }
      if (!displayedColumns) {
        setDisplayedColumns(chartColumns);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  const [yAxisLabelArray, setYAxisLabelArray] = useState([]);

  const translateX = useSharedValue(0);
  const valueAnimationEnd = useSharedValue(0);
  const check = useSharedValue(0);
  const animationEnd = useSharedValue(0);
  const pageNoAnimateState = useSharedValue(1);

  const MAX_TRANSLATE_X = -(itemWidth * dataCount);

  useEffect(() => {
    if (!chartState) {
      return;
    }
    if (chartState.section >= Math.ceil(dataCount / 35)) {
      return;
    }
    const diff = chartState.navigationMode === 'NEXT' ? 1 : -1;
    const nextSection =
      chartState.navigationMode === 'PREV' && chartState.section === 1
        ? 1
        : chartState.section + diff;
    const mod = nextSection % 3;

    let left =
      (chartState.navigationMode === 'NEXT'
        ? chartState.section
        : nextSection - 1) *
      (ITEM_LENGTH_IN_SECTION - 1) *
      itemWidth;

    if (nextSection > 2) {
      left = left + itemWidth * (nextSection - 2);
    }

    const index =
      chartState.navigationMode === 'NEXT'
        ? chartState.section
        : nextSection - 1;

    const data = chartData[index];

    const lastValue = chartData[index - 1]
      ? chartData[index - 1][chartData[index - 1].length - 2].value
      : null;

    if (mod === 1) {
      setChartDataState({
        ...chartDataState,
        section1: {data: data, left: left, lastValue},
      });
    } else if (mod === 2) {
      setChartDataState({
        ...chartDataState,
        section2: {data: data, left: left, lastValue},
      });
    } else {
      const nextValue = chartData[index + 1]
        ? chartData[index + 1][1].value
        : null;
      setChartDataState({
        ...chartDataState,
        section3: {data: data, left: left, lastValue, nextValue},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState]);

  useEffect(() => {
    if (!displayedColumns) {
      return;
    }
    const minMax = getMaxAndMin({
      dataList: chartData,
      currIndex: displayedColumns,
      diff: 5,
      chartColumns,
    });
    const [min, max] = minMax;
    setExtrema({min, max});
    const _yAxisLabelArray = getYAxisLabel(max, min);
    setYAxisLabelArray(_yAxisLabelArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedColumns, chartData]);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(
      Math.min(translateX.value, -MAX_TRANSLATE_X - itemWidth * chartColumns),
      0,
    );
  }, [MAX_TRANSLATE_X]);

  useAnimatedReaction(
    () => {
      return clampedTranslateX.value / itemWidth;
    },
    data => {
      const _pageNo = Math.floor(
        (data + chartColumns + 1) / (ITEM_LENGTH_IN_SECTION + 0.5),
      );

      if (pageNoAnimateState.value !== _pageNo + 1) {
        const navigationMode =
          _pageNo + 1 > pageNoAnimateState.value ? 'NEXT' : 'PREV';
        runOnJS(setChartState)({navigationMode, section: _pageNo + 1});
        pageNoAnimateState.value = _pageNo + 1;
      }

      if (
        Math.abs(MAX_TRANSLATE_X) - itemWidth / 2 <
        clampedTranslateX.value + itemWidth * 7
      ) {
        runOnJS(setDisplayedColumns)(Math.round(data + chartColumns));
      }

      if (itemWidth / 2 > clampedTranslateX.value) {
        runOnJS(setDisplayedColumns)(Math.round(data + chartColumns));
      }

      if (
        animationEnd.value === 1 ||
        (Math.round(Math.abs(MAX_TRANSLATE_X) / itemWidth) <
          Math.round(data) + 49 &&
          check.value === 0)
      ) {
        check.value = 1;
        runOnJS(setDisplayedColumns)(Math.round(data + chartColumns));
      }

      if (animationEnd.value === 1) {
        animationEnd.value = 0;
      }

      if (
        Math.round(Math.abs(MAX_TRANSLATE_X) / itemWidth) >
          Math.round(data) + 49 &&
        check.value === 1
      ) {
        check.value = 0;
      }
    },
    [clampedTranslateX.value],
  );

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
    },
    onActive: (event, context) => {
      animationEnd.value = 0;
      translateX.value = event.translationX + context.x;
    },
    onEnd: event => {
      const endValue =
        valueAnimationEnd.value < 0
          ? 0
          : valueAnimationEnd.value > Math.abs(MAX_TRANSLATE_X)
          ? Math.abs(MAX_TRANSLATE_X)
          : valueAnimationEnd.value;

      let next = 0;
      if (Math.abs(event.velocityX) > 900) {
        let diff =
          (endValue + itemWidth * chartColumns) % (itemWidth * chartColumns);

        if (event.velocityX < 0) {
          diff = diff === 0 ? 0 : itemWidth * chartColumns - diff;
        }
        if (diff >= itemWidth * chartColumns - 5) {
          diff = 0;
        }
        next = itemWidth * chartColumns - diff;
      } else {
        const transX = Math.abs(event.translationX);
        const HALF_WIDTH = itemWidth / 2;
        const mod = transX % itemWidth;
        const extra = mod >= HALF_WIDTH ? 1 : 0;
        const divNum = Math.floor(transX / itemWidth);
        next = (extra + divNum) * itemWidth;
      }

      if (event.velocityX < 0) {
        next = -next;
      }

      valueAnimationEnd.value = endValue + next;

      translateX.value = withSpring(
        valueAnimationEnd.value,
        {damping: 50},
        () => (animationEnd.value = 1),
      );
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: clampedTranslateX.value}, {scaleX: -1}],
    };
  });

  return (
    <>
      <View style={styles.svgWrapper}>
        <YAxis
          {...{
            yAxisLabelArray,
            containerHeight,
          }}
        />
        <View style={styles.panGestureContainer}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View>
              <Animated.View
                style={[styles.chartContainer(containerHeight), rStyle]}>
                {chartDataState.section1.data.length > 0 && (
                  <Chart
                    {...{
                      containerHeight,
                      chartData: chartDataState.section1.data,
                      left: chartDataState.section1.left,
                      extrema,
                      lastValue: chartDataState.section1.lastValue,
                      nextValue: chartDataState.section3.nextValue,
                      itemWidth,
                    }}
                  />
                )}

                {chartDataState.section2.data.length > 0 && (
                  <Chart
                    {...{
                      containerHeight,
                      chartData: chartDataState.section2.data,
                      left: chartDataState.section2.left,
                      extrema,
                      lastValue: chartDataState.section2.lastValue,
                      nextValue: chartDataState.section3.nextValue,
                      itemWidth,
                    }}
                  />
                )}

                {chartDataState.section3.data.length > 0 && (
                  <Chart
                    {...{
                      containerHeight,
                      chartData: chartDataState.section3.data,
                      left: chartDataState.section3.left,
                      extrema,
                      lastValue: chartDataState.section3.lastValue,
                      nextValue: chartDataState.section3.nextValue,
                      itemWidth,
                    }}
                  />
                )}
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
    </>
  );
};

export default LineChart;

const styles = StyleSheet.create({
  svgWrapper: {
    backgroundColor: '#fff',
  },
  panGestureContainer: {marginLeft: 51, overflow: 'hidden'},
  chartContainer: height => ({flexDirection: 'row', height}),
});
