import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Text, Button, Spacer} from '../components'
import {SendWalletToWallet, SendKP, SendBankTransfer, WithdrawCash, PayBill, BuyLoad} from '../components/transaction_review'
import {_, Consts, Say} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Review Transaction'
    }

    state = {
        processing:false
    }

    handleNext = async () => {
        const {navigate, state} = this.props.navigation
        try {
            this.setState({processing:true})
            navigate('PINConfirmation',{...state.params})
        }
        catch(err) {
            Say.err(err)
        }
        
        this.setState({processing:false})
    }

    render() {

        const {type, transaction} = this.props.navigation.state.params
        const {processing} = this.state

        return (
            <>
                <Screen>
                    {type === Consts.tcn.stw.code && <SendWalletToWallet data={transaction} />}
                    {type === Consts.tcn.skp.code && <SendKP data={transaction} />}
                    {type === Consts.tcn.stb.code && <SendBankTransfer data={transaction} />}
                    {type === Consts.tcn.wdc.code && <WithdrawCash data={transaction} />}
                    {type === Consts.tcn.bpm.code && <PayBill data={transaction} />}
                    {type === Consts.tcn.bul.code && <BuyLoad data={transaction} />}
                </Screen>

                <Footer>
                    <Text center mute>Please review the details before you proceed.</Text>
                    <Spacer sm />
                    <Button t={_('62')} onPress={this.handleNext} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)