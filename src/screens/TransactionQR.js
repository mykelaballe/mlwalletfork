import React from 'react'
import {View, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Footer, Text} from '../components'
import {_, Say} from '../utils'
import {Metrics} from '../themes'
import QRCode from 'react-native-qrcode-svg'

const {width} = Dimensions.get('window')
const QR_SIZE = width * .80
const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Withdraw Cash'
    }

    state = {
        data:this.props.navigation.state.params.transaction_no
    }

    handleOnError = () => Say.err(_('500'))

    render() {

        const {data} = this.state

        return (
            <>
                <Screen>
                    <View style={{alignItems:'center',paddingTop:Metrics.lg}}>
                        <QRCode value={data} size={QR_SIZE} onError={this.handleOnError} />
                    </View>
                    
                </Screen>

                <Footer>
                    <Text center>For faster transaction present this QR Code to the branch teller</Text>
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)