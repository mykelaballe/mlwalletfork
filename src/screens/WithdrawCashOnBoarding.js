import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {AppIntro} from '../components'
import {AppStyles} from '../themes'

class Scrn extends React.Component {

  static navigationOptions = {
    ...AppStyles.noHeaderNavigationOptions
  }

  state = {
    slides:[
      {
        key: 'one',
        title: 'Withdraw Money',
        text: 'Withdraw money for free from your ML Wallet account from any M Lhuillier branch nationwide.'
      }
    ]
  }

  handleDone = () => {
    const {navigation: {replace}, setHasSeen} = this.props
    setHasSeen(true)
    replace('WithdrawCash')
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
  setHasSeen:hasSeen => dispatch(Creators.setHasSeenWithdrawCashOnboarding(hasSeen))
})

export default connect(null, mapDispatchToProps)(Scrn)