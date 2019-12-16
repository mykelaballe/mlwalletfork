import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {Text, Row, Spacer, HR} from '../components'
import {Colors, Metrics} from '../themes'

class ShopCheckoutCustomerInfoScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({

    })

    state = {

    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        try {

        }
        catch(err) {

        }
    }

    render() {

        const {} = this.state

        return (
            <Text>Checkout - Customer Info</Text>
        )
    }
}

export default ShopCheckoutCustomerInfoScreen