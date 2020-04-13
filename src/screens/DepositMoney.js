import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Text} from '../components'
import {_} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Deposit Money'
    }

    state = {
        data:this.props.user.walletno,
        processing:false
    }

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