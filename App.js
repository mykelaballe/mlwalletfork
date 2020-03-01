import React from 'react'
import {StatusBar, Platform, PermissionsAndroid} from 'react-native'
import {connect} from 'react-redux'
import Actions from './src/actions/Creators'
import Navigation from './src/navigation'
import {Colors} from './src/themes'
import {Responder} from './src/components'
import {Consts, Storage} from './src/utils'
import NetInfo from '@react-native-community/netinfo'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-native-paper'

class App extends React.Component {

  state = {
    loading: true,
    isFirstTime: true,
    //isLoggedIn: false
  }

  componentDidMount() {

    const {networkSuccess, networkFailure} = this.props

    this.networkSubscribe = NetInfo.addEventListener(state => {
      if(state.isConnected) networkSuccess()
      else networkFailure()
    })

    NetInfo.fetch().then(state => {
      if(state.isConnected) networkSuccess()
      else networkFailure()
    })

    if(Platform.OS == 'android') this.requestPermissions()

    this.createLocalDBs().then(() => this.checkUser() )

    SplashScreen.hide()
  }

  componentWillUnmount = () => this.networkSubscribe()

  static getDerivedStateFromProps = (props, state) => {

    /*if(props.isLoggedIn != state.isLoggedIn) {
      return {
        isLoggedIn: props.isLoggedIn
      }
    }*/

    /*else if(props.isFirstTime != state.isFirstTime) {
      return {
        isFirstTime: props.isFirstTime
      }
    }*/

    return null
  }

  requestPermissions = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    }
    catch(err) {}
  }

  checkUser = async () => {
    const {setUser, login, logout, setIsFirstTime} = this.props
    let appData = await Storage.doLoad(Consts.db.app)

    if(appData) setIsFirstTime(appData.isFirstTime)

    let userData = await Storage.doLoad(Consts.db.user)

    if(userData) {
      setUser(userData)
      login()
    }

    this.setState({loading:false})
  }

  createLocalDBs = async () => {
    try {
      await Storage.doLoad(Consts.db.app)
    }
    catch(err) {
      if(err.name === 'NotFoundError') await Storage.doSave(Consts.db.app, {isFirstTime:true})
    }

    try {
      await Storage.doLoad(Consts.db.user)
    }
    catch(err) {
      if(err.name === 'NotFoundError') await Storage.doSave(Consts.db.user, null)
    }
  }

  render() {

    const {loading} = this.state
    const {isFirstTime} = this.props

    return (
      <Provider>
        <Responder>
          {!loading &&
          <>
            <StatusBar backgroundColor={Colors.brand} />
            <Navigation />
          </>
          }
        </Responder>
      </Provider>
    )
  }
}

mapStateToProps = state => {
  return {
    isFirstTime: state.app.isFirstTime,
    isConnected: state.network.isConnected,
    isLoggedIn: state.auth.isLoggedIn
  }
}

mapDispatchToProps = dispatch => {
  return {
    setIsFirstTime: isFirstTime => dispatch(Actions.setIsFirstTime(isFirstTime)),
    login: () => dispatch(Actions.login()),
    logout: () => dispatch(Actions.logout()),
    setUser: user => dispatch(Actions.setUser(user)),
    networkSuccess: () => dispatch(Actions.networkSuccess()),
    networkFailure: () => dispatch(Actions.networkFailure())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)