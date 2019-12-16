import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Button, Spacer, TopBuffer, Card, HR, ListItem, Lottie} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class RegisterSuccessScreen extends React.Component {

    static navigationOptions = {
        title:_('20')
    }

    handleViewLogin = () => this.props.navigation.navigate('Login')

    render() {

        const {navigate} = this.props.navigation

        return (
            <View style={{flex:1,padding:Metrics.xl}}>

                <View style={{alignItems:'center'}}>
                    <Lottie source={Res.animated.check} style={{width:150}} loop={false} />
                    {/*<Icon name='ios-checkmark-circle-outline' color={Colors.success} size={Metrics.icon.jumbo} />*/}
                </View>

                <Spacer />

                <Text b lg center success>You are now Registered</Text>
                <Text center b>Visit any ML Branch for First Load</Text>

                <TopBuffer />

                <Text b>Step 1</Text>
                <Text>Access your User Account. A QR Code will be created.</Text>
                <Spacer />

                <HR />

                <Spacer />
                <Text b>Step 2</Text>
                <Text>Present the QR Code for scanning and give the teller the cash amount to load.</Text>
                <Spacer />

                <HR />

                <Spacer />

                <Text center b>No Forms Needed</Text>
                <Text center>Walang Che Che Bureche</Text>

                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <Button t={_('5')} onPress={this.hanleViewLogin} />
                </View>
            </View>
        )
    }
}

export default RegisterSuccessScreen