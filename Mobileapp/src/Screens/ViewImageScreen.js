import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Text
} from 'react-native'
import { defaults } from './defaults'

/**
 * Displays the image taken by the camera.
 */
function ViewImageScreen({ route, navigation }) {
  const { photo, docketOrWaste } = route.params
  const uri = photo.uri
  const base64 = photo.base64
  const base64uri = 'data:image/jpg;base64,' + base64

  /* Passes the taken image back to NewReportSceen */
  const saveImg = () => {
    if (docketOrWaste == 'Docket reciept') {
      navigation.navigate('Load', {
        base64docket: base64,
        base64uridocket: base64uri
      })
    } else if (docketOrWaste == 'Waste') {
      navigation.navigate('Load', {
        base64waste: base64,
        base64uriwaste: base64uri
      })
    } else {
      console.log(
        'ERROR: variabel docketOrWaste varken Docket reciept eller Waste'
      )
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.photo}
        source={{ uri: base64uri }}
        resizeMode='contain'
      >
        <View style={styles.saveContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={saveImg}>
            <Text style={styles.textSave}>Save</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

export default ViewImageScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
  photo: { flex: 1, width: '100%', height: '100%' },
  saveContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '8%',
    width: '60%',
    borderRadius: defaults.buttonBorderRadius,
    backgroundColor: defaults.buttonColor,
    marginBottom: '5%'
  },
  textSave: {
    fontSize: 35
  }
})
