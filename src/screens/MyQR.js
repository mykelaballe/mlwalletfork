import React from 'react'
import {StyleSheet, View, Image, InteractionManager} from 'react-native'
import {Text, Card, Row, TopBuffer, Spacer, Button, ButtonText, ActivityIndicator, Lottie, ScrollView} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const QR_SIZE = 350

class MyQR extends React.Component {

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

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        try {

        }
        catch(err) {
            
        }
    }

    handleSave = async () => {
        Say.some('Saved to device')
    }

    handleShare = async () => {

    }

    handleSubmit = async () => {
        let {processing} = this.state

        if(processing) return false

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
            <View style={style.container}>

                <View style={style.qrContainer}>
                    {processing && <ActivityIndicator />}
                    {!processing && <Lottie source={Res.animated.qr_code} loop={true} />}
                </View>

                <Spacer />

                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <Row bw>
                        <ButtonText
                            t={'Save to Device'}
                            icon='arrow-downward'
                            onPress={this.handleSave}
                        />
                        <ButtonText
                            t={'Share'}
                            icon='share'
                            onPress={this.handleShare}
                        />
                    </Row>

                    <Spacer />
                    
                    <Button t={_('31')} onPress={this.handleSubmit} loading={processing} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.xl,
    },
    contentContainer: {
        alignItems:'center'
    },
    qrContainer: {
        width:QR_SIZE,
        height:QR_SIZE,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default MyQR