import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
import {COLUMNS, ITEM_WIDTH} from './constants';
import Chart from './ChartData';
import YAxis from './YAxis';
import {getMaxAndMin, getMaxAndMin1, getYAxisLabel} from './utils';

const ITEM_LENGTH_IN_SECTION = 35;

const LineChart = ({chartData, containerHeight, dataCount}) => {
  const [xVal, setXVal] = useState(null);
  const [extrema, setExtrema] = useState({min: 0, max: 0});
  const [chartState, setChartState] = React.useState(null);
  const [page, setPage] = React.useState(null);
  const [chartDataState, setChartDataState] = React.useState({
    section1: {data: [], left: 0, lastValue: null},
    section2: {data: [], left: 0, lastValue: null},
    section3: {data: [], left: 0, lastValue: null},
  });

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
      if (!xVal) {
        setXVal(COLUMNS - 1);
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

  const MAX_TRANSLATE_X = -(ITEM_WIDTH * dataCount);

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
      ITEM_WIDTH;

    if (nextSection > 2) {
      left = left + ITEM_WIDTH * (nextSection - 2);
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
    if (!xVal) {
      return;
    }
    const minMax = getMaxAndMin1({
      dataList: chartData,
      currIndex: xVal,
      diff: 5,
    });
    const [min, max] = minMax;
    setExtrema({min, max});
    const _yAxisLabelArray = getYAxisLabel(max, min);
    setYAxisLabelArray(_yAxisLabelArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xVal, chartData]);

  useEffect(() => {
    const limit = page * dataCount - dataCount + 1;
    if (Math.abs(xVal) > limit) {
      setPage((page * dataCount) / dataCount + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xVal]);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(
      Math.min(translateX.value, -MAX_TRANSLATE_X - ITEM_WIDTH * (COLUMNS - 1)),
      0,
    );
  }, [MAX_TRANSLATE_X]);

  useAnimatedReaction(
    () => {
      return clampedTranslateX.value / ITEM_WIDTH;
    },
    data => {
      const _pageNo = Math.floor(
        (data + COLUMNS) / (ITEM_LENGTH_IN_SECTION + 0.5),
      );

      if (pageNoAnimateState.value !== _pageNo + 1) {
        const navigationMode =
          _pageNo + 1 > pageNoAnimateState.value ? 'NEXT' : 'PREV';
        runOnJS(setChartState)({navigationMode, section: _pageNo + 1});
        pageNoAnimateState.value = _pageNo + 1;
      }

      if (
        Math.abs(MAX_TRANSLATE_X) - ITEM_WIDTH / 2 <
        clampedTranslateX.value + ITEM_WIDTH * 7
      ) {
        runOnJS(setXVal)(Math.round(data + COLUMNS - 1));
      }

      if (ITEM_WIDTH / 2 > clampedTranslateX.value) {
        runOnJS(setXVal)(Math.round(data + COLUMNS - 1));
      }

      if (
        animationEnd.value === 1 ||
        (Math.round(Math.abs(MAX_TRANSLATE_X) / ITEM_WIDTH) <
          Math.round(data) + 49 &&
          check.value === 0)
      ) {
        check.value = 1;
        runOnJS(setXVal)(Math.round(data + COLUMNS - 1));
      }

      if (animationEnd.value === 1) {
        animationEnd.value = 0;
      }

      if (
        Math.round(Math.abs(MAX_TRANSLATE_X) / ITEM_WIDTH) >
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
          (endValue + ITEM_WIDTH * (COLUMNS - 1)) %
          (ITEM_WIDTH * (COLUMNS - 1));

        if (event.velocityX < 0) {
          diff = diff === 0 ? 0 : ITEM_WIDTH * (COLUMNS - 1) - diff;
        }
        if (diff >= ITEM_WIDTH * (COLUMNS - 1) - 5) {
          diff = 0;
        }
        next = ITEM_WIDTH * (COLUMNS - 1) - diff;
      } else {
        const transX = Math.abs(event.translationX);
        const HALF_WIDTH = ITEM_WIDTH / 2;
        const mod = transX % ITEM_WIDTH;
        const extra = mod >= HALF_WIDTH ? 1 : 0;
        const divNum = Math.floor(transX / ITEM_WIDTH);
        next = (extra + divNum) * ITEM_WIDTH;
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
        <View style={{marginLeft: 51, overflow: 'hidden'}}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View>
              <Animated.View
                style={[{flexDirection: 'row', height: 250}, rStyle]}>
                {chartDataState.section1.data.length > 0 && (
                  <Chart
                    {...{
                      containerHeight,
                      chartData: chartDataState.section1.data,
                      left: chartDataState.section1.left,
                      extrema,
                      lastValue: chartDataState.section1.lastValue,
                      nextValue: chartDataState.section3.nextValue,
                      backgroundColor: 'red',
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
                      backgroundColor: 'green',
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
                      backgroundColor: 'yellow',
                    }}
                  />
                )}
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: 'green',
        }}>
        <Text>{xVal}</Text>
        <Text>{chartState?.navigationMode}</Text>
        <Text>{chartState?.section}</Text>
      </View>
    </>
  );
};

export default LineChart;

const styles = StyleSheet.create({
  svgWrapper: {
    backgroundColor: '#fff',
  },
});
