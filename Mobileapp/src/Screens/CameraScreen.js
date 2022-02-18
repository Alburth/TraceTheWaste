import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

/**
 * Opens the camera and allows the user to snap a
 * picture that is saved in base64 format.
 */
export default function App({ route, navigation }) {
  const { docketOrWaste } = route.params

  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const options = { quality: 0.2, base64: true }

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const gotoViewImg = (photo) => {
    navigation.navigate('ViewImg', {
      photo: photo,
      docketOrWaste: docketOrWaste
    })
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ratio={'16:9'}
        pictureSize={'1920x1080'}
        ref={(ref) => {
          this.camera = ref
        }}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.flipContainer}>
            <TouchableOpacity
              style={styles.buttonFlip}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }}
            >
              <MaterialIcons name='flip-camera-ios' size={60} color='white' />
            </TouchableOpacity>
          </View>
          <View style={styles.captureContainer}>
            <TouchableOpacity
              style={styles.buttonCapture}
              onPress={
                (snap = async () => {
                  if (this.camera) {
                    let photo = await this.camera.takePictureAsync(options)
                    gotoViewImg(photo)
                  }
                })
              }
            >
              <Ionicons name='radio-button-on' size={105} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonFlip: {
    width: 70,
    height: 70,
    margin: 10
  },
  buttonCapture: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    marginBottom: 40
  },
  buttonContainer: {
    flex: 1
  },
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  captureContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  flipContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
