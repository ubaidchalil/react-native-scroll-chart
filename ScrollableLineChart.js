import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

import LineChart from './components/LineChart';
import {getData, getData2} from './components/LineChart/utils';

export default function ScrollableLineChart() {
  const [chartData, setChartData] = React.useState([]);
  const [dataCount, setDataCount] = React.useState(1400);

  useEffect(() => {
    const data = getData();

    getData2();
    setChartData(data);
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <LineChart {...{chartData, containerHeight: 250, dataCount}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
