import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Button, Spacer, TopBuffer, Card, HR, ListItem} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class RegisterIndexScreen extends React.Component {

    static navigationOptions = {
        title:_('20')
    }

    handleNext = () => this.props.navigation.navigate('SignUp')

    render() {

        return (
            <View style={{flex:1,padding:Metrics.xl}}>

                <Spacer />

                <Text b lg center>{_('63')}:</Text>

                <Spacer />

                <HR />

                <ListItem>
                    <Text>Step 1 {_('64')}</Text>
                    <Spacer />
                    <Text>Step 2 {_('65')}</Text>
                    <Spacer />
                    <Text>Step 3 {_('66')}</Text>
                    <Spacer />
                    <Text>Step 4 {_('67')}</Text>
                    <Spacer />
                    <Text>Step 5 {_('68')}</Text>
                </ListItem>

                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <Button t={_('62')} onPress={this.handleNext} />
                </View>
            </View>
        )
    }
}

export default RegisterIndexScreen