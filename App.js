import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
  debug,
  runOnJS,
} from 'react-native-reanimated';
import {withSpring} from 'react-native-reanimated/src/reanimated2/animations';
import {
  useAnimatedReaction,
  useAnimatedStyle,
} from 'react-native-reanimated/src/reanimated2/Hooks';
import Page, {COLUMNS, PAGE_WIDTH, width} from './components/Page';

const PAGE_SIZE = 100;

const _titles = Array.from({length: PAGE_SIZE}, (_, i) => `${i + 1}`);

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export default function App() {
  const [titles, setTitles] = React.useState(_titles);
  const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

  const translateX = useSharedValue(0);
  const valueAnimationEnd = useSharedValue(0);

  const check = useSharedValue(0);
  const animationEnd = useSharedValue(0);

  const [page, setPage] = React.useState(1);

  const [xVal, setXVal] = useState(COLUMNS);

  const setValue = val => {
    console.log({val});
    setXVal(val);
  };

  useEffect(() => {
    const limit = page * PAGE_SIZE - PAGE_SIZE + 1;

    if (Math.abs(xVal) > limit) {
      console.log({page});
      setPage((page * PAGE_SIZE) / PAGE_SIZE + 1);
    }
  }, [xVal]);

  useEffect(() => {
    if (page > 1) {
      const _titles1 = Array.from(
        {length: PAGE_SIZE},
        (_, i) => `${(page - 1) * PAGE_SIZE + i + 1}`,
      );
      setTitles([...titles, ..._titles1]);
    }
  }, [page]);

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(
      Math.min(translateX.value, -MAX_TRANSLATE_X - PAGE_WIDTH * (COLUMNS - 1)),
      0,
    );
  }, [MAX_TRANSLATE_X]);

  useAnimatedReaction(
    () => {
      return clampedTranslateX.value / PAGE_WIDTH;
    },
    data => {
      if (
        animationEnd.value === 1 ||
        (Math.round(Math.abs(MAX_TRANSLATE_X) / PAGE_WIDTH) <
          Math.round(data) + 49 &&
          check.value === 0)
      ) {
        check.value = 1;
        runOnJS(setValue)(Math.round(data + COLUMNS));
      }

      if (animationEnd.value === 1) {
        animationEnd.value = 0;
      }

      if (
        Math.round(Math.abs(MAX_TRANSLATE_X) / PAGE_WIDTH) >
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
      let next = 0;

      if (Math.abs(event.velocityX) > 6000) {
        next = PAGE_WIDTH * COLUMNS * 4;
      } else if (Math.abs(event.velocityX) > 3500) {
        next = PAGE_WIDTH * COLUMNS * 3;
      } else if (Math.abs(event.velocityX) > 1500) {
        next = PAGE_WIDTH * COLUMNS * 2;
      } else if (Math.abs(event.velocityX) > 500) {
        next = PAGE_WIDTH * COLUMNS * 1;
      } else {
        const transX = Math.abs(event.translationX);
        const HALF_WIDTH = PAGE_WIDTH / 2;
        const mod = transX % PAGE_WIDTH;
        const extra = mod >= HALF_WIDTH ? 1 : 0;
        const divNum = Math.floor(transX / PAGE_WIDTH);
        next = (extra + divNum) * PAGE_WIDTH;
      }

      if (event.velocityX < 0) {
        next = -next;
      } //  const velocityX = event.velocityX > 2500 ? 2500 : event.velocityX;

      const endValue =
        valueAnimationEnd.value < 0
          ? 0
          : valueAnimationEnd.value > Math.abs(MAX_TRANSLATE_X)
          ? Math.abs(MAX_TRANSLATE_X)
          : valueAnimationEnd.value;
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
    <SafeAreaView style={[styles.container]}>
      <View>
        <Text>{xVal}</Text>
      </View>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{height: 250}}>
          <Animated.View style={[{flexDirection: 'row', flex: 1}, rStyle]}>
            {titles.map((title, index) => {
              return (
                <Page
                  key={index.toString()}
                  translateX={clampedTranslateX}
                  index={index}
                  title={title}
                />
              );
            })}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden',
  },
});
