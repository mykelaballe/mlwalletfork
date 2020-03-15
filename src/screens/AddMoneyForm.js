import React from 'react'
import {Alert} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Spacer, Headline, Text, View} from '../components'
import {_, Say} from '../utils'
import {Metrics} from '../themes'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Deposit Money'
    }

    componentDidMount = () => {
        Say.some(
            "This is sensitive personal information.\nPlease be careful in sharing these for your account's security",
            'Attention!'
        )
        /*Alert.alert(
            'Attention!',
            "This is sensitive personal information.\nPlease be careful in sharing these for your account's security"
        )*/
    }

    render() {

        const {walletno, fname, mname, lname, suffix, barangay, city, province, country, mobile_no, email} = this.props.user

        return (
            <Screen>
                <View style={{paddingHorizontal:Metrics.md}}>
                    <Headline title='Ask a teller for an ML Kwarta Padala form' size={Metrics.font.lg} />

                    <Text center lg>Here are your account details:</Text>

                    <Spacer xl />

                    <Text center>{fname} {mname} {lname} {suffix}</Text>
                    <Spacer sm />
                    <Text center>Wallet Account Number: {walletno}</Text>
                    <Spacer sm />
                    <Text center>{barangay}, {city}, {province}</Text>
                    <Spacer sm />
                    <Text center>{mobile_no}</Text>
                    <Spacer sm />
                    <Text center>{email}</Text>
                </View>
            </Screen>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)