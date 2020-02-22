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
        title: 'Receive Money',
        text: 'Quick and convenient way of receiving money from another ML Wallet user.'
      },
      {
        key: 'two',
        title: 'International',
        text: 'Receive Money anywhere in the world.'
      },
      {
        key: 'three',
        title: 'Domestic',
        text: 'Receive money anywhere in the Philippines made easy.'
      }
    ]
  }

  handleDone = () => {
    const {navigation: {replace}, setHasSeen} = this.props
    setHasSeen(true)
    replace('ReceiveMoneyIndex')
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
  setHasSeen:hasSeen => dispatch(Creators.setHasSeenReceiveMoneyOnboarding(hasSeen))
})

export default connect(null, mapDispatchToProps)(Scrn)