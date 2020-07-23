/* CSS Custom Properties */

export const MAX_PAGE_WIDTH = 600;

// colors
export const colors = {
  // grayscale
  darkgray: '#333',
  gray: '#757575',
  lightgray: '#858585',
  darksilver: '#aaa',
  dimsilver: '#ccc',
  silver: '#e2e2e2',
  lightsilver: '#efefef',
  whitesmoke: '#f8f8f8',
  white: '#fff',

  // color
  red: '#ed4956',
  lightGreen: '#58c322',
  lightBlue: '#0095f6',
  darkBlue: '#00376b',
};

// spacing
const spacingBase = 8;
export const spacing = {
  half: spacingBase / 2, // 4px
  normal: spacingBase, // 8px
  double: spacingBase * 2, // 16px
  triple: spacingBase * 3, // 24px
  quadruple: spacingBase * 4, // 32px
};

// border radius
const radiusBase = 4;
export const radius = {
  normal: radiusBase,
  double: radiusBase * 2,
  round: radiusBase * 100,
};

export const fontFamily = {
  default: 'unset',
  monospaced: 'Andale Mono, Courier New, Lucida Console',
};

// font sizes
export const fontSize = {
  xxxs: '.6rem',
  xxs: '.8rem',
  xs: '1rem',
  s: '1.2rem',
  m: '1.4rem',
  l: '1.6rem',
  xl: '1.8rem',
  xxl: '2rem',
};
