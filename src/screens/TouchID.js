import React from 'react'
import {View, StyleSheet, ImageBackground, Image} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {ScrollView, Text, Button, ButtonText, Spacer, TextInput, Row, Card} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'
import {Portal, Modal} from 'react-native-paper'

class TouchID extends React.Component {

    state = {
        activated:false,
        success:false
    }

    handleActivate = async () => {
        this.setState({
            activated:true,
            success:true
        })
    }

    handleDeactivate = async () => {
        this.setState({activated:false})
    }

    handleContinue = () => this.setState({success:false})
    
    handleGoToLogin = () => this.props.navigation.pop()

    render() {

        const {activated, success} = this.state

        return (
            <ScrollView style={{padding:Metrics.xl}} contentContainerStyle={{flex:1}}>
                <Portal>
                    <Modal visible={success} onDismiss={this.handleContinue}>
                        <View style={{paddingHorizontal:Metrics.lg}}>
                            <Card style={{padding:Metrics.lg}}>
                                <View style={{alignItems:'center'}}>
                                    <Icon name='ios-finger-print' size={Metrics.icon.jumbo} color={Colors.brand} />
                                </View>
                                <Spacer sm />
                                <Text mute center>Touch ID sucessfully activated</Text>
                                <Spacer />
                                <Spacer md />
                                <Button t='Continue' onPress={this.handleContinue} />
                            </Card>
                        </View>
                    </Modal>
                </Portal>

                <View>

                    <Text b xl center>{activated ? 'Touch ID Activated' : 'Activate Touch ID'}</Text>
                    <Spacer sm />
                    <Text center mute>{activated ? 'You can now use your Touch ID to log in to ML Wallet without typing your username and password.' : 'Use your Touch ID to enable ML Wallet instead of typing your username and password.'}</Text>

                    <Spacer lg />
                    
                    <View style={{alignItems:'center'}}>
                        <Icon name='ios-finger-print' size={Metrics.icon.jumbo} color={Colors.brand} />
                    </View>
                </View>

                <View style={{flex:1,justifyContent:'flex-end'}}>
                    {!activated && <Button t='Activate' onPress={this.handleActivate} />}
                    {activated &&
                    <>
                        <Button t='Deactivate' mode='outlined' style={{borderColor:Colors.brand}} onPress={this.handleDeactivate} />
                        <Spacer sm />
                        <Button t='Back to Log in' onPress={this.handleGoToLogin} />
                    </>
                    }
                </View>
            </ScrollView>
        )
    }
}

export default TouchID