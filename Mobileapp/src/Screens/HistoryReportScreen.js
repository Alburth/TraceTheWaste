import React from 'react'
import 'react-native-gesture-handler'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  FlatList,
  Button
} from 'react-native'
import { defaults } from './defaults'
import TextField from '../Components/TextField'
import PropTypes from 'prop-types'

const API = require('../API-lib/api-exports')

function HistoryReportScreen({ route, navigation }) {
  const { reportData, userInfo, time, construction_company } = route.params
  const ABN = reportData.ABN
  const address = reportData.address
  const binSize = reportData.bin_size
  const changeID = reportData.change_id
  const createdBy = reportData.created_by
  const date = reportData.date
  const docketID = reportData.docket_id
  const materialList = reportData.materialList
  const reasonForChange = reportData.reason_for_change
  const imgRecieptBase64 = reportData.receiptImg
  const imgDocketBase64 = reportData.wasteLoadImg
  const weight = reportData.weight
  const cutdate = date.split('T')[0]
  const dateTime = cutdate + ', ' + time

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => onPressEdit()}
            title='EDIT REPORT'
            color={defaults.ttwgreen}
          />
        </View>
      )
    })
  }, [navigation])

  const Item = ({ title, percent }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{percent}</Text>
    </View>
  )
  Item.propTypes = {
    title: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired
  }

  const renderItem = ({ item }) => (
    <Item title={item.material_type} percent={item.percentage} />
  )

  /* Gets materialList data from the company, 
  and passes the history report information to New Report page */
  const onPressEdit = () => {
    // Tror vi kommer behöva hämta sites här också.
    API.dbGetBaseInfoForReportCreation(userInfo.userInfo[0].ABN).then(function (
      result
    ) {
      const binSizeList = result.body.binSizeList
      const materialList = result.body.materialList
      const constructionCompanyList = result.body.constructionCompanyList
      navigation.navigate('Load', {
        reportData: reportData,
        timeHist: time,
        dateTime: dateTime,
        binSizeList: binSizeList,
        materialList: materialList,
        constructionCompanyList: constructionCompanyList,
        name: 'Edit report',
        userInfo: userInfo
      })
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.containerImg}>
          <Image
            source={{ uri: 'data:image/jpg;base64,' + imgRecieptBase64 }}
            style={styles.image}
            resizeMode='cover'
            borderRadius={5}
            margin={5}
          ></Image>
          <Image
            source={{ uri: 'data:image/jpg;base64,' + imgDocketBase64 }}
            style={styles.image}
            resizeMode='cover'
            borderRadius={5}
            margin={5}
          ></Image>
        </View>
        <View style={styles.infoFields}>
          <Text style={styles.title}>{construction_company}</Text>
          <TextField description={'Date'} value={dateTime}></TextField>
          <TextField description={'Site'} value={address}></TextField>
          <TextField description={'Docket Number'} value={docketID}></TextField>
          <TextField description={'Weight'} value={weight}></TextField>
          <TextField description={'Bin size'} value={binSize}></TextField>
        </View>
      </View>
      <SafeAreaView style={styles.reportList}>
        <FlatList
          data={materialList}
          renderItem={renderItem}
          keyExtractor={(item, index) => 'key' + index}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 10
  },
  container: {
    flex: 1,
    backgroundColor: defaults.ttwgreen
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: defaults.whiteish,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomWidth: 1.5
  },
  reportList: {
    marginTop: '1.5%',
    flex: 1.5,
    backgroundColor: defaults.ttwgreen
  },
  containerImg: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoFields: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  image: {
    flex: 1,
    width: 150,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: defaults.whiteish,
    padding: 10,
    marginVertical: 1,
    borderRadius: 10
  },
  textIncrement: {
    flex: 1
  },
  title: {
    fontSize: defaults.titleFontSize,
    paddingLeft: 5
  },
  textField: {
    flex: 1,
    fontSize: defaults.fieldFontSize,
    paddingLeft: 5,
    width: '100%'
  }
})

export default HistoryReportScreen
