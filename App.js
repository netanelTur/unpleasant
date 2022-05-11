import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Details from './components/Details';

I18nManager.allowRTL(false);

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf')
  });

  if(!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
          />

          <Stack.Screen
          name="Details"
          component={Details}
          options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
