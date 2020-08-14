import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Button, ScrollFix} from '../'
import {Metrics} from '../../themes'
import {_, Func, Say, Consts} from '../../utils'

class AddMoney extends React.Component {

    state = {
        total:Func.formatToCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.adm.long_desc
    }

    componentDidMount = () => {
        const {_from, sender, branchname, balance} = this.props.data
        const {total} = this.state

        this.props.onExport(
            Func.buildReceiptBody({
                Sender: sender,
                Branch: branchname,
                Total: `${Consts.currency.PH} ${total}`
            })
        )

        if(_from != 'history') {
            Say.ok(
                null,
                'Success',
                {
                    customMessage:(
                        <>
                            <Text mute>Your new balance is</Text>
                            <Text xl b>{Consts.currency.PH} {Func.formatToCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, kptn, sender, branchname} = this.props.data
        const {total, date, time, type} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={kptn}
                        status='success'
                    />

                    <ScrollFix style={{padding:Metrics.lg}}>
                        {/*<Text sm mute>Sender</Text>
                        <Text>{sender}</Text>

                        <Spacer />

                        <Text sm mute>Branch</Text>
                        <Text>{branchname}</Text>

                        <Spacer />*/}

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
                </Screen>

                <Footer>
                    {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(AddMoney)