import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, ButtonText, Ripple, TopBuffer, Switch, HR, Prompt} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class LoginSecurity extends React.Component {

    static navigationOptions = {
        title:'Login and Security'
    }

    state = {
        touch_id:false,
        showSuccessModal:false,
        successModalMsg:''
    }

    handlePressChangePassword = () => this.props.navigation.navigate('ChangePassword')

    handleToggleTouchID = () => {
        let {touch_id} = this.state
        let successModalMsg = ''
        
        touch_id = !touch_id

        if(touch_id) successModalMsg = "You've successfully activated your Touch ID"
        else successModalMsg = "You've successfully deactivated your Touch ID"

        this.setState({
            touch_id,
            showSuccessModal:true,
            successModalMsg
        })
    }

    handleCloseModal = () => this.setState({showSuccessModal:false})

    render() {

        const {touch_id, showSuccessModal, successModalMsg} = this.state

        return (
            <View>

                <Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message={successModalMsg}
                    onDismiss={this.handleCloseModal}
                />

                <TopBuffer sm />

                <TouchableOpacity onPress={this.handlePressChangePassword} style={style.item}>
                    <Row bw>
                        <View>
                            <Text md mute>Change Password</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                    </Row>
                    <HR m={Metrics.rg} />
                </TouchableOpacity>

                <TouchableOpacity onPress={this.handleToggleTouchID} style={style.item}>
                    <Row bw>
                        <Text md mute>Touch ID</Text>
                        <Switch value={touch_id} onValueChange={this.handleToggleTouchID} />
                    </Row>
                    <HR m={Metrics.rg} />
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    item: {
        padding:Metrics.md
    }
})

export default LoginSecurity