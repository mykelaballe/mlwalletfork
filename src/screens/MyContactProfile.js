import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class MyContactProfile extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:navigation.state.params.contact.name
    })

    handleSelect = () => {
        this.props.navigation.navigate('BuyLoad')
    }

    render() {

        const {name} = this.props.navigation.state.params.contact

        return (
            <View style={style.container}>
                <Text mute sm>Contact Name</Text>
                <Text>{name}</Text>

                <Spacer />

                <Text mute sm>Contact Number</Text>
                <Text>09123456789</Text>

                <View style={style.footer}>
                    <Button t='Select Contact' onPress={this.handleSelect} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.lg
    },
    item: {
        padding:Metrics.rg
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default MyContactProfile