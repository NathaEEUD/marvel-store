import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px'
})

const styles = {
  global: {
    '*, *:before, *:after': {
      boxSizing: 'border-box'
    },
    'html, body': {
      boxSizing: 'border-box'
    }
  }
}

export default extendTheme({
  breakpoints,
  styles,
  colors: {
    primary: '#EC1D24',
    secondary: '#202020',
    tertiary: '#FEFEFE'
  }
})
