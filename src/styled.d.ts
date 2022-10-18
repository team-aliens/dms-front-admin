import 'styled-components';
import { theme } from 'aliens-design-system-front/dist/styles/theme';

type CustomTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
