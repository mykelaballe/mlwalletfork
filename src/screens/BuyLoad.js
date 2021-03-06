import React from 'react'
import {View, InteractionManager} from 'react-native'
import {Screen, Footer, Headline, Spacer, Button, TextInput, StaticInput, Icon, Picker, Text} from '../components'
import {Metrics} from '../themes'
import {_, Consts, Func, Say} from '../utils'
import {API} from '../services'

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
        loading:true,
        processing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let networks = []

        try {
            networks = await API.getLoadNetworks()
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({
            networks,
            loading:false
        })
    }

    handleChangeContactNo = contact_no => this.setState({contact_no})

    handleSelectReceiver = () => this.props.navigation.navigate('SavedLoadReceivers')
    handleSelectNetwork = network => this.setState({network})

    handleNext = async () => {
        const {params} = this.props.navigation.state
        const {network, contact_no, processing} = this.state
        
        if(!processing) {
            try {
                this.setState({processing:true})

                if(!Func.isPHMobileNumber(contact_no)) Say.warn(Consts.error.mobile)
                else {
                    let res = await API.getLoadOptions(network.value, contact_no)
                    
                    if(res.error) Say.warn(res.message)
                    else {
                        this.props.navigation.navigate('LoadOptions',{
                            ...params,
                            ...this.state
                        })
                    }
                }
            }
            catch(err) {
                Say.err(err)
            }

            this.setState({processing:false})
        }
    }

    render() {

        const {networks, network, contact_no, name, loading, processing} = this.state
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

                    {networks.length > 0 ?
                    <Picker
                        loading={loading}
                        selected={network && network.label}
                        items={networks}
                        placeholder='Choose network'
                        onChoose={this.handleSelectNetwork}
                    /> : <Text center b md>No network available</Text>
                    }

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
                    <Button disabled={!ready || loading} t={_('62')} onPress={this.handleNext} loading={processing} />
                </Footer>
            </>
        )
    }
}