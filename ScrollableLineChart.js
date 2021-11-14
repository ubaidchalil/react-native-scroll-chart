import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';

import LineChart from './components/LineChart';
import {getData} from './components/LineChart/utils';

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
  const [chartData, setChartData] = React.useState([]);
  const [dataCount, setDataCount] = React.useState(175);

  useEffect(() => {
    // const data = getData();
    // console.log('data', {data});
    setChartData(data1);
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

const data1 = [
  [
    {
      key: 1,
      value: 194,
      day: 'Sun',
    },
    {
      key: 2,
      value: 181,
      day: 'Sun',
    },
    {
      key: 3,
      value: 123,
      day: 'Sun',
    },
    {
      key: 4,
      value: 105,
      day: 'Sun',
    },
    {
      key: 5,
      value: 106,
      day: 'Sun',
    },
    {
      key: 6,
      value: 181,
      day: 'Sun',
    },
    {
      key: 7,
      value: 159,
      day: 'Sun',
    },
    {
      key: 8,
      value: 135,
      day: 'Sun',
    },
    {
      key: 9,
      value: 105,
      day: 'Sun',
    },
    {
      key: 10,
      value: 138,
      day: 'Sun',
    },
    {
      key: 11,
      value: 107,
      day: 'Sun',
    },
    {
      key: 12,
      value: 100,
      day: 'Sun',
    },
    {
      key: 13,
      value: 154,
      day: 'Sun',
    },
    {
      key: 14,
      value: 124,
      day: 'Sun',
    },
    {
      key: 15,
      value: 188,
      day: 'Sun',
    },
    {
      key: 16,
      value: 101,
      day: 'Sun',
    },
    {
      key: 17,
      value: 194,
      day: 'Sun',
    },
    {
      key: 18,
      value: 149,
      day: 'Sun',
    },
    {
      key: 19,
      value: 105,
      day: 'Sun',
    },
    {
      key: 20,
      value: 189,
      day: 'Sun',
    },
    {
      key: 21,
      value: 130,
      day: 'Sun',
    },
    {
      key: 22,
      value: 186,
      day: 'Sun',
    },
    {
      key: 23,
      value: 184,
      day: 'Sun',
    },
    {
      key: 24,
      value: 185,
      day: 'Sun',
    },
    {
      key: 25,
      value: 109,
      day: 'Sun',
    },
    {
      key: 26,
      value: 149,
      day: 'Sun',
    },
    {
      key: 27,
      value: 128,
      day: 'Sun',
    },
    {
      key: 28,
      value: 142,
      day: 'Sun',
    },
    {
      key: 29,
      value: 113,
      day: 'Sun',
    },
    {
      key: 30,
      value: 165,
      day: 'Sun',
    },
    {
      key: 31,
      value: 170,
      day: 'Sun',
    },
    {
      key: 32,
      value: 195,
      day: 'Sun',
    },
    {
      key: 33,
      value: 155,
      day: 'Sun',
    },
    {
      key: 34,
      value: 185,
      day: 'Sun',
    },
    {
      key: 35,
      value: 118,
      day: 'Sun',
    },
  ],
  [
    {
      key: 35,
      value: 118,
      day: 'Sun',
    },
    {
      key: 36,
      value: 146,
      day: 'Sun',
    },
    {
      key: 37,
      value: 191,
      day: 'Sun',
    },
    {
      key: 38,
      value: 190,
      day: 'Sun',
    },
    {
      key: 39,
      value: 120,
      day: 'Sun',
    },
    {
      key: 40,
      value: 185,
      day: 'Sun',
    },
    {
      key: 41,
      value: 112,
      day: 'Sun',
    },
    {
      key: 42,
      value: 158,
      day: 'Sun',
    },
    {
      key: 43,
      value: 107,
      day: 'Sun',
    },
    {
      key: 44,
      value: 100,
      day: 'Sun',
    },
    {
      key: 45,
      value: 145,
      day: 'Sun',
    },
    {
      key: 46,
      value: 113,
      day: 'Sun',
    },
    {
      key: 47,
      value: 166,
      day: 'Sun',
    },
    {
      key: 48,
      value: 129,
      day: 'Sun',
    },
    {
      key: 49,
      value: 188,
      day: 'Sun',
    },
    {
      key: 50,
      value: 125,
      day: 'Sun',
    },
    {
      key: 51,
      value: 178,
      day: 'Sun',
    },
    {
      key: 52,
      value: 125,
      day: 'Sun',
    },
    {
      key: 53,
      value: 150,
      day: 'Sun',
    },
    {
      key: 54,
      value: 108,
      day: 'Sun',
    },
    {
      key: 55,
      value: 116,
      day: 'Sun',
    },
    {
      key: 56,
      value: 181,
      day: 'Sun',
    },
    {
      key: 57,
      value: 110,
      day: 'Sun',
    },
    {
      key: 58,
      value: 160,
      day: 'Sun',
    },
    {
      key: 59,
      value: 116,
      day: 'Sun',
    },
    {
      key: 60,
      value: 196,
      day: 'Sun',
    },
    {
      key: 61,
      value: 157,
      day: 'Sun',
    },
    {
      key: 62,
      value: 123,
      day: 'Sun',
    },
    {
      key: 63,
      value: 182,
      day: 'Sun',
    },
    {
      key: 64,
      value: 173,
      day: 'Sun',
    },
    {
      key: 65,
      value: 169,
      day: 'Sun',
    },
    {
      key: 66,
      value: 150,
      day: 'Sun',
    },
    {
      key: 67,
      value: 171,
      day: 'Sun',
    },
    {
      key: 68,
      value: 179,
      day: 'Sun',
    },
    {
      key: 69,
      value: 198,
      day: 'Sun',
    },
    {
      key: 70,
      value: 131,
      day: 'Sun',
    },
  ],
  [
    {
      key: 70,
      value: 131,
      day: 'Sun',
    },
    {
      key: 71,
      value: 104,
      day: 'Sun',
    },
    {
      key: 72,
      value: 154,
      day: 'Sun',
    },
    {
      key: 73,
      value: 185,
      day: 'Sun',
    },
    {
      key: 74,
      value: 108,
      day: 'Sun',
    },
    {
      key: 75,
      value: 134,
      day: 'Sun',
    },
    {
      key: 76,
      value: 169,
      day: 'Sun',
    },
    {
      key: 77,
      value: 164,
      day: 'Sun',
    },
    {
      key: 78,
      value: 155,
      day: 'Sun',
    },
    {
      key: 79,
      value: 160,
      day: 'Sun',
    },
    {
      key: 80,
      value: 123,
      day: 'Sun',
    },
    {
      key: 81,
      value: 130,
      day: 'Sun',
    },
    {
      key: 82,
      value: 169,
      day: 'Sun',
    },
    {
      key: 83,
      value: 112,
      day: 'Sun',
    },
    {
      key: 84,
      value: 115,
      day: 'Sun',
    },
    {
      key: 85,
      value: 148,
      day: 'Sun',
    },
    {
      key: 86,
      value: 101,
      day: 'Sun',
    },
    {
      key: 87,
      value: 186,
      day: 'Sun',
    },
    {
      key: 88,
      value: 191,
      day: 'Sun',
    },
    {
      key: 89,
      value: 144,
      day: 'Sun',
    },
    {
      key: 90,
      value: 164,
      day: 'Sun',
    },
    {
      key: 91,
      value: 168,
      day: 'Sun',
    },
    {
      key: 92,
      value: 157,
      day: 'Sun',
    },
    {
      key: 93,
      value: 109,
      day: 'Sun',
    },
    {
      key: 94,
      value: 165,
      day: 'Sun',
    },
    {
      key: 95,
      value: 160,
      day: 'Sun',
    },
    {
      key: 96,
      value: 199,
      day: 'Sun',
    },
    {
      key: 97,
      value: 157,
      day: 'Sun',
    },
    {
      key: 98,
      value: 129,
      day: 'Sun',
    },
    {
      key: 99,
      value: 132,
      day: 'Sun',
    },
    {
      key: 100,
      value: 108,
      day: 'Sun',
    },
    {
      key: 101,
      value: 188,
      day: 'Sun',
    },
    {
      key: 102,
      value: 133,
      day: 'Sun',
    },
    {
      key: 103,
      value: 137,
      day: 'Sun',
    },
    {
      key: 104,
      value: 185,
      day: 'Sun',
    },
    {
      key: 105,
      value: 123,
      day: 'Sun',
    },
  ],
  [
    {
      key: 105,
      value: 123,
      day: 'Sun',
    },
    {
      key: 106,
      value: 128,
      day: 'Sun',
    },
    {
      key: 107,
      value: 102,
      day: 'Sun',
    },
    {
      key: 108,
      value: 106,
      day: 'Sun',
    },
    {
      key: 109,
      value: 157,
      day: 'Sun',
    },
    {
      key: 110,
      value: 115,
      day: 'Sun',
    },
    {
      key: 111,
      value: 155,
      day: 'Sun',
    },
    {
      key: 112,
      value: 155,
      day: 'Sun',
    },
    {
      key: 113,
      value: 148,
      day: 'Sun',
    },
    {
      key: 114,
      value: 193,
      day: 'Sun',
    },
    {
      key: 115,
      value: 169,
      day: 'Sun',
    },
    {
      key: 116,
      value: 197,
      day: 'Sun',
    },
    {
      key: 117,
      value: 131,
      day: 'Sun',
    },
    {
      key: 118,
      value: 169,
      day: 'Sun',
    },
    {
      key: 119,
      value: 189,
      day: 'Sun',
    },
    {
      key: 120,
      value: 149,
      day: 'Sun',
    },
    {
      key: 121,
      value: 193,
      day: 'Sun',
    },
    {
      key: 122,
      value: 169,
      day: 'Sun',
    },
    {
      key: 123,
      value: 129,
      day: 'Sun',
    },
    {
      key: 124,
      value: 166,
      day: 'Sun',
    },
    {
      key: 125,
      value: 108,
      day: 'Sun',
    },
    {
      key: 126,
      value: 108,
      day: 'Sun',
    },
    {
      key: 127,
      value: 179,
      day: 'Sun',
    },
    {
      key: 128,
      value: 169,
      day: 'Sun',
    },
    {
      key: 129,
      value: 164,
      day: 'Sun',
    },
    {
      key: 130,
      value: 150,
      day: 'Sun',
    },
    {
      key: 131,
      value: 129,
      day: 'Sun',
    },
    {
      key: 132,
      value: 179,
      day: 'Sun',
    },
    {
      key: 133,
      value: 184,
      day: 'Sun',
    },
    {
      key: 134,
      value: 156,
      day: 'Sun',
    },
    {
      key: 135,
      value: 112,
      day: 'Sun',
    },
    {
      key: 136,
      value: 119,
      day: 'Sun',
    },
    {
      key: 137,
      value: 130,
      day: 'Sun',
    },
    {
      key: 138,
      value: 163,
      day: 'Sun',
    },
    {
      key: 139,
      value: 179,
      day: 'Sun',
    },
    {
      key: 140,
      value: 174,
      day: 'Sun',
    },
  ],
  [
    {
      key: 140,
      value: 174,
      day: 'Sun',
    },
    {
      key: 141,
      value: 176,
      day: 'Sun',
    },
    {
      key: 142,
      value: 107,
      day: 'Sun',
    },
    {
      key: 143,
      value: 170,
      day: 'Sun',
    },
    {
      key: 144,
      value: 173,
      day: 'Sun',
    },
    {
      key: 145,
      value: 127,
      day: 'Sun',
    },
    {
      key: 146,
      value: 188,
      day: 'Sun',
    },
    {
      key: 147,
      value: 119,
      day: 'Sun',
    },
    {
      key: 148,
      value: 157,
      day: 'Sun',
    },
    {
      key: 149,
      value: 190,
      day: 'Sun',
    },
    {
      key: 150,
      value: 158,
      day: 'Sun',
    },
    {
      key: 151,
      value: 139,
      day: 'Sun',
    },
    {
      key: 152,
      value: 157,
      day: 'Sun',
    },
    {
      key: 153,
      value: 152,
      day: 'Sun',
    },
    {
      key: 154,
      value: 118,
      day: 'Sun',
    },
    {
      key: 155,
      value: 125,
      day: 'Sun',
    },
    {
      key: 156,
      value: 185,
      day: 'Sun',
    },
    {
      key: 157,
      value: 147,
      day: 'Sun',
    },
    {
      key: 158,
      value: 193,
      day: 'Sun',
    },
    {
      key: 159,
      value: 190,
      day: 'Sun',
    },
    {
      key: 160,
      value: 107,
      day: 'Sun',
    },
    {
      key: 161,
      value: 176,
      day: 'Sun',
    },
    {
      key: 162,
      value: 186,
      day: 'Sun',
    },
    {
      key: 163,
      value: 149,
      day: 'Sun',
    },
    {
      key: 164,
      value: 144,
      day: 'Sun',
    },
    {
      key: 165,
      value: 174,
      day: 'Sun',
    },
    {
      key: 166,
      value: 186,
      day: 'Sun',
    },
    {
      key: 167,
      value: 153,
      day: 'Sun',
    },
    {
      key: 168,
      value: 132,
      day: 'Sun',
    },
    {
      key: 169,
      value: 169,
      day: 'Sun',
    },
    {
      key: 170,
      value: 142,
      day: 'Sun',
    },
    {
      key: 171,
      value: 110,
      day: 'Sun',
    },
    {
      key: 172,
      value: 155,
      day: 'Sun',
    },
    {
      key: 173,
      value: 116,
      day: 'Sun',
    },
    {
      key: 174,
      value: 137,
      day: 'Sun',
    },
    {
      key: 175,
      value: 158,
      day: 'Sun',
    },
  ],
];
