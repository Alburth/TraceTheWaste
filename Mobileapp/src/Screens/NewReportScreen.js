import React, { useState } from 'react'
import 'react-native-gesture-handler'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ImageBackground
} from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import { defaults } from './defaults'
import RNPickerSelect from 'react-native-picker-select'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
const API = require('../API-lib/api-exports')
/**
 *
 * @param {Navigation} navigation [Used to navigate between screens]
 * @returns @param
 */

/**
 * Renders the screen Load and collects input from the user.
 * NewReportScreen collects: wasteImg, docketImg, date, site, docketNo, weigh and bin
 */
function NewReportScreen({ route, navigation }) {
  const {
    reportData,
    binSizeList,
    materialList,
    constructionCompanyList,
    base64docket, //exporteras ej
    base64uridocket,
    base64waste, //exporteras ej
    base64uriwaste,
    userInfo,
    name,
    timeHist,
    dateTime
  } = route.params

  var day = new Date().getDate() /* Current date */
  var month = new Date().getMonth() + 1 /* Current month */
  var year = new Date().getFullYear() /* Current year */
  var hours = new Date().getHours() /* Current hour */
  var min = new Date().getMinutes() /* Current minute */
  var sec = new Date().getSeconds() /* Current seconds */

  /* If report is edited, sets default values to reportDatas contents. */
  var ABN = 0
  var address = ''
  var binSize = ''
  var changeID = ''
  var createdBy = ''
  var docketID = ''
  var timeHistRep = ''
  var dateTimeHist =
    year + '/' + month + '/' + day + ' ' + hours + ':' + min + ':' + sec
  var timeHistRep = ''
  var materialListHist = []
  var reasonForChange = ''
  var weight = ''
  var wasteImgUri = base64uriwaste
  var docketImgUri = base64uridocket

  if (name == 'Edit report') {
    ABN = reportData.ABN
    address = reportData.address.toString()
    binSize = reportData.bin_size.toString()
    changeID = reportData.change_idW
    createdBy = reportData.created_by
    docketID = reportData.docket_id
    dateTimeHist = dateTime
    timeHistRep = timeHist
    materialListHist = reportData.materialList
    reasonForChange = reportData.reason_for_change
    if (base64uridocket != null) {
      docketImgUri = base64uridocket
    } else {
      docketImgUri = 'data:image/jpg;base64,' + reportData.receiptImg
    }
    if (base64uriwaste != null) {
      wasteImgUri = base64uriwaste
    } else {
      wasteImgUri = 'data:image/jpg;base64,' + reportData.wasteLoadImg
    }
    weight = reportData.weight.toString()
  }

  const [textInputDate, setInputDate] = useState(dateTimeHist)

  const [textInputDocketNO, setInputDocketNO] = useState(docketID)
  const [textInputWeight, setInputWeight] = useState(weight)

  /* Site and bin variables */
  const [textInputAddress, setInputAddress] = useState(address)
  const [textInputBin, setInputBin] = useState(binSize)
  const [date, setDate] = useState(new Date())

  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  /* Images in base64 format */
  const [img1, setImg1] = useState('')

  /* Create list for picker items */
  // Osäker på vilket value vi ska skicka med till databasen, skulle vara enklast om varje address och name hade en key. Ev lägga till det?
  // OBS bara name skickas som value, ej address.
  const SITES = []
  for (let i = 0; i < constructionCompanyList.length; i++) {
    SITES.push({
      label:
        constructionCompanyList[i].name.toString() +
        ', ' +
        constructionCompanyList[i].address.toString(),
      value: constructionCompanyList[i].address.toString()
    })
  }

  const sizes = []
  for (let i = 0; i < binSizeList.length; i++) {
    sizes.push({
      label: binSizeList[i].toString(),
      value: binSizeList[i].toString()
    })
  }

  const checkLoadInput = () => {
    if (!textInputDate.trim()) {
      alert('Please Enter Date')
      return
    }
    /* Check for site textInput */
    if (!textInputAddress.trim()) {
      alert('Please Enter Site')
      return
    }
    /* Check for DocketNumber textInput */
    if (!textInputDocketNO.trim()) {
      alert('Please Enter Docket number')
      return
    }
    /* Check for weight textInput */
    if (!textInputWeight.trim()) {
      alert('Please Enter Weight')
      return
    }
    /* Check for bin textInput */
    if (!textInputBin.trim()) {
      alert('Please Enter bin size')
      return
    }

    if (!docketImgUri.trim()) {
      alert('Please take a picture of the docket ID and waste')
      return
    }

    if (!wasteImgUri.trim()) {
      alert('Please take a picture of the docket ID and waste')
      return
    }
    // Hämta denna data i skärmen innan samtidigt som bins och sites
    navigation.navigate('Material', {
      selectedDate: textInputDate,
      dateTimeHist: dateTimeHist,
      docketNo: textInputDocketNO,
      weight: textInputWeight,
      address: textInputAddress,
      binSize: textInputBin,
      receiptPic: docketImgUri,
      wastePic: wasteImgUri,
      materialList: materialList,
      materialListHist: materialListHist,
      userInfo: userInfo,
      name: name
    })
  }

  const placeholderSite = {
    label: 'select a site',
    value: null,
    color: '#9EA0A4'
  }

  const placeholderBin = {
    label: 'select a bin',
    value: null,
    color: '#9EA0A4'
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    const strDate =
      date.getFullYear() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    setInputDate(strDate)
    hideDatePicker()
  }

  /* Takes picture for Docket reciept */
  function goToCameraDocket() {
    navigation.navigate('Camera', { docketOrWaste: 'Docket reciept' })
  }
  /* Takes picture for Waste */
  function goToCameraWaste() {
    navigation.navigate('Camera', { docketOrWaste: 'Waste' })
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.imageButtonContainer}>
        <TouchableOpacity
          style={styles.opacityContainer}
          onPress={goToCameraDocket}
        >
          {docketImgUri != '' ? (
            <View style={styles.imageContainer}>
              <ImageBackground
                style={styles.img}
                source={{ uri: docketImgUri }}
                resizeMode='cover'
                borderRadius={defaults.imageBorderRadius}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.opacityText}>Docket reciept</Text>
                  <AntDesign
                    name='camera'
                    size={30}
                    style={styles.cameraIcon}
                  />
                </View>
              </ImageBackground>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <View style={styles.iconContainer}>
                <Text style={styles.opacityText}>Docket reciept</Text>
                <AntDesign name='camera' size={30} style={styles.cameraIcon} />
              </View>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opacityContainer}
          onPress={goToCameraWaste}
        >
          {wasteImgUri != '' ? (
            <View style={styles.imageContainer}>
              <ImageBackground
                style={styles.img}
                source={{ uri: wasteImgUri }}
                resizeMode='cover'
                borderRadius={defaults.imageBorderRadius}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.opacityText}>Waste</Text>
                  <AntDesign
                    name='camera'
                    size={30}
                    style={styles.cameraIcon}
                  />
                </View>
              </ImageBackground>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <View style={styles.iconContainer}>
                <Text style={styles.opacityText}>Waste</Text>
                <AntDesign name='camera' size={30} style={styles.cameraIcon} />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.dateField}>
          <TextInput
            style={styles.dateInput}
            placeholder='Date'
            placeholderTextColor='grey'
            onChangeText={(value) => setDate(value)}
            value={textInputDate}
          ></TextInput>
          <View style={styles.dateBox}>
            <TouchableOpacity style={styles.button} onPress={showDatePicker}>
              <AntDesign name='calendar' size={30} color='black' />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode='date'
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            placeholder={placeholderSite}
            style={{ ...pickerSelectStyles }}
            onValueChange={(value) => setInputAddress(value)}
            items={SITES}
            value={textInputAddress}
            onUpArrow={() => {
              textInputAddress.focus()
            }}
            onDownArrow={() => {
              textInputAddress.togglePicker()
            }}
          />
        </View>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={{ ...pickerSelectStyles }}
            placeholder={placeholderBin}
            onValueChange={(value) => setInputBin(value)}
            items={sizes}
            value={textInputBin}
            onUpArrow={() => {
              textInputBin.focus()
            }}
            onDownArrow={() => {
              textInputBin.togglePicker()
            }}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Docket No.'
            placeholderTextColor='gray'
            onChangeText={(value) => setInputDocketNO(value)}
            value={textInputDocketNO}
          ></TextInput>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            keyboardType='numeric'
            style={styles.input}
            placeholder='Weight'
            placeholderTextColor='gray'
            onChangeText={(value) => setInputWeight(value)}
            value={textInputWeight}
          ></TextInput>
        </View>
      </View>
      <View style={styles.submitContainer}>
        <TouchableOpacity style={styles.submitOpacity} onPress={checkLoadInput}>
          <Text style={styles.submitText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaults.background
  },
  imageButtonContainer: {
    backgroundColor: defaults.background,
    flex: 1,
    flexDirection: 'row'
  },
  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 5
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  iconContainer: {
    alignItems: 'center',
    height: 80,
    width: 170
  },

  cameraIcon: {
    //marginBottom: '20%'
  },
  dropdown: {
    backgroundColor: 'red'
  },

  opacityContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: defaults.ttwgreen,
    borderRadius: defaults.textBorderRadius,
    borderWidth: defaults.buttonBorderWidth,
    borderColor: defaults.buttonBorderColor
  },

  opacityText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 15
  },

  submitText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 20
  },

  inputContainer: {
    flex: 4,
    backgroundColor: defaults.whiteish
  },

  input: {
    flex: 1,
    marginLeft: '2%'
  },
  picker: {
    flex: 1
  },
  pickerField: {
    flex: 1,
    backgroundColor: 'red'
  },
  pickerContainer: {
    flex: 1,
    margin: '1%',
    justifyContent: 'center',
    borderRadius: defaults.textBorderRadius,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: defaults.textBackgroundColor
  },

  submitContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },

  submitOpacity: {
    flex: 1,
    backgroundColor: defaults.ttwgreen,
    width: '100%',
    marginHorizontal: '20%'
  },
  dateField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: defaults.textBackgroundColor,
    borderRadius: defaults.textBorderRadius,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: defaults.textFontSize,
    margin: '1%'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CECECE',
    borderTopEndRadius: defaults.textBorderRadius,
    borderBottomEndRadius: defaults.textBorderRadius
  },
  dateBox: {
    flex: 0.15
  },
  dateInput: {
    flex: 1,
    marginLeft: '2%',
    borderRadius: defaults.borderRadius,
    borderColor: 'black'
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: defaults.textBackgroundColor,
    borderRadius: defaults.textBorderRadius,
    borderColor: 'black',
    borderWidth: 1,

    fontSize: defaults.textFontSize,
    margin: '1%'
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30
  }
})

export default NewReportScreen
