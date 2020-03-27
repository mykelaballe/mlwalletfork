import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {AppIntro} from '../components'
import {AppStyles} from '../themes'
import {Consts} from '../utils'

class Scrn extends React.Component {

  static navigationOptions = {
    ...AppStyles.noHeaderNavigationOptions
  }

  state = {
    slides:[
      {
        key: 'one',
        title: Consts.tcn.stw.short_desc,
        text: 'Quick and convenient way of sending money to another ML Wallet user.'
      },
      {
        key: 'two',
        title: Consts.tcn.skp.short_desc,
        text: 'Send Money anywhere in the world with Kwarta Padala.'
      },
      {
        key: 'three',
        title: Consts.tcn.stb.short_desc,
        text: 'Transferring money from your ML Wallet to banks made easy.'
      }
    ]
  }

  handleDone = () => {
    const {navigation: {replace}, setHasSeen} = this.props
    setHasSeen(true)
    replace('SendMoneyIndex')
  }
  
  render() {

    const {slides} = this.state

    return (
      <AppIntro
        slides={slides}
        onDone={this.handleDone}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setHasSeen:hasSeen => dispatch(Creators.setHasSeenSendMoneyOnboarding(hasSeen))
})

export default connect(null, mapDispatchToProps)(Scrn)