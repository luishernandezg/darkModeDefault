import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {CustomTheme} from '../theme/CustomTheme';
import {PreferencesContext} from '../preferences/PreferencesContext';
import {storage} from '../local-storage/LocalStorage';
import {isDarkThemeKeyStore} from '../constants/Constants';
import {useMMKVBoolean} from 'react-native-mmkv';
import { useContext } from 'react';


const HomeScreen = () => {
  // realizamos una conversion de tipos dado que el Api de Navigation limita el thema a un objeto default
  //la conversion nos permite  recibir los atributos extra que definamos con el Type CustomTheme
  const colors = useTheme() as unknown as CustomTheme;
  console.log('HOLAAAA');
  console.log(colors);
  const {toggleTheme, isThemeDark} = useContext(PreferencesContext);
  const [isDarkThemeLocalStored, setIsDarkThemeLocalStored] =
    useMMKVBoolean(isDarkThemeKeyStore);

  const toggle = (value: boolean) => {
    console.log(`New Value: ${value}`);
    // Guarda la preferencia en el local store
    storage.set(isDarkThemeKeyStore, value);
    // llamamas la callback que actalizara el estado del tema
    toggleTheme();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.customColors.themeColor,
        padding: 20,
      }}>
      <Text style={{color: colors.customColors.white}}>
        This is demo of default dark/light theme using navigation.
      </Text>
      <TextInput
        style={{
          borderColor: colors.customColors.gray,
          padding: 10,
          borderWidth: 2,
          borderRadius: 5,
          width: '100%',
          marginTop: 20,
          color: colors.customColors.white,
        }}
        placeholder="Type here"
      />
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isThemeDark ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggle}
        value={isThemeDark}
      />
      <TouchableOpacity
        style={{
          backgroundColor: colors.customColors.sky,
          padding: 10,
          borderRadius: 6,
          width: '100%',
          height: 57,
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: colors.customColors.commonWhite,
            fontSize: 20,
            fontWeight: '500',
          }}>
          Button
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
