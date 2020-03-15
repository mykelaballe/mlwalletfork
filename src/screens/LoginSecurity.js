import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Text, Row, TopBuffer, Switch, HR, Prompt} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Login and Security'
    }

    state = {
        //showSuccessModal:false,
        //successModalMsg:''
    }

    handlePressChangePassword = () => this.props.navigation.navigate('ChangePassword')

    handleToggleTouchID = () => {
        let {isUsingTouchID, setIsUsingTouchID} = this.props
        //let successModalMsg = ''

        if(isUsingTouchID) {
            setIsUsingTouchID(false)
            Say.ok("You've successfully deactivated your Touch ID")
            //successModalMsg = "You've successfully deactivated your Touch ID"
        }
        else {
            setIsUsingTouchID(true)
            Say.ok("You've successfully activated your Touch ID")
            //successModalMsg = "You've successfully activated your Touch ID"
        }

        /*this.setState({
            showSuccessModal:true,
            successModalMsg
        })*/
    }

    //handleCloseModal = () => this.setState({showSuccessModal:false})

    render() {

        const {isUsingTouchID} = this.props
        //const {showSuccessModal, successModalMsg} = this.state

        return (
            <View>

                {/*<Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message={successModalMsg}
                    onDismiss={this.handleCloseModal}
                />*/}

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
                        <Switch value={isUsingTouchID} onValueChange={this.handleToggleTouchID} />
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

const mapStateToProps = state => ({
    isUsingTouchID: state.app.isUsingTouchID
})

const mapDispatchToProps = dispatch => ({
    setIsUsingTouchID:isUsing =>dispatch(Creators.setIsUsingTouchID(isUsing))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)