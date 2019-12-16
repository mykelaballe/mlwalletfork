import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {Text, Card, Row, TopBuffer, Spacer, Button, ActivityIndicator, Lottie, ScrollView} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const QR_SIZE = 350

class QRCodeScreen extends React.Component {

    static navigationOptions = {
        title:_('41')
    }

    state = {
        list:[],
        loading:true,
        refreshing:false,
        error:false,
        processing:false
    }

    componentDidMount = () => {

    }

    getData = async () => {
        try {

        }
        catch(err) {
            
        }
    }

    handleSubmit = async () => {
        let {processing} = this.state

        if(processing) return false

        Say.some('Generating...')
        this.setState({processing:true},() => {
            setTimeout(() => {
                this.setState({processing:false})
                Say.ok('Done')
            },1500)
        })
    }

    render() {

        const {list, loading, refreshing, error, processing} = this.state
        const {navigate} = this.props.navigation

        return (
            <ScrollView style={style.container}>

                {/*<Text center>{_('44')}</Text>*/}

                <Text center>{_('30')}</Text>

                <View style={style.qrContainer}>
                    {processing && <ActivityIndicator />}
                    {!processing && <Lottie source={Res.animated.qr_code} loop={true} />}
                    {/*!processing && <Image source={require('../res/qr.png')} style={{width:QR_SIZE,height:QR_SIZE}} />*/}
                </View>

                <Spacer />

                <Button t={_('31')} onPress={this.handleSubmit} />

                <Spacer />

                <Text center sm>This QR Code is only used for ML Wallet loading and Cash-Out.</Text>

                {/*<Text center>{_('42')}: {_('43')}</Text>*/}
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        padding:Metrics.xl
    },
    qrContainer: {
        width:QR_SIZE,
        height:QR_SIZE,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default QRCodeScreen