import React from 'react'
import {View, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Footer, Spacer, Button, Text} from '../components'
import {_, Say} from '../utils'
import {Metrics} from '../themes'
import {API} from '../services'
import QRCode from 'react-native-qrcode-svg'

const {width} = Dimensions.get('window')
const QR_SIZE = width * .80
const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add Money'
    }

    state = {
        data:this.props.user.walletno,
        processing:false
    }

    handleGenerate = async () => {
        const {walletno} = this.props.user
        let {processing} = this.state

        if(processing) return false

        this.setState({processing:true})

        try {
            let payload = {
                data:`${walletno}-${moment()}`
            }

            //let res = await API.updateQR(payload)
            let res = {
                error:false
            }
            if(res.error) Say.some('Error saving new QR')
            else {
                this.setState({data:payload.data})
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    handleOnError = () => Say.err(_('500'))

    render() {

        const {data, processing} = this.state

        return (
            <>
                <Screen>
                    <View style={{alignItems:'center',paddingTop:Metrics.lg}}>
                        <QRCode value={data} size={QR_SIZE} onError={this.handleOnError} />
                    </View>
                    
                </Screen>

                <Footer>
                    <Text center>For faster transaction present this QR Code to the branch teller</Text>

                    <Spacer />
                        
                    <Button t={'Generate QR Code'} onPress={this.handleGenerate} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)