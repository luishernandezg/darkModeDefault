import {NavigationContainer, Theme} from '@react-navigation/native';

type BrandTheme = {
  customColors: {
    commonWhite: string;
    commonBlack: string;
    themeColor: string;
    white: string;
    sky: string;
    gray: string;
  };
};

export type CustomTheme = Theme & BrandTheme;
