import React from 'react'
import {PanResponder, View} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Consts, Say} from '../utils'
import {VerifyToken} from '../services'

class Responder extends React.Component {

  _panResponder = {}

  state = {
    isLoggedIn:this.props.isLoggedIn,
    //timerId: null,
    idle_time_remaining:Consts.allowed_idle_time
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {isLoggedIn} = this.props
    if(isLoggedIn !== prevState.isLoggedIn) {
      this.setState({isLoggedIn})

      if(isLoggedIn) this.startTimer()
      else this.clearTimer()
    }
  }

  componentDidMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        //this.resetTimer()
        //return true
        return false
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
    
    //this.startTimer()
  }

  validateToken = async () => {
    if(this.props.user && this.props.isLoggedIn) {
      try {
        await VerifyToken(this.props.user)
      }
      catch(err) {
        this.props.logout()
      }
    }
  }

  startTimer = () => {
    if(this.state.isLoggedIn) {
      this.timer = setInterval(() => {
        this.setState(prevState => {

          if(prevState.idle_time_remaining <= 0) this.showPrompt()
          
          return {
            idle_time_remaining: prevState.idle_time_remaining - 1000
          }
        })
      }, 1000)
    }
  }

  resetTimer() {
    if(this.props.user && this.props.isLoggedIn) {
      this.clearTimer()
      this.startTimer()
    }
  }

  clearTimer() {
    clearInterval(this.timer)
    this.setState({idle_time_remaining:Consts.allowed_idle_time})
  }

  showPrompt() {
    if(this.state.isLoggedIn && this.timer !== undefined) {
      this.props.logout()
      this.clearTimer()
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