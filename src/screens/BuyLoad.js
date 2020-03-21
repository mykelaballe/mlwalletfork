import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Screen, Footer, Headline, Spacer, Button, TextInput, StaticInput, Icon, Picker} from '../components'
import {Metrics} from '../themes'
import {_, Consts} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Buy eLoad'
    }

    state = {
        type:Consts.tcn.bul.code,
        networks:[
            {
                label:'Globe/TM',
                value:'globe'
            },
            {
                label:'Smart/TNT',
                value:'smart eload'
            },
            {
                label:'Smart Dealer',
                value:'smart dealer'
            },
            {
                label:'Sun Cellular',
                value:'sun cellular'
            },
            {
                label:'PLDT Global Corp',
                value:'load central'
            }
        ],
        network:'',
        name:'',
        contact_no:'',
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.receiver && params.receiver.mobileno !== prevState.contact_no) {
            this.props.navigation.setParams({receiver:null})
            this.setState({contact_no:params.receiver.mobileno})
        }
    }

    handleChangeContactNo = contact_no => this.setState({contact_no})

    handleSelectReceiver = () => this.props.navigation.navigate('SavedLoadReceivers')

    handleSelectNetwork = network => this.setState({network:network.label})

    handleNext = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('LoadOptions',{
            ...params,
            ...this.state
        })
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
                        selected={network}
                        items={networks}
                        placeholder='Choose network'
                        onChoose={this.handleSelectNetwork}
                    />

                    {/*<TextInput
                        label='Mobile Number'
                        value={contact_no}
                        keyboardType='numeric'
                        onChangeText={this.handleChangeContactNo}
                        rightContent={
                            <TouchableOpacity onPress={this.handleSelectReceiver}>
                                <Icon name='phonebook' style={{width:30,height:30}} />
                            </TouchableOpacity>
                        }
                    />*/}

                    <StaticInput
                        label='Mobile Number'
                        value={contact_no}
                    />

                    <StaticInput
                        label='Name'
                        value={name}
                    />
                </Screen>

                <Footer>
                    <Button disabled={!ready} t={_('62')} onPress={this.handleNext} />
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