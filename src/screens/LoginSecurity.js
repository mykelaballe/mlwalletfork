import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Text, Row, TopBuffer, Switch, HR} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Func} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Login and Security'
    }

    state = {
        processing:false
    }

    handlePressChangePassword = () => this.props.navigation.navigate('ChangePassword')

    handlePressChangePIN = () => this.props.navigation.navigate('ChangePIN')

    handleToggleTouchID = async () => {
        let {isUsingTouchID, setIsUsingTouchID, user} = this.props
        const {processing} = this.state
        
        if(!processing) {
            try {

                let res = await Func.validateTouchID()
    
                if(res) {
                    this.setState({processing:true})

                    setIsUsingTouchID(!isUsingTouchID)
                    Say.ok(`You've successfully ${isUsingTouchID ? 'deactivated' : 'activated'} your Touch ID`)
        
                    await API.updateTouchIDStatus({walletno:user.walletno,flag:isUsingTouchID ? 0 : 1})
                }
            }
            catch(err) {
                Say.err(err)
            }

            this.setState({processing:false})
        }
    }

    render() {

        const {isUsingTouchID} = this.props
        const {processing} = this.state

        return (
            <View>

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

                <TouchableOpacity onPress={this.handlePressChangePIN} style={style.item}>
                    <Row bw>
                        <View>
                            <Text md mute>Change PIN</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                    </Row>
                    <HR m={Metrics.rg} />
                </TouchableOpacity>

                {/*<TouchableOpacity onPress={this.handleToggleTouchID} style={style.item}>
                    <Row bw>
                        <Text md mute>Touch ID</Text>
                        <Switch value={isUsingTouchID} onValueChange={this.handleToggleTouchID} loading={processing} />
                    </Row>
                    <HR m={Metrics.rg} />
                </TouchableOpacity>*/}
            </View>
        )
    }
}

const style = StyleSheet.create({
    item: {
        padding:Metrics.md
    }
})

const mapStateToProps = state => ({
    user: state.user.data,
    isUsingTouchID: state.app.isUsingTouchID
})

const mapDispatchToProps = dispatch => ({
    setIsUsingTouchID:isUsing =>dispatch(Creators.setIsUsingTouchID(isUsing))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)