import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {ScrollView, Text, Row, Spacer, HR, Avatar, TopBuffer, Button} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Func, Consts} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'My Account'
    }

    componentDidMount = () => {
        Say.some(
            "This is sensitive personal information.\nPlease be careful in sharing these for your account's security",
            'Attention!'
        )
    }

    handleGoToVerificationLevels = () => this.props.navigation.navigate('VerificationLevels')

    handlePressProfile = () => this.props.navigation.navigate('Profile')

    handlePressQR = () => this.props.navigation.navigate('MyQR')

    handlePressPoints = () => this.props.navigation.navigate('MyPoints')

    handlePressLoginSecurity = () => this.props.navigation.navigate('LoginSecurity')

    render() {

        const {user} = this.props

        return (
            <>
                <ScrollView>

                    <TopBuffer sm />

                    <View style={style.topContainer}>
                        <Avatar source={user.profilepic ? `${Consts.baseURL}wallet/image?walletno=${user.walletno}` : null} size={Metrics.image.lg} />

                        <Text b lg center mute>{Func.formatName(user)}</Text>
                        <Text center mute>Wallet Account No: {user.walletno}</Text>
                        <Text center mute>{Func.formatAddress(user)}</Text>
                        <Text center mute>{user.mobileno}</Text>
                        <Text center mute>{user.emailaddress}</Text>

                        <Spacer />

                        {user.status == 0 &&
                        <Button t='Get Fully Verified Now' mode='outlined' onPress={this.handleGoToVerificationLevels} />
                        }

                    </View>

                    <Spacer />

                    <TouchableOpacity onPress={this.handlePressProfile} style={style.item}>
                        <Row bw>
                            <View>
                                <Text b md mute>My Profile</Text>
                                <Text mute>Update your Personal Information</Text>
                            </View>
                            <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                        </Row>
                        <HR m={Metrics.rg} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handlePressQR} style={style.item}>
                        <Row bw>
                            <View>
                                <Text b md mute>My QR Code</Text>
                                <Text mute>View and Generate QR Code</Text>
                            </View>
                            <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                        </Row>
                        <HR m={Metrics.rg} />
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={this.handlePressPoints} style={style.item}>
                        <Row bw>
                            <View>
                                <Text b md mute>My Diamond Card Points</Text>
                                <Text mute>View point mechanics</Text>
                            </View>
                            <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                        </Row>
                        <HR m={Metrics.rg} />
                    </TouchableOpacity>*/}

                    <TouchableOpacity onPress={this.handlePressLoginSecurity} style={style.item}>
                        <Row bw>
                            <View>
                                <Text b md mute>Login and Security</Text>
                                <Text mute>Update Password, PIN, Enable Touch ID</Text>
                            </View>
                            <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                        </Row>
                        <HR m={Metrics.rg} />
                    </TouchableOpacity>
                </ScrollView>
            </>
        )
    }
}

const style = StyleSheet.create({
    topContainer: {
        alignItems:'center',
        paddingHorizontal:Metrics.rg
    },
    item: {
        padding:Metrics.md,
    }
})

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)