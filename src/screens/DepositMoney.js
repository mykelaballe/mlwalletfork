import React from 'react'
import {Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Text} from '../components'
import {_, Say} from '../utils'

const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Deposit Money'
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

        return (
            <>
                <Screen>
                    <Headline subtext='To deposit money to your account, go to the nearest M Lhuillier branch.' />
                    
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