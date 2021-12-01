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
import {
  LENGTH_ONE_SECTION,
  MARGIN_FROM_LEFT,
  MARGIN_FROM_RIGHT,
  width,
} from './constants';
import Chart from './ChartData';
import YAxis from './YAxis';
import {getMaxAndMin, getYAxisLabel} from './utils';

const CHART_SECTIONS = ['chart1', 'chart2', 'chart3'];

const LineChart = ({
  chartData,
  containerHeight,
  dataCount,
  chartColumns = 7,
  getChartDatesAndAverage,
}) => {
  const [renderedIndex, setRenderedIndex] = useState(null);
  const [yAxisLimits, setYAxisLimits] = useState({min: 0, max: 0});
  const [chartState, setChartState] = React.useState(null);
  const [tooltipDisplayed, setTooltipDisplayed] = useState(null);

  const [chartDataState, setChartDataState] = React.useState({
    chart1: {data: [], left: 0, lastValue: null, backgroundColor: 'white'},
    chart2: {data: [], left: 0, lastValue: null, backgroundColor: 'white'},
    chart3: {data: [], left: 0, lastValue: null, backgroundColor: 'white'},
  });

  const itemWidth =
    (width - MARGIN_FROM_LEFT - MARGIN_FROM_RIGHT) / chartColumns;

  useEffect(() => {
    if (chartData.length > 0) {
      setChartDataState({
        ...chartDataState,
        chart1: {
          ...chartDataState.chart1,
          data: chartData[0],
          left: 0,
          lastValue: null,
        },
      });

      if (!chartState) {
        setChartState({
          navigationMode: 'NEXT',
          section: 1,
        });
      }
      if (!renderedIndex) {
        setRenderedIndex(chartColumns);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  const [yAxisLabelArray, setYAxisLabelArray] = useState([]);

  const translateX = useSharedValue(0);
  const valueAnimationEnd = useSharedValue(0);
  const check = useSharedValue(0);
  const isScrollEnd = useSharedValue(0);
  const pageNoAnimateState = useSharedValue(1);

  const MAX_TRANSLATE_X = -(itemWidth * dataCount);

  useEffect(() => {
    if (!chartState) {
      return;
    }

    const {navigationMode, section} = chartState;

    if (section >= Math.ceil(dataCount / LENGTH_ONE_SECTION)) {
      return;
    }
    const diff = navigationMode === 'NEXT' ? 1 : -1;
    const nextSection =
      navigationMode === 'PREV' && section === 1 ? 1 : section + diff;

    let left =
      (navigationMode === 'NEXT' ? section : nextSection - 1) *
      (LENGTH_ONE_SECTION - 1) *
      itemWidth;

    if (nextSection > 2) {
      left = left + itemWidth * (nextSection - 2);
    }

    const dataIndex = navigationMode === 'NEXT' ? section : nextSection - 1;
    const data = chartData[dataIndex];

    let mod = nextSection % 3;
    mod = mod === 0 ? 3 : mod;

    let chartSection = CHART_SECTIONS[mod - 1];

    setChartDataState({
      ...chartDataState,
      [chartSection]: {
        ...chartDataState[chartSection],
        data: data,
        left: left,
        sectionIndex: nextSection,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState]);

  useEffect(() => {
    if (!renderedIndex) {
      return;
    }
    const limits = getMaxAndMin({
      dataList: chartData,
      currIndex: renderedIndex,
      diff: 5,
      chartColumns,
    });
    const [min, max] = limits;
    if (yAxisLimits.min !== min || yAxisLimits.max !== max) {
      setYAxisLimits({min, max});
    }
    const _yAxisLabelArray = getYAxisLabel(max, min);
    setYAxisLabelArray(_yAxisLabelArray);
    getChartDatesAndAverage(renderedIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderedIndex, chartData]);

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
    currentPosition => {
      const pageNo = Math.floor(
        (currentPosition + chartColumns + 1) / (LENGTH_ONE_SECTION + 0.5),
      );

      if (pageNoAnimateState.value !== pageNo + 1) {
        const navigationMode =
          pageNo + 1 > pageNoAnimateState.value ? 'NEXT' : 'PREV';
        runOnJS(setChartState)({navigationMode, section: pageNo + 1});
        pageNoAnimateState.value = pageNo + 1;
      }

      ///Condition to check the scroll reached END
      const check1 =
        Math.abs(MAX_TRANSLATE_X) - itemWidth / 2 <
        clampedTranslateX.value + itemWidth * 7;

      ///Condition to check the scroll reached START
      const check2 = itemWidth / 2 > clampedTranslateX.value;

      ///Condition to check the scroll moved to NEXT item
      const check3 =
        isScrollEnd.value === 1 ||
        (Math.round(Math.abs(MAX_TRANSLATE_X) / itemWidth) <
          Math.round(currentPosition) + 49 &&
          check.value === 0);

      ///Condition to check for avoiding the irrevelent updation
      const check4 =
        Math.round(Math.abs(MAX_TRANSLATE_X) / itemWidth) >
          Math.round(currentPosition) + 49 && check.value === 1;

      if (check1 || check2 || check3) {
        runOnJS(setRenderedIndex)(Math.round(currentPosition + chartColumns));
        check.value = check3 ? 1 : check.value;
      }

      isScrollEnd.value = isScrollEnd.value === 1 ? 0 : isScrollEnd.value;
      check.value = check4 ? 0 : check.value;
    },
    [clampedTranslateX.value],
  );

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
    },
    onActive: (event, context) => {
      isScrollEnd.value = 0;
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

      if (event.velocityX < 0 || event.translationX < 0) {
        next = -next;
      }
      valueAnimationEnd.value = endValue + next;

      translateX.value = withSpring(
        valueAnimationEnd.value,
        {damping: 50},
        () => (isScrollEnd.value = 1),
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
                {CHART_SECTIONS.map(
                  section =>
                    chartDataState?.[section]?.data?.length > 0 && (
                      <Chart
                        {...{
                          containerHeight,
                          chartData: chartDataState?.[section].data,
                          left: chartDataState?.[section].left,
                          yAxisLimits,
                          itemWidth,
                          sectionIndex: chartDataState?.[section].sectionIndex,
                          tooltipDisplayed,
                          setTooltipDisplayed,
                          chartKey: [section],
                          key: [section],
                          backgroundColor:
                            chartDataState?.[section].backgroundColor,
                        }}
                      />
                    ),
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
