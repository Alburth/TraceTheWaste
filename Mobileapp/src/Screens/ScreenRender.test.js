import 'react-native'
import React from 'react'
import 'react-native-gesture-handler'
import renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react-native'
import { Alert } from 'react-native'

import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import MaterialScreen from './MaterialScreen'
import HistoryScreen from './HistoryScreen'
import HistoryReportScreen from './HistoryReportScreen'
import IncrementPercentTestScreen from './IncrementPercentTestScreen'

/* These are unit tests that simply verify that the individual 
screens are rendered correctly. No edge-case testing is done.
All overarching UI for all screens are tested here */

describe('Snapshot testing for UI', () => {
  it('Checks that LoginScreen renders correctly', () => {
    const snap = renderer.create(<LoginScreen />).toJSON()
    expect(snap).toMatchSnapshot()
  })

  it('Checks that HomeScreen renders correctly', () => {
    const snap = renderer.create(<HomeScreen />).toJSON()
    expect(snap).toMatchSnapshot()
  })

  it('Checks that MaterialScreen renders correctly', () => {
    const snap = renderer.create(<MaterialScreen />).toJSON()
    expect(snap).toMatchSnapshot()
  })

  it('Checks that HistoryScreen renders correctly', () => {
    const snap = renderer.create(<HistoryScreen />).toJSON()
    expect(snap).toMatchSnapshot()
  })
  /*    TypeError: Cannot read property 'params' of undefined
  it("Checks that HistoryReportScreen renders correctly", () => {
    const snap = renderer.create(<HistoryReportScreen />).toJSON();
    expect(snap).toMatchSnapshot();
  });
*/
  it('Checks that IncrementPercentTestScreen renders correctly', () => {
    const snap = renderer.create(<IncrementPercentTestScreen />).toJSON()
    expect(snap).toMatchSnapshot()
  })
})

describe('User input tests', () => {
  it('Renders welcome text for the login screen', () => {
    const { getAllByText } = render(<LoginScreen />)
    expect(getAllByText('Ready to report!').length).toBe(1)
  })

  it('Shows invalid input messages when not entering either username or password', () => {
    const { getByTestId } = render(<LoginScreen />)
    jest.spyOn(Alert, 'alert')
    fireEvent.press(getByTestId('SignInButton'))
    expect(Alert.alert).toHaveBeenCalledWith('Please Enter Username')
  })

  it('Shows invalid input messages when entering username, but not password', () => {
    const { getByTestId, getByPlaceholderText } = render(<LoginScreen />)
    jest.spyOn(Alert, 'alert')
    fireEvent.changeText(getByPlaceholderText('Username'), 'John Doe')
    fireEvent.press(getByTestId('SignInButton'))
    expect(Alert.alert).toHaveBeenCalledWith('Please Enter Password')
  })
})
