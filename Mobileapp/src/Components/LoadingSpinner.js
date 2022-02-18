import React, { useState } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { defaults } from '../Screens/defaults'
import RNDateTimePicker from '@react-native-community/datetimepicker'

function LoadSpinner(props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' animating={true} color='#00000' />
    </View>
  )
}

export default LoadSpinner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  }
})
