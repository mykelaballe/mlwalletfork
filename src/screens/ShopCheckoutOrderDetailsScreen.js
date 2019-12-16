import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {Text, Row, Spacer, HR} from '../components'
import {Colors, Metrics} from '../themes'

class ShopCheckoutOrderDetailsScreen extends React.Component {

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
            <Text>Checkout - Order Details</Text>
        )
    }
}

export default ShopCheckoutOrderDetailsScreen