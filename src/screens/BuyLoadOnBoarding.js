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
        title: 'Buy eLoad',
        text: 'Buy prepaid mobile load anytime, anywhere through the ML Wallet App.'
      }
    ]
  }

  handleDone = () => {
    const {navigation: {replace}, setHasSeen} = this.props
    setHasSeen(true)
    replace('BuyLoadIndex')
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
  setHasSeen:hasSeen => dispatch(Creators.setHasSeenBuyLoadOnboarding(hasSeen))
})

export default connect(null, mapDispatchToProps)(Scrn)