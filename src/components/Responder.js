import React from 'react'
import {PanResponder, View} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Consts, Say} from '../utils'
import {API, VerifyToken} from '../services'

class Responder extends React.Component {

  _panResponder = {}
  timer = 0

  state = {
    isLoggedIn:this.props.isLoggedIn
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {isLoggedIn} = this.props
    if(isLoggedIn !== prevState.isLoggedIn) {
      this.setState({isLoggedIn})

      if(isLoggedIn) this.startTimer()
      else clearTimeout(this.timer)
    }
  }

  componentDidMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        this.resetTimer()
        return true
      },
      //onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => {
        this.validateToken()
        this.resetTimer()
        return false
    },
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => false,
    })
    
    this.startTimer()
  }

  validateToken = async () => {
    if(this.props.user && this.props.isLoggedIn) {
      try {
        //await API.getAccountInfo(this.props.user.walletno)
        await VerifyToken(this.props.user)
      }
      catch(err) {
        this.props.logout()
        //Say.err(err)
      }
    }
  }

  startTimer() {
    //return false
    if(this.state.isLoggedIn) {
      this.timer = setTimeout(this.showPrompt,Consts.allowed_idle_time)
    }
  }

  resetTimer(){
    /*try {
      this.validateToken()
    }
    catch(err) {
      Say.err(err)
    }*/
    clearTimeout(this.timer)
    this.startTimer()
  }

  showPrompt = () => {
    if(this.state.isLoggedIn) {
        this.props.logout()
        Say.logout()
    }
  }

  render() {

    return (
      <View style={{flex:1}} {...this._panResponder.panHandlers}>
          {this.props.children}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
    logout:() => dispatch(Creators.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Responder)