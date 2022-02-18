import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { defaults } from '../Screens/defaults'

class CounterListItm extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    this.title = props.title
    this.percentage = props.percentage
    this.onPress = props.onPress
    if (this.percentage != undefined) {
      this.state.count = this.percentage
    }
  }
  onPressInc = () => {
    this.setState({
      count: this.state.count + 5
    })
    this.onPress(5, this.title, this.state)
  }
  onPressDec = () => {
    if (this.state.count >= 5) {
      this.setState({
        count: this.state.count - 5
      })
      this.onPress(-5, this.title, this.state)
    }
  }

  render() {
    const { count } = this.state
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.textContainer}>
          <Text style={styles.materialText}>{this.title}</Text>
          <Text style={styles.materialText}>{count} %</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonIncrement}
            onPress={this.onPressDec}
          >
            <Text style={styles.textIncrement}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonIncrement}
            onPress={this.onPressInc}
          >
            <Text style={styles.textIncrement}>+</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: '3%'
  },
  buttonIncrement: {
    flex: 1,
    backgroundColor: defaults.whiteish,
    borderWidth: 1,
    borderRadius: 5,
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: defaults.whiteish,
    padding: '1%',
    marginVertical: 1,
    borderRadius: 10
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textIncrement: {
    flex: 1,
    fontSize: defaults.textMaterial
  },
  materialText: {
    fontSize: defaults.textMaterial,
    padding: 5
  },
  textField: {
    fontSize: defaults.fieldFontSize,
    paddingLeft: 5
  }
})

export default CounterListItm
