import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { defaults } from './defaults'
import { TouchableOpacity } from 'react-native-gesture-handler'

function SentScreen({ route, navigation }) {
  const { sqlMsg, errcode } = route.params

  const onPress = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchContainer} onPress={onPress}>
        <MaterialIcons name='error-outline' size={150} color='red' />
        <View style={styles.textContainer}>
          <Text style={styles.text}>An error occured</Text>
          <Text style={styles.textErr}>
            {' '}
            <Text style={styles.bold}>Error code: </Text>
            {errcode}{' '}
          </Text>
          <Text style={styles.textSql}>
            {' '}
            <Text style={styles.bold}>Sql Message: </Text> {sqlMsg}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SentScreen

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: defaults.whiteish
  },
  text: {
    fontSize: 50
  },
  textContainer: {
    alignItems: 'center'
  },
  textErr: {
    fontSize: 18,
    textAlign: 'center'
  },
  textSql: {
    fontSize: 18,
    margin: 25,
    textAlign: 'center'
  },
  touchContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '40%'
  }
})
