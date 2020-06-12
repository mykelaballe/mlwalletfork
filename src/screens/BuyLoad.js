import React from 'react'
import {View} from 'react-native'
import {Screen, Footer, Headline, Spacer, Button, TextInput, StaticInput, Icon, Picker} from '../components'
import {Metrics} from '../themes'
import {_, Consts, Func, Say} from '../utils'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Buy eLoad'
    }

    state = {
        type:Consts.tcn.bul.code,
        networks:Consts.cellular_networks,
        network:'',
        receiverno:this.props.navigation.state.params.receiver.receiverno,
        name:this.props.navigation.state.params.receiver.fullname,
        contact_no:this.props.navigation.state.params.receiver.mobileno,
    }

    handleChangeContactNo = contact_no => this.setState({contact_no})

    handleSelectReceiver = () => this.props.navigation.navigate('SavedLoadReceivers')

    handleSelectNetwork = network => this.setState({network})

    handleNext = async () => {
        const {params} = this.props.navigation.state
        const {network, contact_no} = this.state
        
        if(network.value == 'globe') {
            Say.info('Sorry! We are currently fixing some supplier issues.')
        }
        else if(network.value == 'pldt') {
            Say.info('Coming Soon!')
        }
        else if(!Func.isPHMobileNumber(contact_no)) Say.warn(Consts.error.mobile)
        else {
            this.props.navigation.navigate('LoadOptions',{
                ...params,
                ...this.state
            })
        }
    }

    render() {

        const {networks, network, contact_no, name} = this.state
        let ready = false

        if(network && contact_no && name) ready = true

        return (
            <>
                <Screen>
                    <View style={{alignItems:'center'}}>
                        <Icon name='buy_load' size={Metrics.icon.xl} />
                    </View>

                    <Spacer md />

                    <Headline subtext='Enter the mobile number that you will load or select from your contact list.' />

                    <Picker
                        selected={network && network.label}
                        items={networks}
                        placeholder='Choose network'
                        onChoose={this.handleSelectNetwork}
                    />

                    <TextInput
                        editable={false}
                        label='Mobile Number'
                        value={Func.formatToPHMobileNumberFull(contact_no)}
                        keyboardType='numeric'
                        onChangeText={this.handleChangeContactNo}
                    />

                    <StaticInput
                        label='Name'
                        value={Func.cleanName(name)}
                    />
                </Screen>

                <Footer>
                    <Button disabled={!ready} t={_('62')} onPress={this.handleNext} />
                </Footer>
            </>
        )
    }
}