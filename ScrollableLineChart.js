import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';

import LineChart from './components/LineChart';

const days = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

const DATA = Array.from({length: 21}, (_, i) => {
  const current = i + 1;

  const mod = current % 7;

  return {
    key: current,
    value: Math.floor(Math.random() * 100) + 100,
    day: days[mod],
  };
});

export default function ScrollableLineChart() {
  const [chartData, setChartData] = React.useState([
    DATA1,
    DATA2,
    DATA3,
    DATA4,
    DATA5,
    DATA6,
    DATA1,
    DATA1,
    DATA1,
    DATA1,
    DATA1,
    DATA1,
  ]);
  const [dataCount, setDataCount] = React.useState(DATA1.length);
  const [chartRenderNo, setChartRenderNo] = React.useState(1);
  return (
    <SafeAreaView style={[styles.container]}>
      <LineChart
        {...{chartData, containerHeight: 250, dataCount, chartRenderNo}}
      />

      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#ff0000', padding: 10}]}
        onPress={() => {
          setDataCount(dataCount + DATA1.length);
          setChartRenderNo(chartRenderNo + 1);
        }}>
        <Text style={styles.buttonText}>Change Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const DATA1 = [
  {key: 1, value: 108, day: 'Mon'},
  {key: 2, value: 105, day: 'Tue'},
  {key: 3, value: 101, day: 'Wed'},
  {key: 4, value: 111, day: 'Thu'},
  {key: 5, value: 101, day: 'Fri'},
  {key: 6, value: 100, day: 'Sat'},
  {key: 7, value: 101, day: 'Sun'},
  {key: 8, value: 100, day: 'Mon'},
  {key: 9, value: 99, day: 'Tue'},
  {key: 10, value: 100, day: 'Wed'},
  {key: 11, value: 100, day: 'Thu'},
  {key: 12, value: 100, day: 'Fri'},
  {key: 13, value: 100, day: 'Sat'},
  {key: 14, value: 101, day: 'Sun'},
  {key: 15, value: 101, day: 'Mon'},
  {key: 16, value: 100, day: 'Tue'},
  {key: 17, value: 100, day: 'Wed'},
  {key: 18, value: 101, day: 'Thu'},
  {key: 19, value: 100, day: 'Fri'},
  {key: 20, value: 115, day: 'Sat'},
  {key: 21, value: 101, day: 'Sun'},
];
const DATA2 = [
  {key: 21, value: 101, day: 'Sun'},
  {key: 22, value: 105, day: 'Tue'},
  {key: 23, value: 101, day: 'Wed'},
  {key: 24, value: 111, day: 'Thu'},
  {key: 25, value: 101, day: 'Fri'},
  {key: 26, value: 100, day: 'Sat'},
  {key: 27, value: 101, day: 'Sun'},
  {key: 28, value: 100, day: 'Mon'},
  {key: 29, value: 99, day: 'Tue'},
  {key: 30, value: 100, day: 'Wed'},
  {key: 31, value: 100, day: 'Thu'},
  {key: 32, value: 100, day: 'Fri'},
  {key: 33, value: 100, day: 'Sat'},
  {key: 34, value: 101, day: 'Sun'},
  {key: 35, value: 101, day: 'Mon'},
  {key: 36, value: 100, day: 'Tue'},
  {key: 37, value: 100, day: 'Wed'},
  {key: 38, value: 101, day: 'Thu'},
  {key: 39, value: 100, day: 'Fri'},
  {key: 40, value: 115, day: 'Sat'},
  {key: 41, value: 101, day: 'Sun'},
  {key: 42, value: 101, day: 'Sun'},
];

const DATA3 = [
  {key: 42, value: 101, day: 'Sun'},
  {key: 43, value: 101, day: 'Sun'},
  {key: 44, value: 105, day: 'Tue'},
  {key: 45, value: 101, day: 'Wed'},
  {key: 46, value: 111, day: 'Thu'},
  {key: 47, value: 101, day: 'Fri'},
  {key: 48, value: 100, day: 'Sat'},
  {key: 49, value: 101, day: 'Sun'},
  {key: 50, value: 100, day: 'Mon'},
  {key: 51, value: 99, day: 'Tue'},
  {key: 52, value: 100, day: 'Wed'},
  {key: 53, value: 100, day: 'Thu'},
  {key: 54, value: 100, day: 'Fri'},
  {key: 55, value: 100, day: 'Sat'},
  {key: 56, value: 101, day: 'Sun'},
  {key: 57, value: 101, day: 'Mon'},
  {key: 58, value: 100, day: 'Tue'},
  {key: 59, value: 100, day: 'Wed'},
  {key: 60, value: 101, day: 'Thu'},
  {key: 61, value: 100, day: 'Fri'},
  {key: 62, value: 115, day: 'Sat'},
  {key: 63, value: 101, day: 'Sun'},
];

const DATA4 = [
  {key: 63, value: 101, day: 'Sun'},
  {key: 64, value: 101, day: 'Sun'},
  {key: 65, value: 105, day: 'Tue'},
  {key: 66, value: 101, day: 'Wed'},
  {key: 67, value: 111, day: 'Thu'},
  {key: 68, value: 101, day: 'Fri'},
  {key: 69, value: 100, day: 'Sat'},
  {key: 70, value: 101, day: 'Sun'},
  {key: 71, value: 100, day: 'Mon'},
  {key: 72, value: 99, day: 'Tue'},
  {key: 73, value: 100, day: 'Wed'},
  {key: 74, value: 100, day: 'Thu'},
  {key: 75, value: 100, day: 'Fri'},
  {key: 76, value: 100, day: 'Sat'},
  {key: 77, value: 101, day: 'Sun'},
  {key: 78, value: 101, day: 'Mon'},
  {key: 79, value: 100, day: 'Tue'},
  {key: 80, value: 100, day: 'Wed'},
  {key: 81, value: 101, day: 'Thu'},
  {key: 82, value: 100, day: 'Fri'},
  {key: 83, value: 115, day: 'Sat'},
  {key: 84, value: 101, day: 'Sun'},
];

const DATA5 = [
  {key: 84, value: 101, day: 'Sun'},
  {key: 85, value: 101, day: 'Sun'},
  {key: 86, value: 105, day: 'Tue'},
  {key: 87, value: 101, day: 'Wed'},
  {key: 88, value: 111, day: 'Thu'},
  {key: 89, value: 101, day: 'Fri'},
  {key: 90, value: 100, day: 'Sat'},
  {key: 91, value: 101, day: 'Sun'},
  {key: 92, value: 100, day: 'Mon'},
  {key: 93, value: 99, day: 'Tue'},
  {key: 94, value: 100, day: 'Wed'},
  {key: 95, value: 100, day: 'Thu'},
  {key: 96, value: 100, day: 'Fri'},
  {key: 97, value: 100, day: 'Sat'},
  {key: 98, value: 101, day: 'Sun'},
  {key: 99, value: 101, day: 'Mon'},
  {key: 100, value: 100, day: 'Tue'},
  {key: 101, value: 100, day: 'Wed'},
  {key: 102, value: 101, day: 'Thu'},
  {key: 103, value: 100, day: 'Fri'},
  {key: 104, value: 115, day: 'Sat'},
  {key: 105, value: 101, day: 'Sun'},
];

const DATA6 = [
  {key: 105, value: 101, day: 'Sun'},
  {key: 106, value: 101, day: 'Sun'},
  {key: 107, value: 105, day: 'Tue'},
  {key: 108, value: 101, day: 'Wed'},
  {key: 109, value: 111, day: 'Thu'},
  {key: 110, value: 101, day: 'Fri'},
  {key: 111, value: 100, day: 'Sat'},
  {key: 112, value: 101, day: 'Sun'},
  {key: 113, value: 100, day: 'Mon'},
  {key: 114, value: 99, day: 'Tue'},
  {key: 115, value: 100, day: 'Wed'},
  {key: 116, value: 100, day: 'Thu'},
  {key: 117, value: 100, day: 'Fri'},
  {key: 118, value: 100, day: 'Sat'},
  {key: 119, value: 101, day: 'Sun'},
  {key: 120, value: 101, day: 'Mon'},
  {key: 121, value: 100, day: 'Tue'},
  {key: 122, value: 100, day: 'Wed'},
  {key: 123, value: 101, day: 'Thu'},
  {key: 124, value: 100, day: 'Fri'},
  {key: 125, value: 115, day: 'Sat'},
  {key: 126, value: 101, day: 'Sun'},
];
