import 'styled-components';
import { theme } from '@team-aliens/design-system/dist/styles/theme';

type CustomTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
