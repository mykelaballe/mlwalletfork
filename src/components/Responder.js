import React from 'react'
import {PanResponder, View} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Prompt} from './'
import {Consts, Storage} from '../utils'

class Responder extends React.Component {
    _panResponder = {}
    timer = 0

    state = {
        showPrompt:false
    }

  componentDidMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        this.resetTimer()
        return true
      },
      //onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => {
        this.resetTimer()
        return false
    },
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => false,
    })
    
    this.startTimer()
  }

  startTimer() {
    //this.timer = setTimeout(() => this.showPrompt(),Consts.allowed_idle_time)
  }

  resetTimer(){
    clearTimeout(this.timer)
    this.startTimer()
  }

  showPrompt = () => {
    if(this.props.isLoggedIn) {
        Storage.doSave(Consts.db.user)
        this.setState({showPrompt:true},() => this.props.logout())
    }
  }

  handleDismiss = () => this.setState({showPrompt:false})

  render() {

    const {showPrompt} = this.state

    return (
        <>
            <Prompt
                visible={showPrompt}
                title='Inactive'
                message='You are idle. Logging out now'
                onDismiss={this.handleDismiss}
            />
            <View style={{flex:1}} {...this._panResponder.panHandlers}>
                {this.props.children}
            </View>
        </>
    )
  }
}

mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
})

mapDispatchToProps = dispatch => ({
    logout:() => dispatch(Creators.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Responder)