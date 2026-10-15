import {
  Fonts,
  Gutters,
  Layout,
  DefaultVariables,
  Colors,
  FontSize,
} from '../theme';

export default function useTheme() {
  const themeVariables = DefaultVariables;

  return {
    Colors,
    FontSize,
    Fonts: Fonts(themeVariables),
    Gutters: Gutters(themeVariables),
    Layout: Layout(themeVariables),
  };
}