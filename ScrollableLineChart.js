import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import LineChart from './components/LineChart';
import {getData2, getDatesAndAverage} from './components/LineChart/utils';
import {API_MOCK_DATA} from './data';

export default function ScrollableLineChart() {
  const [chartData, setChartData] = React.useState([]);
  const [dataCount, setDataCount] = React.useState(42);

  const [chartTitleAndAverage, setChartTitleAndAverage] = useState({
    title: '',
    average: '',
  });

  useEffect(() => {
    const dataFromAPI = getData2(API_MOCK_DATA);
    setChartData(dataFromAPI);
  }, []);

  const getChartDatesAndAverage = currIndex => {
    const [average, title] = getDatesAndAverage({
      currIndex,
      dataList: API_MOCK_DATA,
      chartColumns: 7,
    });
    setChartTitleAndAverage({average, title});
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>
        <Text style={styles.title}>{chartTitleAndAverage.title}</Text>
        <LineChart
          {...{
            chartData,
            containerHeight: 225,
            dataCount,
            getChartDatesAndAverage,
            chartColumns: 7,
          }}
        />

        <Text style={styles.average}>{chartTitleAndAverage.average}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chartContainer: {
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 25,
  },
  average: {fontSize: 25, textAlign: 'center', marginTop: 25},
});

const CHARTS = {
  weight: 'weight',
  steps: 'steps',
  measurements: 'measurements',
};

const chartTypes = [
  {
    title: 'Weekly',
    key: 'weekly',
    columnsInScreen: 7,
    availableCharts: [CHARTS.weight, CHARTS.steps],
  },
  {
    title: 'Monthly',
    key: 'monthly',
    columnsInScreen: 7,
    availableCharts: [CHARTS.weight, CHARTS.steps, CHARTS.measurements],
  },
];

const tooltipConfig = {
  weekly: {
    titleDataType: 'date',
    titleKey: 'date',
  },
  monthly: {
    titleDataType: 'string',
    titleKey: 'label',
  },
};
