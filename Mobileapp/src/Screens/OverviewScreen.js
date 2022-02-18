import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList
} from 'react-native'
import { defaults } from './defaults'

const Item = ({ title, percent }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>{percent}</Text>
  </View>
)

const renderItem = ({ item }) => (
  <Item title={item.title} percent={item.percent} />
)

class Overview extends Component {
  constructor(props) {
    super(props)
    this.title = props.title
    this.date = props.date
    this.site = props.site
    this.docketNo = props.docketNo
    this.materialList = props.materialList // Material och procent listform.
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.containerImg}>
            <Image
              source={require('./Screen_images/EcCell_cropped.png')}
              style={styles.image}
              resizeMode='contain'
            ></Image>
            <Image
              source={require('./Screen_images/EcCell_cropped.png')}
              style={styles.image}
              resizeMode='contain'
            ></Image>
          </View>
          <View style={styles.infoFields}>
            <Text style={styles.title}>{this.title}</Text>
            <Text style={styles.textField}>{this.date}</Text>
            <Text style={styles.textField}>{this.site}</Text>
            <Text style={styles.textField}>{this.docketNo}</Text>
          </View>
        </View>
        <SafeAreaView style={styles.reportList}>
          <FlatList
            data={this.MaterialList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    )
  }
}
export default Overview

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaults.ttwgreen
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: defaults.whiteish,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10
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
    alignItems: 'center',
    borderRightWidth: 1
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
    fontSize: defaults.fieldFontSize,
    paddingLeft: 5
  }
})
