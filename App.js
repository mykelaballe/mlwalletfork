import React from 'react'
import {StatusBar, PermissionsAndroid, AppState} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from './src/actions'
import Navigation from './src/navigation'
import {Colors} from './src/themes'
import {Responder} from './src/components'
import SomeModal from './src/components/SomeModal'
import {Consts, Storage} from './src/utils'
import NetInfo from '@react-native-community/netinfo'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from 'react-native-paper'
import codePush from 'react-native-code-push'

const moment = require('moment')

class App extends React.Component {

  state = {
    loading: true
  }

  componentDidMount() {

    /*codePush.sync({
      deploymentKey: Consts.codepush_key,
      installMode: codePush.InstallMode.IMMEDIATE
    })*/

    const {networkSuccess, networkFailure} = this.props

    AppState.addEventListener('change', this.handleAppStateChange)

    this.networkSubscribe = NetInfo.addEventListener(state => {
      if(state.isConnected) networkSuccess()
      else networkFailure()
    })

    NetInfo.fetch().then(state => {
      if(state.isConnected) networkSuccess()
      else networkFailure()
    })

    if(Consts.is_android) this.requestPermissions()

    this.createLocalDBs().then(this.checkUser)

    SplashScreen.hide()
  }

  componentWillUnmount = () => {
    this.updateLastActiveTimestamp()
    this.props.logout()
    this.networkSubscribe()
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  updateLastActiveTimestamp = () => {
    if(this.props.isLoggedIn) this.props.updateUserInfo({lastActiveTimestamp:moment().format('YYYY-MM-DD HH:mm')})
  }

  handleAppStateChange = state => {
    if(state == 'background' || state == 'inactive') this.updateLastActiveTimestamp()
    else {
      Storage.doLoad(Consts.db.user)
      .then(userData => {
        if(userData) this.isIdle(userData)
      })
    }
  }
  
  isIdle = user => {
    if(user && user.lastActiveTimestamp) {
      const NOW = moment()
      let ms = moment(NOW).diff(moment(user.lastActiveTimestamp))
      let m = parseInt(moment.duration(ms).asMinutes()) * 60000

      if(m > Consts.allowed_idle_time) {
        this.props.logout()
        return true
      }
      return false
    }
    
    return false
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
    const {setUser, login, logout, isLoggedIn} = this.props

    let userData = await Storage.doLoad(Consts.db.user)

    if(userData && isLoggedIn) {
      if(!this.isIdle(userData)) {
        setUser(userData)
        login()
      }
    }
    else logout()

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

    return (
      <Provider>
        <Responder>
          {!loading &&
          <>
            <StatusBar backgroundColor={Colors.brand} />
            <Navigation />
            <SomeModal />
          </>
          }
        </Responder>
      </Provider>
    )
  }
}

const mapStateToProps = state => ({
  isConnected: state.network.isConnected,
  isLoggedIn: state.auth.isLoggedIn,
  user: state.user.data
})

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(Creators.login()),
  logout: () => dispatch(Creators.logout()),
  setUser: user => dispatch(Creators.setUser(user)),
  updateUserInfo: newInfo => dispatch(Creators.updateUserInfo(newInfo)),
  networkSuccess: () => dispatch(Creators.networkSuccess()),
  networkFailure: () => dispatch(Creators.networkFailure())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)