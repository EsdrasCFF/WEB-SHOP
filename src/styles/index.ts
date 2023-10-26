import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme
} = createStitches({
  theme: {
    colors: {
      white: '#FFF',

      gray100: '#e1e1e6',
      gray300: '#c4c4cc',
      gray800: '#202024',
      gray900: '#121214',

      green300: '#00875f',
      green500: '#00b37e',


    }
  }
})