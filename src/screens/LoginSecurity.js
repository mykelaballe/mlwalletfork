import React from 'react'
import {View, StyleSheet, InteractionManager, Switch} from 'react-native'
import {ScrollView, Text, Row, Spacer, ButtonText, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class LoginSecurity extends React.Component {

    static navigationOptions = {
        title:'Login and Security'
    }

    state = {
        touch_id:false
    }

    handlePressChangePassword = () => this.props.navigation.navigate('ChangePassword')

    handleToggleTouchID = () => this.setState(prevState => ({touch_id:!prevState.touch_id}))

    render() {

        const {touch_id} = this.state

        return (
            <View>
                <TopBuffer sm />
                <Ripple onPress={this.handlePressChangePassword} style={style.item}>
                    <Row bw>
                        <Text md>Change Password</Text>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </Ripple>
                <Ripple onPress={this.handleToggleTouchID} style={style.item}>
                    <Row bw>
                        <Text md>Touch ID</Text>
                        <Switch value={touch_id} onValueChange={this.handleToggleTouchID} />
                    </Row>
                </Ripple>
            </View>
        )
    }
}

const style = StyleSheet.create({
    item: {
        paddingVertical:Metrics.rg,
        paddingHorizontal:Metrics.xl
    }
})

export default LoginSecurity