import React, { useState } from 'react'
import 'react-native-gesture-handler'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native'

import LoadSpinner from '../Components/LoadingSpinner'
import { defaults } from './defaults'

const API = require('../API-lib/api-exports')

/**
 * Screen that gives the option to either create a new report that leads to NewReportScreen or see the users report history, which leads to HistoryReportScreen
 * @param {Navigation} navigation [Used to navigate between screens]
 * @returns @param {View} ... [The HomeScreen view]
 */

function HomeScreen({ route, navigation }) {
  /**
   * When navigating to HistoryReportScreen, retrieves user reports from the databse in order to display them.
   */
  const [isLoading, setIsLoading] = useState(false)
  const user = route.params //Specific information about the logged in user.

  const onPressHistory = () => {
    setIsLoading(true)
    API.dbGetAllReportsOfWorkerAtWasteFacility(
      user.userInfo[0].name,
      user.userInfo[0].ABN
    ).then(function (result) {
      const dataList = result.body
      navigation.navigate('History', {
        dataList: dataList,
        userInfo: user
      })
      setIsLoading(false)
    })
  }

  const onPressLoad = () => {
    setIsLoading(true)
    API.dbGetBaseInfoForReportCreation(user.userInfo[0].ABN).then(function (
      result
    ) {
      const binSizeList = result.body.binSizeList
      const materialList = result.body.materialList
      const constructionCompanyList = result.body.constructionCompanyList
      navigation.navigate('Load', {
        binSizeList: binSizeList,
        materialList: materialList,
        constructionCompanyList: constructionCompanyList,
        base64docket: '',
        base64uridocket: '',
        base64waste: '',
        base64uriwaste: '',
        binSizes: binSizeList,
        name: 'Load',
        userInfo: user
      })
      setIsLoading(false)
    })
  }

  const onPressLogout = () => {
    API.signOut()
      .then(function () {
        navigation.navigate('Login')
      })
      .catch((err) => {
        console.log(err)
        return err
      })
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.containerLoad}>
          <ActivityIndicator size='large' color='#000000' animating={true} />
        </View>
      ) : (
        <View style={styles.buttonPadder}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => onPressLoad()}
          >
            <Text style={styles.buttonText}>New Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => onPressHistory()}
          >
            <Text style={styles.buttonText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => onPressLogout()}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaults.background
  },
  containerLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonPadder: {
    padding: 60
  },

  buttonContainer: {
    backgroundColor: defaults.ttwgreen,
    paddingVertical: 10,
    marginLeft: 5,
    marginRight: 5,

    borderRadius: 25,
    marginBottom: 50,
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

export default HomeScreen
