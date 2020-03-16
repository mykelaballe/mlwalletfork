import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Screen, Footer, Headline, Spacer, Button, TextInput, Icon} from '../components'
import {Metrics} from '../themes'
import {_, Consts} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Buy eLoad'
    }

    state = {
        type:Consts.tcn.bul.code,
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

    handleNext = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('LoadOptions',{
            ...params,
            ...this.state
        })
    }

    render() {

        const {contact_no} = this.state
        let ready = false

        if(contact_no) ready = true

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
                        value={contact_no}
                        keyboardType='numeric'
                        onChangeText={this.handleChangeContactNo}
                        rightContent={
                            <TouchableOpacity onPress={this.handleSelectReceiver}>
                                <Icon name='phonebook' style={{width:30,height:30}} />
                            </TouchableOpacity>
                        }
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