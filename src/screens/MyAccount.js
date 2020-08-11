import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {withNavigationFocus} from 'react-navigation'
import {ScrollView, Text, Row, Spacer, HR, Avatar, TopBuffer, Button} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Func, Consts} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'My Account'
    }

    state = {
        isFocused:this.props.isFocused
    }

    componentDidMount = () => Say.some(_('88'),'Attention!')

    handleGoToVerificationLevels_ = () => {
        Say.some(
            'Upgrading of verification status via ML Wallet will be available SOON. Stay tuned!',
            'Hi there!'
        )
    }

    handleGoToVerificationLevels = () => {
        const {user} = this.props

        if(Func.getAge(user.birthdate) >= 18) {
            let birthdate_pieces = user.birthdate.split('T')
            let birth_date_pieces = birthdate_pieces[0].split('-')

            let params = {
                isFullVerification:true,
                firstname:user.fname,
                lastname:user.lname,
                bday_day:birth_date_pieces[2],
                bday_month:birth_date_pieces[1],
                bday_year:birth_date_pieces[0],
            }

            this.props.navigation.navigate('IDValidation',params)
        }
        else {
            Say.warn('You have not reached the minimum age requirement of 18 years old')
        }
    }

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
                        <Text center mute>{_('90')}: {Func.formatWalletNo(user.walletno)}</Text>
                        <Text center mute>{Func.formatAddress(user)}</Text>
                        <Text center mute>{Func.formatToPHMobileNumberFull(user.mobileno)}</Text>
                        <Text center mute>{user.emailaddress}</Text>

                        <Spacer />

                        {user.status !== 3 && <Button t='Get Fully Verified Now' mode='outlined' onPress={this.handleGoToVerificationLevels} />}

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
                                <Text mute>Update Password, PIN{/*, Enable Touch ID*/}</Text>
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

export default withNavigationFocus(connect(mapStateToProps)(Scrn))