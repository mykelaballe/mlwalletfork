import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Screen, Footer, Headline, Spacer, Button, TextInput, StaticInput, Icon, Picker} from '../components'
import {Metrics} from '../themes'
import {_, Consts, Func} from '../utils'
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
                value:'globe',
                id:'MLNET17030007'
            },
            {
                label:'Smart/TNT',
                value:'smart eload',
                id:'MLNET16060001'
            },
            {
                label:'Smart Dealer',
                value:'smart dealer',
                id:'MLNET17030003'
            },
            {
                label:'Sun Cellular',
                value:'sun cellular',
                id:'MLNET16080001'
            },
            {
                label:'PLDT Global Corp',
                value:'pldt',
                id:''
            }
        ],
        network:'',
        name:this.props.navigation.state.params.receiver.fullname,
        contact_no:this.props.navigation.state.params.receiver.mobileno,
    }

    /*componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.receiver && params.receiver.mobileno !== prevState.contact_no) {
            this.props.navigation.setParams({receiver:null})
            this.setState({
                contact_no:params.receiver.mobileno,
                name:params.receiver.fullname
            })
        }
    }*/

    handleChangeContactNo = contact_no => this.setState({contact_no})

    handleSelectReceiver = () => this.props.navigation.navigate('SavedLoadReceivers')

    handleSelectNetwork = network => this.setState({network})

    handleNext = async () => {
        const {params} = this.props.navigation.state
        const {network} = this.state
        
        if(network.value == 'globe') {
            Say.info('Sorry! We are currently fixing some supplier issues.')
        }
        else if(network.value == 'pldt') {
            Say.info('Coming Soon!')
        }
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
                        value={contact_no}
                        keyboardType='numeric'
                        onChangeText={this.handleChangeContactNo}
                        /*rightContent={
                            <TouchableOpacity onPress={this.handleSelectReceiver}>
                                <Icon name='phonebook' style={{width:30,height:30}} />
                            </TouchableOpacity>
                        }*/
                    />

                    {/*<StaticInput
                        label='Mobile Number'
                        value={contact_no}
                    />*/}

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

const style = StyleSheet.create({
    textarea: {
        height:130
    }
})

export default Scrn