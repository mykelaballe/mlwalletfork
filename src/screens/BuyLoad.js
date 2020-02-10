import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput, Icon} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Consts} from '../utils'

class BuyLoad extends React.Component {

    static navigationOptions = {
        title:'Buy Load'
    }

    state = {
        type:Consts.tcn.bul.code,
        mobile_no:'0912345678',
    }

    handleChangeMobileNo = mobile_no => this.setState({mobile_no})

    handleSelectReceiver = () => this.props.navigation.navigate('SavedLoadReceivers')

    handleNext = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('LoadOptions',{
            ...params,
            ...this.state
        })
    }

    render() {

        const {mobile_no} = this.state
        let ready = false

        if(mobile_no) ready = true

        return (
            <View style={style.container}>

                <View>
                    <Spacer />
                    
                    <View style={{alignItems:'center'}}>
                        <Icon name='buy_load' />
                    </View>

                    <Spacer md />

                    <Text center mute>Enter the mobile number that you will load or select from your contact list.</Text>

                    <Spacer />

                    <TextInput
                        label='Mobile Number'
                        value={mobile_no}
                        keyboardType='numeric'
                        onChangeText={this.handleChangeMobileNo}
                        rightContent={
                            <TouchableOpacity onPress={this.handleSelectReceiver}>
                                <Icon name='phonebook' style={{width:30,height:30}} />
                            </TouchableOpacity>
                        }
                    />
                </View>
                
                <View style={style.footer}>
                    <Button disabled={!ready} t='Next' onPress={this.handleNext} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between',
        padding:Metrics.lg
    },
    textarea: {
        height:130
    },
    footer: {
        //flex:1,
        //justifyContent:'flex-end'
    }
})

export default BuyLoad