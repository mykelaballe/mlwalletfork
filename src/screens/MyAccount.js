import React from 'react'
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {connect} from 'react-redux'
import {ScrollView, Text, Row, Spacer, HR, Avatar, TopBuffer, Button, Prompt} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'My Account'
    }

    state = {
        avatar:null,
        verification_level:1,
        showWarning:false
    }

    componentDidMount = () => {
        Alert.alert(
            'Attention!',
            "This is sensitive personal information.\nPlease be careful in sharing these for your account's security"
        )
    }

    handleGoToVerificationLevels = () => this.props.navigation.navigate('VerificationLevels')

    handlePressProfile = () => this.props.navigation.navigate('Profile')

    handlePressQR = () => this.props.navigation.navigate('MyQR')

    handlePressPoints = () => this.props.navigation.navigate('MyPoints')

    handlePressLoginSecurity = () => this.props.navigation.navigate('LoginSecurity')

    handleCloseModal = () => this.setState({showWarning:false})

    render() {

        const {walletno, fname, mname, lname, suffix, email, country, province, city, barangay, mobile_no, status} = this.props.user
        const {avatar, verification_level, showWarning} = this.state

        return (
            <>
                {/*<Prompt
                    visible={showWarning}
                    title='Account Safety'
                    message='Warning message here'
                    onDismiss={this.handleCloseModal}
                />*/}

                <ScrollView>

                    <TopBuffer sm />

                    <View style={style.topContainer}>
                        <Avatar source={avatar} size={Metrics.image.lg} />

                        <Text b lg center mute>{fname} {lname}</Text>
                        <Text center mute>Wallet Account No: {walletno}</Text>
                        <Text center mute>{barangay}, {city}, {province}, {country}</Text>
                        <Text center mute>{mobile_no}</Text>
                        <Text center mute>{email}</Text>

                        <Spacer />

                        {status == 0 &&
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
                                <Text mute>Update Password, Enable Touch ID</Text>
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
        alignItems:'center'
    },
    item: {
        padding:Metrics.md,
    }
})

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)