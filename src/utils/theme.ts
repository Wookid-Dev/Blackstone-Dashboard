import { extendTheme, ThemeConfig, StyleFunctionProps} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : '#f0f4f8',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
      },
    }),
  },
  components: {
    Alert: {
      baseStyle: {
        container: {
          borderRadius: 'md',
          boxShadow: 'md',
        },
      },
      variants: {
        subtle: (props: StyleFunctionProps) => ({
          container: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          },
        }),
        'left-accent': {
          container: {
            borderLeft: '4px solid',
          },
        },
        'top-accent': {
          container: {
            borderTop: '4px solid',
          },
        },
        solid: (props: StyleFunctionProps) => ({
          container: {
            bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.700',
          },
        }),
      },
    },
  },
});

export default theme;
