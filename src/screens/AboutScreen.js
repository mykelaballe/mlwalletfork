import React from 'react'
import {StyleSheet, View, Image, ImageBackground} from 'react-native'
import {Text, TopBuffer, Spacer, Doodle} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_} from '../utils'

class AboutScreen extends React.Component {

    static navigationOptions = {
        title:_('25')
    }

    render() {

        return (
            <View style={style.container}>
                <TopBuffer />
                <Image source={Res.app_icon} style={{width:200,height:150}} resizeMode='contain' />
                <Spacer />
                <Text md b center>{_('71')} 1.0.0</Text>
                <Spacer />
                <Text brand xl b center>ML Wallet Philippines</Text>
                <Text b center>{_('70')}</Text>

                <Doodle />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        paddingHorizontal:Metrics.xl
    }
})

export default AboutScreen