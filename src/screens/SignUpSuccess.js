import React from 'react'
import {View, Image} from 'react-native'
import {Screen, Footer, Headline, Text, Button, Spacer} from '../components'
import {_} from '../utils'
import {Res} from '../themes'

class Scrn extends React.Component {

    static navigationOptions = {
        header:null
    }

    handleGoToLogin = async () => this.props.navigation.navigate('Login')

    render() {

        const {walletno, fname} = this.props.navigation.state.params

        return (
            <>
                <Screen>
                    
                    <View style={{alignItems:'center'}}>
                        <Image source={Res.trophy} style={{width:120,height:120}} resizeMode='contain' />
                    </View>

                    <Headline title={`Congratulations, ${fname}!`} />
                    
                    <Text center md>You are now registered as a</Text>
                    <Text center b md>Semi-Verified User.</Text>

                    <Spacer />

                    <Text center md>Please remember your</Text>
                    <Text center md>ML Wallet Account number</Text>

                    <Spacer sm />

                    <Text center b lg>{walletno}</Text>
                </Screen>
            
                <Footer>
                    <Button t='Start using the ML Wallet App!' onPress={this.handleGoToLogin} />
                </Footer>
            </>
        )
    }
}

export default Scrn