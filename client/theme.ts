import { MantineThemeOverride } from '@mantine/core'

const myTheme: MantineThemeOverride = {
  colorScheme: 'light',

  defaultRadius: 'md',

  loader: 'dots',

  cursorType: 'pointer',

  respectReducedMotion: true,

  white: '#ffffff',
  black: '#000000',

  fontFamily: 'Inter, sans-serif',

  fontSizes: {
    xs: '0.75rem',
    sm: '0.9rem',
    md: '1rem',
    lg: '1.2rem',
    xl: '1.5rem',
  },

  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },

  colors: {
    fawn: [
      '#f9f5ed',
      '#eee0ca',
      '#eedbcb',
      '#d8b884',
      '#cda361',
      '#c18f3e',
      '#9e7532',
      '#7b5b27',
      '#58411c',
      '#352711',
    ],
  },

  primaryColor: 'fawn',

  components: {
    Button: {
      defaultProps: { color: 'dark', radius: 'xl', loaderPosition: 'center' },
      styles: (theme) => ({
        root: {
          textAlign: 'center',
          marginRight: theme.spacing.md,
          borderWidth: '3px',
          fontWeight: 600,
        },
      }),
    },
  },

  globalStyles: (theme) => ({
    'html, body': {
      ...theme.fn.fontStyles(),
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.fawn[1]
          : theme.colors.fawn[0],
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.fawn[7]
          : theme.colors.fawn[8],
    },
  }),
}

export default myTheme
