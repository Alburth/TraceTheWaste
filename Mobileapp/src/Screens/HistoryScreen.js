import React, { useState } from 'react'
import 'react-native-gesture-handler'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native'
import { defaults } from './defaults'
const API = require('../API-lib/api-exports')

//Add docketNo in preview
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.construction_company}</Text>
    <Text style={styles.text}>
      {item.date.split('T')[0] + ','} {item.time}
    </Text>
    <Text style={styles.text}>Docket number: {item.docket_id}</Text>
  </TouchableOpacity>
)

const HistoryScreen = ({ route, navigation }) => {
  const { dataList, userInfo } = route.params
  const [selectedId, setSelectedId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const renderItem = ({ item, index }) => {
    const key = 'key' + index
    const backgroundColor =
      key === selectedId ? defaults.whiteish : defaults.ttwgreen
    const color = key === selectedId ? 'white' : 'black'

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId('key' + index)
          setIsLoading(true)
          API.dbGetUniqueReport(item.docket_id).then((result) => {
            navigation.navigate('HistoryReport', {
              time: dataList[index].time,
              construction_company: dataList[index].construction_company,
              reportData: result.body,
              userInfo: userInfo
            })
            setIsLoading(false)
          })
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.containerLoad}>
          <ActivityIndicator size='large' color='#000000' animating={true} />
        </View>
      ) : (
        <FlatList
          data={dataList}
          renderItem={renderItem}
          //keyExtractor={(item) => item.id}, skulle behöva en unik key för varje list item, t.ex docket number borde fungera.
          keyExtractor={(item, index) => 'key' + index}
          extraData={selectedId}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  item: {
    flex: 1,
    padding: 30,
    marginVertical: 4,
    marginHorizontal: 4,
    borderRadius: defaults.textBorderRadius,
    borderColor: 'black',
    borderWidth: 1.5
  },
  title: {
    fontSize: 32
  },
  text: {
    fontSize: 16
  }
})

export default HistoryScreen
