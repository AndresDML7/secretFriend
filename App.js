import React from 'react';
import { LogBox } from 'react-native';
import Navigation from './navigations/Navigation';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <Navigation/>
  )
}
