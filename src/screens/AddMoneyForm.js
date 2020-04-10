import React from 'react'
import {connect} from 'react-redux'
import {Screen, Spacer, Headline, Text, View} from '../components'
import {_, Say, Func} from '../utils'
import {Metrics} from '../themes'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add Money'
    }

    componentDidMount = () => Say.some(_('88'),'Attention!')

    render() {

        const {user} = this.props

        return (
            <Screen>
                <View style={{paddingHorizontal:Metrics.md}}>
                    <Headline title='Ask a teller for an ML Kwarta Padala form' size={Metrics.font.lg} />

                    <Text center md>Here are your account details:</Text>

                    <Spacer xl />

                    <Text center md>{Func.formatName(user)}</Text>
                    <Spacer sm />
                    <Text center md>Wallet Account Number: {user.walletno}</Text>
                    <Spacer sm />
                    <Text center md>{Func.formatAddress(user)}</Text>
                    <Spacer sm />
                    <Text center md>{user.mobileno}</Text>
                    <Spacer sm />
                    <Text center md>{user.emailaddress}</Text>
                </View>
            </Screen>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)