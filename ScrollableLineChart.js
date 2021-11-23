import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import 'react-native-gesture-handler';

import LineChart from './components/LineChart';
import {getData, getData2} from './components/LineChart/utils';

export default function ScrollableLineChart() {
  const [chartData, setChartData] = React.useState([]);
  const [dataCount, setDataCount] = React.useState(1400);

  useEffect(() => {
    const data = getData();
    // const data = getData2(data);
    setChartData(data);
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <LineChart {...{chartData, containerHeight: 250, dataCount}} />
    </SafeAreaView>
  );
}

const data1 = [
  {
    date: '2021-11-07',
    value: null,
    previousValue: null,
    nextValue: 181.0921244561723,
    label: 'Sun',
  },
  {
    date: '2021-11-06',
    value: null,
    previousValue: null,
    nextValue: 181.0921244561723,
    label: 'Sat',
  },
  {
    date: '2021-11-05',
    value: null,
    previousValue: null,
    nextValue: 181.0921244561723,
    label: 'Fri',
  },
  {
    date: '2021-11-04',
    value: null,
    previousValue: null,
    nextValue: 181.0921244561723,
    label: 'Thu',
  },
  {
    date: '2021-11-03',
    value: null,
    previousValue: null,
    nextValue: 181.0921244561723,
    label: 'Wed',
  },
  {
    date: '2021-11-02',
    value: 181.0921244561723,
    previousValue: null,
    nextValue: 174.1,
    label: 'Tue',
  },
  {
    date: '2021-11-01',
    value: 174.1,
    previousValue: 181.0921244561723,
    nextValue: 184.42331273633243,
    label: 'Mon',
  },
  {
    date: '2021-10-31',
    value: null,
    previousValue: 174.1,
    nextValue: 184.42331273633243,
    label: 'Sun',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chartContainer: {
    paddingHorizontal: 10,
  },
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

const data2 = [
  {
    date: '2021-11-07',
    value: null,
    previousValue: null,
    nextValue: 181.0921244561723,
    label: 'Sun',
    nextValueIndex: 6,
  },
  {
    date: '2021-11-06',
    value: null,
    previousValue: null,
    nextValue: 181.0921244561723,
    label: 'Sat',
    nextValueIndex: 6,
  },
  {
    date: '2021-11-05',
    value: null,
    previousValue: null,
    nextValue: 181.0921244561723,
    label: 'Fri',
    nextValueIndex: 6,
  },
  {
    date: '2021-11-04',
    value: null,
    previousValue: null,
    nextValue: 181.0921244561723,
    label: 'Thu',
    nextValueIndex: 6,
  },
  {
    date: '2021-11-03',
    value: null,
    previousValue: null,
    nextValue: 181.0921244561723,
    label: 'Wed',
    nextValueIndex: 6,
  },
  {
    date: '2021-11-02',
    value: 181.0921244561723,
    previousValue: null,
    nextValue: 174.1,
    label: 'Tue',
    nextValueIndex: 7,
  },
  {
    date: '2021-11-01',
    value: 174.1,
    previousValue: 181.0921244561723,
    nextValue: 184.42331273633243,
    label: 'Mon',
  },
];
