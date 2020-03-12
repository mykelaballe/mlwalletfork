import React from 'react'
import {connect} from 'react-redux'
import {Screen, Spacer, Text, View, Bullet, Row} from '../components'
import {_} from '../utils'
import {Metrics} from '../themes'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'My Diamond Card Points'
    }

    state = {
        how_to:[
            'One point for every fifty peso (PHP 50.00) interest or service fee for Kwarta Padala and Quick Cash Loans',
            'One point for every fifty peso (PHP 50.00) interest or service fee for Wallet to Wallet or Wallet to Bank transaction',
            'One point for every fifty peso (PHP 50.00) interest or service fee for Pay bills transaction',
            'International remittances (Send Money / Receive Money)',
            'One point for every P100 peso ML Jewellers purchase'
        ]
    }

    renderHowTo = item => (
        <>
            <Row>
                <Bullet />
                <Spacer h xs />
                <Text md>{item}</Text>
            </Row>
        </>
    )

    render() {

        const {points} = this.props.user
        const {how_to} = this.state

        return (
            <Screen>
                <View style={{paddingHorizontal:Metrics.md}}>

                    <Text md b>1 point = One peso (PHP 1.00)</Text>
                    <Text md>You can use your points as charge/fee to any ML Wallet transaction.</Text>

                    <Spacer md />

                    <Text lg b brand>How to earn reward points?</Text>
                    <Spacer />
                    {how_to.map(this.renderHowTo)}
                </View>
            </Screen>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)