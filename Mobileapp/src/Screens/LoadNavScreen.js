import React from 'react'

import CameraScreen from '../Screens/CameraScreen'
import ViewImageScreen from '../Screens/ViewImageScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function CameraNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Camera' component={CameraScreen} />
      <Stack.Screen name='ViewImg' component={ViewImageScreen} />
    </Stack.Navigator>
  )
}
