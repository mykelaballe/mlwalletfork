import React from 'react'
import {View, Image} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Screen, Footer, Headline, Text, Button, Spacer, Row} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = {
        header:null
    }

    handleGoToLogin = async () => this.props.navigation.navigate('Login')

    render() {

        return (
            <>
                <Screen>
                    
                    <View style={{alignItems:'center'}}>
                        <Image source={Res.trophy} style={{width:120,height:120}} resizeMode='contain' />
                    </View>

                    <Headline title='Congratulations, Juana!' />
                    
                    <Text center md>You are now registered as a</Text>
                    <Text center b md>Semi-Verified User.</Text>

                    <Spacer />

                    <Text center md>Please remember your</Text>
                    <Text center md>ML Wallet Account number</Text>

                    <Spacer sm />

                    <Text center b lg>1911-0000-2519-34</Text>
                </Screen>
            
                <Footer>
                    <Button t='Start using the ML Wallet App!' onPress={this.handleGoToLogin} />
                </Footer>
            </>
        )
    }
}

export default Scrn