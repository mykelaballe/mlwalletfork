import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Card, Row, ListItem, HR, Spacer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class ProfileIndexScreen extends React.Component {

    static navigationOptions = {
        title:_('26')
    }

    render() {

        const {navigate} = this.props.navigation

        return (
            <View style={style.container}>
                <ListItem onPress={() => navigate('ChangeAccountInfo')}>
                    <Row bw>
                        <Row>
                            <Icon name='ios-information-circle' size={Metrics.icon.rg} color={Colors.dark} />
                            <Spacer h />
                            <Text b md>{_('52')}</Text>
                        </Row>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </ListItem>
                <ListItem onPress={() => navigate('ChangePassword')}>
                    <Row bw>
                        <Row>
                            <Icon name='ios-key' size={Metrics.icon.rg} color={Colors.dark} />
                            <Spacer h />
                            <Text b md>{_('53')}</Text>
                        </Row>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </ListItem>
                <ListItem onPress={() => navigate('ChangeUsername')}>
                    <Row bw>
                        <Row>
                            <Icon name='ios-contact' size={Metrics.icon.rg} color={Colors.dark} />
                            <Spacer h />
                            <Text b md>{_('46')}</Text>
                        </Row>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </ListItem>
                <ListItem onPress={() => navigate('ChangeEmail')}>
                    <Row bw>
                        <Row>
                            <Icon name='ios-mail' size={Metrics.icon.rg} color={Colors.dark} />
                            <Spacer h />
                            <Text b md>{_('45')}</Text>
                        </Row>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </ListItem>
                <ListItem onPress={() => navigate('ChangePIN')}>
                    <Row bw>
                        <Row>
                            <Icon name='ios-keypad' size={Metrics.icon.rg} color={Colors.dark} />
                            <Spacer h />
                            <Text b md>{_('54')}</Text>
                        </Row>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </ListItem>
                <ListItem onPress={() => navigate('ChangeMobileNumber')}>
                    <Row bw>
                        <Row>
                            <Icon name='ios-phone-portrait' size={Metrics.icon.rg} color={Colors.dark} />
                            <Spacer h />
                            <Text b md>{_('55')}</Text>
                        </Row>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </ListItem>
                <ListItem onPress={() => navigate('ChangeSecurityQuestion')}>
                    <Row bw>
                        <Row>
                            <Icon name='ios-paper' size={Metrics.icon.rg} color={Colors.dark} />
                            <Spacer h />
                            <Text b md>{_('56')}</Text>
                        </Row>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </ListItem>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:Metrics.lg,
        paddingHorizontal:Metrics.lg
    }
})

export default ProfileIndexScreen