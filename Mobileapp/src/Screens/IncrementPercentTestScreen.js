import React from 'react'
import { View, StyleSheet } from 'react-native'
import PercentCnt from '../Components/PercentIncremetnListitem'

export default function App() {
  return (
    <View style={styles.container}>
      <PercentCnt title='HEEEEEE' />
      <PercentCnt />
      <PercentCnt />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
