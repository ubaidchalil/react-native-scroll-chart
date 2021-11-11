import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, {G, Line, Circle, Text as SvgText, Path} from 'react-native-svg';
import {getMaxAndMin} from './utils';

const windowWidth = Dimensions.get('window').width;

const days = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

const DATA = Array.from({length: 100}, (_, i) => {
  const current = i + 1;

  const mod = current % 7;

  return {
    key: current,
    value: Math.floor(Math.random() * 2) + 100,
    day: days[mod],
  };
});

const getYAxisLabel = (max, min) => {
  const diff = max - min;
  const step = Math.round(diff / 3);
  const labels = [];
  for (let i = 0; i <= 3; i++) {
    labels.push(max - step * i);
  }
  return labels;
};

const containerHeight = 300;
const marginForXFromLeft = 50;
const marginForYFromBottom = 50;
const paddingFromScreenBorder = 20;

const itemWidth =
  (windowWidth - marginForXFromLeft - paddingFromScreenBorder) / 7;

export default function LineChart() {
  const [extrema, setExtrema] = useState({min: 0, max: 0});
  const [chartData, setChartData] = useState(DATA);
  const [page, setPage] = useState(7);
  const [yAxisLabelArray, setYAxisLabelArray] = useState([]);

  useEffect(() => {
    const minMax = getMaxAndMin({
      dataArray: chartData,
      currIndex: page,
      diff: 5,
    });
    const [min, max] = minMax;
    setExtrema({min, max});
    const _yAxisLabelArray = getYAxisLabel(max, min);
    setYAxisLabelArray(_yAxisLabelArray);
  }, [page]);

  const xAxisX1Point = marginForXFromLeft;
  const xAxisY1Point = containerHeight - marginForYFromBottom;
  const xAxisX2Point = itemWidth * chartData.length + marginForXFromLeft;
  const xAxisY2Point = containerHeight - marginForYFromBottom;

  const yAxisX1Point = marginForXFromLeft;
  const yAxisY1Point = paddingFromScreenBorder;
  const yAxisX2Point = marginForXFromLeft;
  const yAxisY2Point = containerHeight - marginForYFromBottom;

  const gapBetweenXAxis =
    (windowWidth - marginForXFromLeft - paddingFromScreenBorder) / 6;

  const gapBetweenYAxis =
    (containerHeight - marginForYFromBottom - paddingFromScreenBorder) / 3;

  const getDPath = () => {
    if (extrema.max === 0) {
      return '';
    }
    const chartHeight =
      containerHeight - marginForYFromBottom - paddingFromScreenBorder;
    const dPath = chartData.reduce((path, data, index) => {
      const x = index * gapBetweenXAxis + marginForXFromLeft;
      const y =
        paddingFromScreenBorder +
        chartHeight -
        ((data.value - extrema.min) / (extrema.max - extrema.min)) *
          chartHeight;

      const prefix = index === 0 ? 'M' : 'L';
      path += `${prefix}${x} ${y}`;
      return path;
    }, '');
    return dPath;
  };

  const renderLineChartData = () => {
    return chartData.map((item, index) => {
      const xPoint = xAxisX1Point + gapBetweenXAxis * index;
      return (
        <>
          <Line
            key={index}
            x1={xPoint}
            y1={xAxisY1Point}
            x2={xAxisX1Point + gapBetweenXAxis * index}
            y2={xAxisY1Point + 10}
            stroke={'#fff'}
            strokeWidth={2}
          />
          <SvgText
            x={xPoint}
            y={xAxisY1Point + 20}
            textAnchor="middle"
            fill="#fff">
            {item.day}
          </SvgText>
        </>
      );
    });
  };

  const renderYAxisLabels = () => {
    return yAxisLabelArray.map((item, index) => {
      const yPoint = yAxisY1Point + gapBetweenYAxis * index;
      return (
        <>
          <Line
            key={index}
            x1={yAxisX1Point}
            y1={yPoint}
            x2={yAxisX1Point - 10}
            y2={yPoint}
            stroke={'#fff'}
            strokeWidth={2}
          />
          <SvgText
            y={yPoint + 5}
            x={yAxisX1Point - 25}
            textAnchor="middle"
            fill="#fff">
            {item}
          </SvgText>
        </>
      );
    });
  };

  const renderLineChart = () => {
    const dPath = getDPath();
    console.log({dPath});
    return <Path d={dPath} stroke="#fff" strokeWidth={2} fill="none" />;
  };

  const renderYAxis = () => {
    return (
      <G key="xAxis yAxis">
        <Circle
          key="xAxis x1y1-circle"
          cx={xAxisX1Point}
          cy={xAxisY1Point}
          fill="#fff"
          r="4"
        />

        <Circle
          key="yAxis y1x2-circle"
          cx={yAxisX1Point}
          cy={yAxisY1Point}
          fill="#fff"
          r="4"
        />

        <Line
          x1={yAxisX1Point}
          y1={yAxisY1Point}
          x2={yAxisX2Point}
          y2={yAxisY2Point}
          stroke="#fff"
          strokeWidth="2"
        />
      </G>
    );
  };

  const renderXAxis = () => {
    return (
      <G key="xAxis yAxis">
        <Circle
          key="xAxis x2y1-circle"
          cx={xAxisX2Point}
          cy={xAxisY1Point}
          fill="#fff"
          r="4"
        />

        <Line
          x1={xAxisX1Point}
          y1={xAxisY1Point}
          x2={xAxisX2Point}
          y2={xAxisY2Point}
          stroke="#fff"
          strokeWidth="2"
        />
      </G>
    );
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.svgWrapper}>
        <Svg width="100%" height="100%" style={styles.svgContainer}>
          {renderXAxis()}
          <Animated.View>
            <Animated.View>
              <Svg>
                <>
                  {renderYAxis()}
                  {renderLineChartData()}
                  {renderYAxisLabels()}
                  {renderLineChart()}
                </>
              </Svg>
            </Animated.View>
          </Animated.View>
        </Svg>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  svgWrapper: {
    height: 300,
    backgroundColor: '#000',
  },
  svgContainer: {
    backgroundColor: '#000',
  },
});
