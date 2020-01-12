import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class BuyLoad extends React.Component {

    static navigationOptions = {
        title:'Buy Load'
    }

    state = {
        mobile_no:''
    }

    handleBrowseContacts = () => this.props.navigation.navigate('MyContacts')

    handleChangeMobileNumber = mobile_no => this.setState({mobile_no})

    handleProceed = async () => {
        this.props.navigation.navigate('LoadOptions')
    }

    render() {

        const {mobile_no} = this.state

        return (
            <View style={style.container}>

                <Row>
                    <TextInput
                        style={style.input}
                        label='Mobile Number'
                        value={mobile_no}
                        onChangeText={this.handleChangeMobileNumber}
                        keyboardType='numeric'
                    />
                    <ButtonIcon
                        icon={<Icon name='ios-person-add' size={Metrics.icon.sm} color={Colors.dark} />}
                        onPress={this.handleBrowseContacts}
                    />
                </Row>
                
                <View style={style.footer}>
                    <Button t='Proceed' onPress={this.handleProceed} />
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
    input: {
        flex:1
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default BuyLoad