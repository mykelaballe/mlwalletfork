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

                    <Headline title='Congratulations!' />
                    
                    <Text center>You are now registered.</Text>
                    <Text center>This is your ML wallet ID number</Text>

                    <Spacer sm />

                    <Text center md b>1911-000-32519-34</Text>

                    <Spacer sm />

                    <Text center>For you to enjoy all ML Wallet services, please perform the next steps:</Text>

                    <Spacer lg />

                    <Text b>Step 1</Text>
                    <Text>Visit any M Mlhuillier branch.</Text>

                    <Spacer />

                    <Text b>Step 2</Text>
                    <Text>Present your ML Wallet ID number to the branch personnel.</Text>

                    <Spacer />

                    <Text b>Step 3</Text>
                    <Text>Present your ML Wallet ID number to the branch personnel.</Text>
                </Screen>
            
                <Footer>
                    <Button t='Go to Login' onPress={this.handleGoToLogin} />
                </Footer>
            </>
        )
    }
}

export default Scrn