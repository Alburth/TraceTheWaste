import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { defaults } from './defaults'
import { TouchableOpacity } from 'react-native-gesture-handler'

function SentScreen({ navigation }) {
  const onPress = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchContainer} onPress={onPress}>
        <View style={styles.content}>
          <Ionicons
            name='checkmark-circle-outline'
            size={150}
            color={defaults.ttwgreen}
          />
          <Text style={styles.text}>Report sent</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: defaults.whiteish
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: '40%'
  },
  text: {
    fontSize: 55
  },
  touchContainer: {
    flex: 1,
    width: 600
  }
})
