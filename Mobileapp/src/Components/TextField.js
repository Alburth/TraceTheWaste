import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { defaults } from '../Screens/defaults'
import RNDateTimePicker from '@react-native-community/datetimepicker'

function TextField(props) {
  console.log('description ' + props.description)
  console.log('Value ' + props.value)

  return (
    <View style={styles.container}>
      <View style={styles.fieldDescription}>
        <Text style={styles.textDescription}>{props.description}</Text>
      </View>
      <View style={styles.fieldText}>
        <Text style={styles.textInput}>{props.value}</Text>
      </View>
    </View>
  )
}

export default TextField

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: defaults.whiteish,
    borderWidth: 2,
    borderColor: 'grey',
    width: '95%',
    margin: '1%',
    borderRadius: defaults.textBorderRadius,
    backgroundColor: 'white'
  },
  fieldDescription: {
    flex: 1
  },
  fieldText: {
    flex: 1.3
  },
  textDescription: {
    flex: 1,
    opacity: 0.7,
    marginLeft: '2%',
    fontSize: defaults.textFontSize
  },
  textInput: {
    fontSize: 20,
    width: '100%',
    marginLeft: '2%'
  }
})
