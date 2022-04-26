/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from '@/routers/Routers';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
