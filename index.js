import 'react-native-gesture-handler'
import React from 'react'
import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import configureStore from './src/store/Store'
import {Provider} from 'react-redux'

const store = configureStore()

class Root extends React.Component {
    
    render() {
        return (
            <Provider store={store}>
                <App {...this.props} />
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => Root)