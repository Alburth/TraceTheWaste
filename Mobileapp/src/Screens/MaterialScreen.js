import React, { Component } from 'react'
import 'react-native-gesture-handler'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { defaults } from './defaults'
import IncPercent from '../Components/PercentIncremetnListitem'
import DialogInput from 'react-native-dialog-input'
import { input } from '@aws-amplify/ui'

const API = require('../API-lib/api-exports')
const APIReport = require('../API-lib/NewReport')
const Item = ({ title, percentage, onPress }) => (
  <IncPercent
    title={title}
    percentage={percentage}
    onPress={onPress}
  ></IncPercent>
)

/**
 * Sum class displayed at the top of the screen. Contains image and summarized percentage of waste input
 */
class Sum extends Component {
  constructor(props) {
    super(props)
    this.reportInputs = props.reportInputs
    this.state = {
      sum: 0,
      materialPercentage: [],
      isDialogVisible: false,
      isLoading: false
    }
    this.navigation = props.navigation
    this.siteMaterials = []
    this.editReason = ''
    /* Currently dont have density */

    /* If the report is edited load percentages on items, else only name */
    // TODO rita ut alla material oavsett, uppdatera procent på de som finns i old report.
    if (this.reportInputs.name == 'Edit report') {
      var inOld = false
      var sumPercent = 0
      for (let i = 0; i < this.reportInputs.materialList.length; i++) {
        inOld = false
        for (let j = 0; j < this.reportInputs.materialListHist.length; j++) {
          if (
            this.reportInputs.materialListHist[j].material_type ==
            this.reportInputs.materialList[i]
          ) {
            this.siteMaterials.push({
              title: this.reportInputs.materialList[i],
              percentage: this.reportInputs.materialListHist[j].percentage
            })
            //Denna kan vara helt knas, KIKA PÅ!
            this.state.materialPercentage.push([
              this.reportInputs.materialList[i],
              this.reportInputs.materialListHist[j].percentage
            ])
            sumPercent =
              sumPercent + this.reportInputs.materialListHist[j].percentage
            inOld = true
          }
        }
        if (!inOld) {
          this.siteMaterials.push({
            title: this.reportInputs.materialList[i]
          })
        }
      }
      this.state.sum = sumPercent
    } else {
      for (let i = 0; i < this.reportInputs.materialList.length; i++) {
        this.siteMaterials.push({
          title: this.reportInputs.materialList[i]
        })
      }
    }
  }
  renderItem = ({ item }) => (
    <Item
      title={item.title}
      percentage={item.percentage}
      onPress={this.onPress}
    />
  )

  onPress = (value, title, state) => {
    const { sum } = this.state
    this.setState({
      sum: sum + value
    })

    let index = -1
    for (let i = 0; i < this.state.materialPercentage.length; i++) {
      if (title == this.state.materialPercentage[i][0]) {
        index = i
      }
      if (this.state.materialPercentage[i][1] == 0) {
        this.state.materialPercentage.splice(i, 1)
      }
    }
    if (index != -1) {
      this.state.materialPercentage[index] = [title, state.count + value]
    } else {
      this.state.materialPercentage.push([title, state.count + value])
    }
  }

  /* Functions for Reason for change popup dialog */
  showDialog(isShow) {
    this.setState({ isDialogVisible: isShow })
  }
  sendInput(inputText) {
    if (inputText == null) {
      alert('Please Enter Reason')
      return
    }
    this.editReason = inputText
    this.showDialog(false)
    this.checkAndSubmit()
  }

  buttonPercentageText = () => {
    const { sum } = this.state
    if (sum == 100) {
      return <Text style={styles.logoText}>Submit!</Text>
    } else if (sum > 100) {
      return (
        <Text style={styles.logoText}>
          Percentage is too high! Currently: {sum.toString()}
        </Text>
      )
    } else if (sum >= 0) {
      return <Text style={styles.logoText}>Total: {sum.toString()}</Text>
    }
  }

  reportStatus = (result) => {
    if (result.statusCode == 200) {
      console.log('Status code 200 EZZZZ')
      this.props.navigation.navigate('Report sent')
      this.setState({ isLoading: false })
    } else {
      this.props.navigation.navigate('Error message', {
        errcode: result.body.code,
        sqlMsg: result.body.sqlMessage
      })
      this.setState({ isLoading: false })
      console.log('Error code: ', result)
    }
  }

  submit = () => {
    if (this.reportInputs.name == 'Edit report') {
      this.showDialog(true)
    } else {
      this.checkAndSubmit()
    }
  }

  checkAndSubmit = () => {
    this.setState({ isLoading: true })
    const { sum } = this.state
    var date, time
    if (sum == 100) {
      const weightNumb = parseFloat(this.reportInputs.weight.replace(',', '.'))
      if (this.reportInputs.name == 'Edit report') {
        date = this.reportInputs.dateTimeHist.split(' ')[0]
        time = this.reportInputs.dateTimeHist.split(' ')[1]
      } else {
        const dateAndTimeString = this.reportInputs.selectedDate.split(' ')
        date = dateAndTimeString[0].split('/').join('-')
        time = dateAndTimeString[1]
      }

      const binSizeInt = parseInt(this.reportInputs.binSize)
      const report = new APIReport.NewReport(
        this.reportInputs.docketNo,
        weightNumb,
        binSizeInt,
        this.reportInputs.userInfo.userInfo[0].name,
        this.reportInputs.receiptPic,
        this.reportInputs.wastePic,
        this.editReason,
        this.reportInputs.userInfo.userInfo[0].ABN,
        this.reportInputs.address /* should this be site? */,
        date,
        time
      )

      for (let i = 0; i < this.state.materialPercentage.length; i++) {
        let name = this.state.materialPercentage[i][0]
        let percent = this.state.materialPercentage[i][1]
        report.addMaterial(name, percent)
      }

      report.create().then((result) => this.reportStatus(result))
    } else {
      alert('Incorrect percentage. Please enter 100%')
    }
  }

  render() {
    const { sum } = this.state
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View style={styles.containerLoad}>
            <ActivityIndicator size='large' color='#000000' animating={true} />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <DialogInput
                isDialogVisible={this.state.isDialogVisible}
                title={'Edit report'}
                message={'Please enter reason for change'}
                hintInput={'Reason for change'}
                submitInput={(inputText) => {
                  this.sendInput(inputText)
                }}
                closeDialog={() => {
                  this.showDialog(false)
                }}
              ></DialogInput>
              <Image
                style={styles.logo}
                source={require('./Screen_images/EcCell_cropped.png')}
              ></Image>
              <Text style={styles.infoText}>
                {' '}
                Input 100%, then you can submit!{' '}
              </Text>
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={this.siteMaterials}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => 'key' + index}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={this.submit}>
                {this.buttonPercentageText(sum)}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    )
  }
}
/**
 * Returns a TouchableWithoutFeedback containing company-logo, input fields and everythings else shown on the screen.
 * @param {Navigation} navigation ['Used to navigate between screens']
 * @returns @param TouchableWithoutFeedback
 */
function MaterialScreen({ route, navigation }) {
  const inputVariables = route.params

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Sum reportInputs={inputVariables} navigation={navigation}></Sum>
      </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaults.background
  },
  containerDialog: {
    flex: 1,
    backgroundColor: defaults.background
  },

  listContainer: {
    flex: 2.5,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'black'
  },

  buttonContainer: {
    flex: 0.6,
    backgroundColor: defaults.backgroundColor,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    width: 200,
    height: 80,
    marginLeft: 85,
    borderRadius: defaults.buttonBorderRadius,
    backgroundColor: defaults.ttwgreen,
    borderWidth: defaults.buttonBorderWidth,
    borderColor: defaults.buttonBorderColor
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    top: 20,
    height: 100
  },
  containerLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  infoText: {
    fontSize: defaults.textFontSize,
    marginTop: 10,
    fontWeight: 'bold'
  },

  item: {
    marginTop: '1%',
    padding: 10,
    marginVertical: 1,
    borderRadius: 10,
    height: 80,
    backgroundColor: defaults.whiteish,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  materialInput: {
    padding: 10,
    marginVertical: 1,
    marginTop: 20,
    borderRadius: 10,
    height: '60%',
    width: '60%',
    backgroundColor: 'lightgray'
  },

  materialContainer: {
    marginTop: '1%',
    flex: 1,
    backgroundColor: defaults.background
  },

  imageContainer: {
    flex: 1,
    backgroundColor: defaults.background,
    alignItems: 'center'
  },

  logo: {
    width: 100,
    height: 100,
    marginTop: 10
  },

  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '10%'
  }
})

export default MaterialScreen
