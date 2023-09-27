import {Theme} from '@react-navigation/native';

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

// extendiendo un type, CustomTheme ahora esta conpuesto por las
// propiedades de los types Theme y Brand Theme
export type CustomTheme = Theme & BrandTheme;
