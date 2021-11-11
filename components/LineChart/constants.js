import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const MARGIN_FROM_LEFT = 50;
const MARGIN_FROM_TOP = 20;
const MARGIN_FROM_RIGHT = 0;
const MARGIN_FROM_BOTTOM = 35;

const COLUMNS = 8;
const ROWS = 4;

const ITEM_WIDTH =
  (width - MARGIN_FROM_LEFT - MARGIN_FROM_RIGHT) / (COLUMNS - 1);

export {
  MARGIN_FROM_LEFT,
  MARGIN_FROM_TOP,
  MARGIN_FROM_RIGHT,
  MARGIN_FROM_BOTTOM,
  COLUMNS,
  ROWS,
  ITEM_WIDTH,
};
