import React, { useState } from 'react'
import {
  View,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { defaults } from '../Screens/defaults'

export default function DateField() {
  const [date, setDate] = useState(new Date(1598051730000))
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [textInputDate, setInputDate] = useState('')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
    setInputDate(selectedDate)
    alert(textInputDate)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  return (
    <View style={styles.field}>
      <TextInput
        style={styles.input}
        placeholder='Date'
        placeholderTextColor='grey'
        onChangeText={(value) => setInputDate(value)}
        value={textInputDate}
      ></TextInput>
      <View style={styles.dateBox}>
        <TouchableOpacity style={styles.button} onPress={showDatepicker}>
          <Text>Date picker</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: defaults.textBackgroundColor,
    borderRadius: defaults.buttonBorderRadius,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: defaults.textFontSize,
    margin: '1%'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderTopEndRadius: defaults.textBorderRadius,
    borderBottomEndRadius: defaults.textBorderRadius
  },
  dateBox: {
    flex: 0.15
  },
  input: {
    flex: 1
  }
})
