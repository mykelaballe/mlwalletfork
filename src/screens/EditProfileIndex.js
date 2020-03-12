import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Spacer, Avatar, ButtonText} from '../components'
import {Metrics} from '../themes'
import {_} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Profile'
    }

    handleEditName = () => this.props.navigation.navigate('EditMyNameIndex')

    handleEditBirthday = () => this.props.navigation.navigate('EditMyBirthdayIndex')

    handleEditGender = () => this.props.navigation.navigate('EditMyGender')

    handleEditMobileNo = () => this.props.navigation.navigate('EditMyMobileNoIndex')

    handleEditEmail = () => this.props.navigation.navigate('EditMyEmailIndex')

    handleEditOtherDetails = () => this.props.navigation.navigate('EditMyOtherDetails')

    render() {

        const avatar = null

        return (
            <Screen>
                <TouchableOpacity style={style.topContainer}>
                    <Avatar source={avatar} size={Metrics.image.lg} />
                </TouchableOpacity>

                <Spacer lg />

                <ButtonText t='Edit my name' onPress={this.handleEditName} labelStyle={style.btnLabel} />
                <ButtonText t='Edit my birthday' onPress={this.handleEditBirthday} labelStyle={style.btnLabel} />
                <ButtonText t='Edit my gender' onPress={this.handleEditGender} labelStyle={style.btnLabel} />
                <ButtonText t='Edit my mobile number' onPress={this.handleEditMobileNo} labelStyle={style.btnLabel} />
                <ButtonText t='Edit my email address' onPress={this.handleEditEmail} labelStyle={style.btnLabel} />
                <ButtonText t='Edit other details' onPress={this.handleEditOtherDetails} labelStyle={style.btnLabel} />
            </Screen>
        )
    }
}

const style = StyleSheet.create({
    topContainer: {
        alignItems:'center'
    },
    btnLabel: {
        fontSize:Metrics.font.md
    }
})

export default Scrn