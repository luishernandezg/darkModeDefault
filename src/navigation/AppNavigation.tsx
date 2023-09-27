import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCallback, useState, useMemo} from 'react';
import {useColorScheme} from 'react-native';

import {Colors} from '../theme';
import HomeScreen from '../screens/HomeScreen';
import {PreferencesContext} from '../preferences/PreferencesContext';
import {storage} from '../local-storage/LocalStorage';
import {isDarkThemeKeyStore} from '../constants/Constants';

const RootStack = createNativeStackNavigator();

const AppContainer = () => {
  // Logica para cargar la preferencia guardada en local
  const initialThemeValue = () => {
    const storedValue = storage.getBoolean(isDarkThemeKeyStore);
    if (storedValue == undefined) {
      // usa el API de reac native para recuperar el tema actual del dispositivo
      // DOC LINK ->  https://reactnative.dev/docs/usecolorscheme
      const currentTheme = useColorScheme();
      return currentTheme == 'dark';
    } else {
      return storedValue;
    }
  };

  const [isThemeDark, setIsThemeDark] = useState(initialThemeValue);

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  // usamos preferencesContext para pasar data entre componentes sin usar props
  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <NavigationContainer theme={isThemeDark ? Colors.dark : Colors.light}>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen name={'home'} component={HomeScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </PreferencesContext.Provider>
  );
};

export default AppContainer;
