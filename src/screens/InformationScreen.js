import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Card, Row, ListItem, HR, Spacer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import {Button} from 'react-native-paper'

class InformationScreen extends React.Component {

    static navigationOptions = {
        title:_('26')
    }

    handleViewContactUs = () => this.props.navigation.navigate('ContactUs')

    handleViewFAQ = () => this.props.navigation.navigate('FAQ')

    handleViewAbout = () => this.props.navigation.navigate('About')

    render() {

        return (
            <View style={style.container}>
                <ListItem onPress={this.handleViewContactUs}>
                    <Row bw>
                        <Row>
                            <Icon name='ios-call' size={Metrics.icon.rg} color={Colors.dark} />
                            <Spacer h />
                            <Text b md>{_('23')}</Text>
                        </Row>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </ListItem>
                <ListItem onPress={this.handleViewFAQ}>
                    <Row bw>
                        <Row>
                            <Icon name='ios-help-circle' size={Metrics.icon.rg} color={Colors.dark} />
                            <Spacer h />
                            <Text b md>{_('24')}</Text>
                        </Row>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </ListItem>
                <ListItem onPress={this.handleViewAbout}>
                    <Row bw>
                        <Row>
                            <Icon name='ios-information-circle' size={Metrics.icon.rg} color={Colors.dark} />
                            <Spacer h />
                            <Text b md>{_('25')}</Text>
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

export default InformationScreen