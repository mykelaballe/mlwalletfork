import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Screen, Footer, Headline, Text, Spacer, Button, TextInput, Icon} from '../components'
import {Metrics, Res} from '../themes'
import {_, Consts} from '../utils'

class Scrn extends React.Component {

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
            <>
                <Screen>
                    <View style={{alignItems:'center'}}>
                        <Icon name='buy_load' size={Metrics.icon.xl} />
                    </View>

                    <Spacer md />

                    <Headline subtext='Enter the mobile number that you will load or select from your contact list.' />

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
                </Screen>

                <Footer>
                    <Button disabled={!ready} t='Next' onPress={this.handleNext} />
                </Footer>
            </>
        )
    }
}

const style = StyleSheet.create({
    textarea: {
        height:130
    }
})

export default Scrn