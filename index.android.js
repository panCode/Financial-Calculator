/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 'use strict'
import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator,} from 'react-navigation';


import  Animation  from './code/sip delay calculator/rootcomponent.js';
import  Welcome  from './code/page_1/index.js' ;
import Sip from './code/sip calculator/rootcomponent.js';
import Stepup from './code/step up calculator/rootcomponent';
import Retirement from './code/retirement calculator/retirement';
import Education from './code/Education calculator/education';
const App = StackNavigator({
  Home: { screen: Welcome },
  delay: { screen: Animation },
  sip :{ screen:Sip},
  Stepup : {screen:Stepup},
  retirement : {screen:Retirement},
  education : {screen : Education},
}); 
AppRegistry.registerComponent('App', () => App);
