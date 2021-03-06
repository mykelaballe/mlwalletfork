import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../../actions'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Button, BackHomeButton, View, Row, ScrollFix} from '../'
import {Colors, Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'
import {API} from '../../services'

class SendKP extends React.Component {
    
    state = {
        amount:Func.formatToRealCurrency(this.props.data.amount),
        charges:Func.formatToRealCurrency(this.props.data.charges),
        total:Func.formatToRealCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        status:this.props.data.status,
        cancellable:this.props.data.cancellable,
        cancelling:false,
        type:Consts.tcn.skp.long_desc,
        receipt:null
    }

    componentDidMount = () => {
        const {_from, kptn, receiver, sender, balance} = this.props.data
        const {amount, charges, total, date, time, status, cancellable, cancelling, type} = this.state

        const receipt = (
            <>
                <Header
                    tcn={kptn}
                    status={status}
                    cancellable={cancellable}
                />

                <ScrollFix style={{padding:Metrics.lg,backgroundColor:Colors.light}}>
                    <Text sm mute>Sender</Text>
                    <Text>{sender}</Text>

                    <Spacer />

                    <Row>
                        <View style={{flex:1}}>
                            <Text mute sm>First Name</Text>
                            <Text md>{receiver.firstname}</Text>
                        </View>

                        <Spacer h xl />

                        <View style={{flex:1}}>
                            <Text mute sm>Middle Name</Text>
                            <Text md>{receiver.middlename || _('50')}</Text>
                        </View>
                    </Row>

                    <Spacer />

                    <Row>
                        <View style={{flex:1}}>
                            <Text mute sm>Last Name</Text>
                            <Text md>{receiver.lastname}</Text>
                        </View>

                        <Spacer h xl />

                        <View style={{flex:1}}>
                            <Text mute sm>Suffix</Text>
                            <Text md>{receiver.suffix || _('51')}</Text>
                        </View>
                    </Row>

                    <Spacer />

                    <Text sm mute>Amount</Text>
                    <Text>{Consts.currency.PH} {amount}</Text>

                    <Spacer />
                    
                    {true &&
                    <>
                        <Text sm mute>Charges</Text>
                        <Text>{Consts.currency.PH} {charges}</Text>

                        <Spacer />
                    </>
                    }

                    <Text sm mute>Total</Text>
                    <Text>{Consts.currency.PH} {total}</Text>

                    <Spacer />

                    <Text sm mute>Date</Text>
                    <Text>{date}</Text>

                    <Spacer />

                    <Text sm mute>Time</Text>
                    <Text>{time}</Text>

                    <Spacer />

                    <Text sm mute>Type</Text>
                    <Text>{type}</Text>
                </ScrollFix>
            </>
        )

        this.props.onExport(receipt)

        this.setState({receipt})

        if(_from != 'history') {
            Say.ok(
                null,
                'Success',
                {
                    customMessage:(
                        <>
                            <Text mute md>You and your receiver will get a text message about this transaction.</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>{Consts.currency.PH} {Func.formatToRealCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    handleCancelTransaction = async () => {
        const {walletno} = this.props.user
        const {kptn} = this.props.data
        let latitude = Consts.defaultLatitude, longitude = Consts.defaultLongitude

        if(Func.isCheckLocation('cskp')) {
            const locationRes = await Func.getLocation()
            if(!locationRes.error) {
                latitude = locationRes.data.latitude
                longitude = locationRes.data.longitude

                API.attemptKPCancel({
                    walletno,
                    kptn
                })

                Say.ask(
                    'Are you sure you want to cancel this transaction? Balance will be returned except for the transaction fee',
                    'Cancel Transaction',
                    {
                        onConfirm:() => this.cancelTransaction({
                            latitude,
                            longitude
                        })
                    }
                )
            }
        }
    }

    cancelTransaction = async payload => {
        const {cancelling} = this.state
        const {walletno} = this.props.user
        const {_from, kptn, controlno} = this.props.data

        if(cancelling) return false

        try {
            this.setState({cancelling:true})

            let res = await API.sendKPCancel({
                walletno,
                kptn,
                ...payload
                //controlno
            })
            
            if(res.error) Say.warn(res.message)
            else {
                this.props.updateBalance(res.data.balance)
                this.setState({
                    cancellable:false,
                    status:'cancelled'
                })
                Say.ok(`Your transaction ${Consts.tcn.skp.short_desc} has been cancelled`)

                if(_from == 'history') this.props.navigation.pop()
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({cancelling:false})
    }

    render() {

        const {_from} = this.props.data
        const {receipt} = this.state

        return (
            <>
                <Screen compact>
                    {receipt}
                </Screen>

                <Footer>
                    {/*cancellable && <Button mode='outlined' t='Cancel Transaction' onPress={this.handleCancelTransaction} loading={cancelling} />*/}
                    {/*<Spacer sm />*/}
                    {_from !== 'history' && <BackHomeButton />}
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updateBalance: newBalance => dispatch(Creators.updateBalance(newBalance))
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SendKP))