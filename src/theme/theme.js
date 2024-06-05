// customTheme.js
import { extendTheme } from 'native-base';

const customTheme = extendTheme({
  colors: {
    primary: {
      50: '#fff7cc',
      100: '#ffeb99',
      200: '#ffde66',
      300: '#ffd033',
      400: '#ffc300',
      500: '#ffb703', // Main primary color
      600: '#db9303',
      700: '#b76f03',
      800: '#924b03',
      900: '#6d2703',
    },
    secondary: {
      50: '#d4f0ff',
      100: '#a8dfff',
      200: '#7bceff',
      300: '#4fbeff',
      400: '#22adff',
      500: '#219EBC', // Main secondary color
      600: '#1a7f96',
      700: '#136070',
      800: '#0c414a',
      900: '#052224',
    },
    tertiary: {
      50: '#d6eaf2',
      100: '#adcfd6',
      200: '#84b4bb',
      300: '#5c98a0',
      400: '#337d85',
      500: '#023047', // Main tertiary color
      600: '#02273a',
      700: '#011e2d',
      800: '#011620',
      900: '#000d13',
    },
    accent: {
      50: '#ffe5d6',
      100: '#ffbfa8',
      200: '#ff997a',
      300: '#ff734c',
      400: '#ff4d1e',
      500: '#FB8500', // Main accent color
      600: '#c66a00',
      700: '#924f00',
      800: '#5e3400',
      900: '#2a1900',
    },
    background: {
      50: '#f0f4f8', // Light background color
      100: '#d9e2ec',
      200: '#bcccdc',
      300: '#9fb3c8',
      400: '#829ab1',
      500: '#627d98',
      600: '#486581',
      700: '#334e68',
      800: '#243b53',
      900: '#102a43', // Dark background color
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'RobotoMono',
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'md',
      },
      defaultProps: {
        colorScheme: 'primary',
      },
      variants: {
        solid: ({ colorScheme }) => ({
          bg: `${colorScheme}.500`,
          _hover: {
            bg: `${colorScheme}.600`,
          },
          _pressed: {
            bg: `${colorScheme}.700`,
          },
        }),
      },
    },
    Input: {
      baseStyle: {
        rounded: 'md',
        borderColor: 'tertiary.500',
      },
      defaultProps: {
        focusBorderColor: 'primary.500',
      },
    },
    Heading: {
      baseStyle: {
        color: 'tertiary.500',
        fontWeight: 'bold',
      },
    },
    Text: {
      baseStyle: {
        color: 'secondary.700',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default customTheme;


// Backgrounds: Lighter shades of the tertiary or secondary colors.
// Buttons: Primary and accent colors.
// Headings: Darker shades of the tertiary color.
// Text: Secondary color for regular text, tertiary color for important text.
// Here’s a detailed mapping:

// Background Color: #f0f4f8 (a very light shade to ensure good readability).
// Button Background Color: Primary (#ffb703) or Accent (#FB8500).
// Heading Color: Tertiary (#023047).
// Text Color: Secondary (#219EBC).
