import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const COLUMNS = 8;
const PAGE_WIDTH = (width - 20) / COLUMNS;

const Page = ({index, title}) => {
  return (
    <Animated.View
      style={[
        {
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
          alignItems: 'center',
          justifyContent: 'center',
          width: PAGE_WIDTH,
          transform: [{scaleX: -1}],
          borderEndWidth: 1,
          borderEndColor: '#000',
        },
      ]}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}>
        {title}
      </Text>
    </Animated.View>
  );
};

export {PAGE_WIDTH, COLUMNS, width};
export default Page;

const styles = StyleSheet.create({});
