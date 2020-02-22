import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Button, Text, Spacer, Icon} from '../components'
import {Colors, Metrics} from '../themes'
import AppIntroSlider from 'react-native-app-intro-slider'

class WithdrawCashOnBoarding extends React.Component {

  static navigationOptions = {
    headerStyle:{
      backgroundColor:Colors.light,
      elevation:0
    },
    headerTintColor:Colors.brand
  }

  state = {
    slide:0,
    slides:[
      {
        key: 'one',
        title: 'Withdraw Cash',
        text: 'Withdraw cash for free from your ML Wallet account from any M Lhuillier branch nationwide.'
      }
    ]
  }

  renderNextButton = () => <Button t='Next' onPress={this.handleNext} />

  handleNext = () => {
    this.setState(prevState => {
        
        this.refs.slider.goToSlide(prevState.slide + 1)
        
        return {
            slide: prevState.slide + 1
        }
    })
  }

  handleSlideChange = slide => this.setState({slide})

  renderDoneButton = () => <Button t='Next' onPress={this.handleDone} />

  handleDone = () => this.props.navigation.replace('WithdrawCash')

  renderItem = ({item}) => (
    <View style={style.page}>
      <Icon name='kp' size={60} />
      <Spacer xl />
      <Text center b lg>{item.title}</Text>
      <Spacer xs />
      <Text center>{item.text}</Text>
    </View>
  )
  
  render() {

    const {slides} = this.state

    return (
      <AppIntroSlider
        ref='slider'
        renderItem={this.renderItem}
        slides={slides}
        dotStyle={style.dot}
        activeDotStyle={style.activeDot}
        renderNextButton={this.renderNextButton}
        renderDoneButton={this.renderDoneButton}
        onSlideChange={this.handleSlideChange}
        bottomButton
      />
    )
  }
}

const style = StyleSheet.create({
  page: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:Metrics.xl
  },
  dot: {
    borderColor:Colors.brand,
    borderWidth:StyleSheet.hairlineWidth
  },
  activeDot: {
    backgroundColor:Colors.brand
  }
})

export default WithdrawCashOnBoarding