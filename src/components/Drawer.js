import React from 'react'
import {StyleSheet, ScrollView, ImageBackground, Image, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import Actions from '../actions/Creators'
import {Text} from './'

const drawer_bg = require('../res/drawer_bg.png')
const def_avatar = require('../res/avatar.jpg')

class Drawer extends React.Component {

    handleLogout = () => {
        this.props.logout()
    }

    render() {

        const {props} = this

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={drawer_bg} style={style.cover}>
                    <View style={{flex:1,justifyContent:'flex-end'}}>
                        <Image source={def_avatar} style={style.avatar} />
                        <Text md b light>Mykel Aballe</Text>
                        <Text light>mykelaballe@gmail.com</Text>
                        <View style={style.subTextsContainer}>
                            <Text b sm light>v1.0.0</Text>
                            <TouchableOpacity onPress={this.handleLogout}>
                                <Text b sm light>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            <DrawerNavigatorItems {...props} />
        </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    cover: {
        backgroundColor:'rgba(0,0,0,.3)',
        width:undefined,
        height:200,
        padding:10
    },
    avatar: {
        width:60,
        height:60,
        borderRadius:60
    },
    subTextsContainer: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})

mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(Actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Drawer)