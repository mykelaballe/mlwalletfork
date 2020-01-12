import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, HR, Avatar, TopBuffer, Button} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class MyAccount extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'My Account'
    }

    state = {
        avatar:'http://themes.themewaves.com/nuzi/wp-content/uploads/sites/4/2013/05/Team-Member-3.jpg',
        firstname:'John',
        lastname:'Doe',
        wallet_no:'1234-5678-90',
        address:'Talisay City, Cebu',
        mobile_no:'0912345678',
        email:'johndoe@gmail.com',
        verification_level:1
    }

    handleGoToVerificationLevels = () => this.props.navigation.navigate('VerificationLevels')

    handlePressProfile = () => this.props.navigation.navigate('Profile')

    handlePressQR = () => this.props.navigation.navigate('MyQR')

    handlePressMyRewards = () => this.props.navigation.navigate('MyRewards')

    handlePressLoginSecurity = () => this.props.navigation.navigate('LoginSecurity')

    render() {

        const {avatar, firstname, lastname, wallet_no, address, mobile_no, email, verification_level} = this.state

        return (
            <ScrollView>

                <TopBuffer sm />

                <View style={style.topContainer}>
                    <Avatar source={avatar} size={Metrics.image.lg} />

                    <Text b lg center>{firstname} {lastname}</Text>
                    <Text center>Wallet No: {wallet_no}</Text>
                    <Text center>{address}</Text>
                    <Text center>{mobile_no}</Text>
                    <Text center>{email}</Text>

                    <Spacer />

                    <Button t='Get Fully Verified Now' mode='outlined' onPress={this.handleGoToVerificationLevels} />

                </View>

                <Spacer />

                <TouchableOpacity onPress={this.handlePressProfile} style={style.item}>
                    <Row bw>
                        <View>
                            <Text b md>Profile</Text>
                            <Text sm>Update your Personal Information</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                    </Row>
                    <HR m={Metrics.sm} />
                </TouchableOpacity>

                <TouchableOpacity onPress={this.handlePressQR} style={style.item}>
                    <Row bw>
                        <View>
                            <Text b md>My QR Code</Text>
                            <Text sm>View and Generate QR Code</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                    </Row>
                    <HR m={Metrics.sm} />
                </TouchableOpacity>

                <TouchableOpacity onPress={null} style={style.item}>
                    <Row bw>
                        <View>
                            <Text b md>My Rewards Card</Text>
                            <Text sm>Redeem Points, Rewards</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                    </Row>
                    <HR m={Metrics.sm} />
                </TouchableOpacity>

                <TouchableOpacity onPress={this.handlePressLoginSecurity} style={style.item}>
                    <Row bw>
                        <View>
                            <Text b md>Login and Security</Text>
                            <Text sm>Update Password, Enable Touch ID</Text>
                        </View>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                    </Row>
                    <HR m={Metrics.sm} />
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    topContainer: {
        alignItems:'center'
    },
    item: {
        paddingVertical:Metrics.rg,
        paddingHorizontal:Metrics.md
    }
})

export default MyAccount