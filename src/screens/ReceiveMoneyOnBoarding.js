import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Button, Text, Spacer, Icon} from '../components'
import {Colors, Metrics, Res} from '../themes'
import AppIntroSlider from 'react-native-app-intro-slider'

class ReceiveMoneyOnBoarding extends React.Component {

  static navigationOptions = {
    header:null
  }

  state = {
    slide:0,
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

  renderDoneButton = () => <Button t='Finish' onPress={this.handleDone} />

  handleDone = () => this.props.navigation.replace('ReceiveMoneyIndex')

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

export default ReceiveMoneyOnBoarding