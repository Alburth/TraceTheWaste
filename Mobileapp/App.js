import React from 'react'
import { StyleSheet, Button, ImageBackground, View } from 'react-native'

import LoginScreen from './src/Screens/LoginScreen'
import HomeScreen from './src/Screens/HomeScreen'
import NewReportScreen from './src/Screens/NewReportScreen'
import MaterialScreen from './src/Screens/MaterialScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HistoryScreen from './src/Screens/HistoryScreen'
import HistoryReportScreen from './src/Screens/HistoryReportScreen'
import DialogInput from './src/Screens/DialogInputScreen'
import CameraScreen from './src/Screens/CameraScreen'
import IncPercent from './src/Screens/IncrementPercentTestScreen'
import OverviewScreen from './src/Screens/OverviewScreen'
import LoadingSpinner from './src/Components/LoadingSpinner'
import ViewImageScreen from './src/Screens/ViewImageScreen'
import CameraNavigator from './src/Screens/LoadNavScreen'
import SentScreen from './src/Screens/SentScreen'
import ErrorScreen from './src/Screens/ErrorScreen'
import { Header } from 'react-native/Libraries/NewAppScreen'
import { defaults } from './src/Screens/defaults'
import { Directions } from 'react-native-gesture-handler'
const Stack = createStackNavigator()

/**
 * Is seen as the main for this part of the system
 * @returns @param {NavigationContainer} ... [NavigationContainer used to navigate between the individual screens]
 */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#081B33', height: 75 }
        }}
      >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Home', headerLeft: null }}
        />

        <Stack.Screen
          name='Report sent'
          component={SentScreen}
          options={{ title: false, headerShown: false }}
        />
        <Stack.Screen
          name='Error message'
          component={ErrorScreen}
          options={{ title: false, headerShown: false }}
        />

        <Stack.Screen
          name='Load'
          component={NewReportScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen name='Camera' component={CameraScreen} />
        <Stack.Screen name='ViewImg' component={ViewImageScreen} />
        <Stack.Screen name='Overview' component={OverviewScreen} />
        <Stack.Screen name='HistoryReport' component={HistoryReportScreen} />
        <Stack.Screen name='History' component={HistoryScreen} />
        <Stack.Screen name='Material' component={MaterialScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 10
  }
})
