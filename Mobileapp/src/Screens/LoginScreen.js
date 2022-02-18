/* eslint-disable no-lone-blocks */
import React, { useState } from 'react'
import 'react-native-gesture-handler'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native'

import { defaults } from './defaults'
const API = require('../API-lib/api-exports')

/**
 *  The loginScreen where the user has the ability to input their username and password in an effort to login.
 *  After succsesful login, the user navigates to HomeScreen.
 * @param {Navigation} navigation [Used to navigate between screens]
 * @returns @param {KeyboardAvoidingView} ... [The loginScreen view]
 */

function LoginScreen({ navigation }) {
  {
    const [textInputUsername, setInputUsername] = useState('')
    const [textInputPassword, setInputPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    /**
     * Checks text input for username and password, alerts user if one or the other is empty
     * @param null
     * @returns @param null
     *  */
    function checkTextInput() {
      /* Check for the username TextInput */
      if (!textInputUsername.trim()) {
        alert('Please Enter Username')
        return false
      }

      /* Check for the password TextInput */
      if (!textInputPassword.trim()) {
        alert('Please Enter Password')
        return false
      }
      /* success */
      return true
    }

    /**
     * Before user can login, the input fields are checked with "signInAfterInputCheck" before trying to authenticate user.
     * @param null
     * @returns @param null
     */
    async function signInAfterInputCheck() {
      if (checkTextInput()) {
        setIsLoading(true)
        API.signIn(textInputUsername, textInputPassword) // 'Personnel', 'TestTest123'
          .then(() => {
            API.dbGetSignedInUserInformation().then((result) => {
              navigation.navigate('Home', { userInfo: result.body })
            })
            setIsLoading(false)
          })
          .catch((err) => {
            setIsLoading(false)
            alert('Wrong password or username')
            console.log(err)
          })
      }
    }

    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.containerLoad}>
            <ActivityIndicator size='large' color='#000000' animating={true} />
          </View>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('./Screen_images/EcCell_cropped.png')}
              ></Image>
              <Text style={styles.title}>Ready to report!</Text>
            </View>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder='Username'
                placeholderTextColor='white'
                backgroundColor='lightgray'
                padding={5}
                onChangeText={(value) => setInputUsername(value)}
              />
              <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor='white'
                backgroundColor='lightgray'
                padding={5}
                secureTextEntry={true}
                onChangeText={(value) => setInputPassword(value)}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={signInAfterInputCheck}
                testID='SignInButton'
              >
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  containerLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logoContainer: {
    top: 0,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },

  logo: {
    width: 130,
    height: 130
  },

  title: {
    color: 'black',
    fontSize: 40,
    opacity: 0.8
  },

  formContainer: {
    padding: 30
  },

  input: {
    height: defaults.textheight,
    marginBottom: 40,
    backgroundColor: defaults.textBackgroundColor,
    borderRadius: defaults.textBorderRadius,
    fontSize: defaults.textFontSize
  },

  buttonContainer: {
    backgroundColor: defaults.ttwgreen,
    paddingVertical: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 50,
    borderWidth: defaults.buttonBorderWidth,

    borderColor: defaults.buttonBorderColor
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
    top: 20,
    height: 100
  }
})

export default LoginScreen
