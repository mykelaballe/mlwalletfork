import React from 'react'
import {View, Image} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, Text, Button, Spacer} from '../components'
import {_, Func} from '../utils'
import {Metrics, Res} from '../themes'

class Scrn extends React.Component {

    static navigationOptions = {
        header:null
    }

    handleGoToLogin = async () => {
        const {isFirstTime, setIsFirstTime, navigation} = this.props
        
        if(isFirstTime) setIsFirstTime(false)
        else navigation.navigate('Login')
    }

    render() {

        const {walletno, fname, bdate, idType} = this.props.navigation.state.params
        const age = Func.getAge(bdate)
        let type = 'Fully'

        if(idType == 'student' || idType == 'company' || age < 18) type = 'Semi'

        return (
            <>
                <Screen>
                    
                    <View style={{alignItems:'center'}}>
                        <Image source={Res.trophy} style={{width:120,height:120}} resizeMode='contain' />
                    </View>

                    <Headline title={`Congratulations, ${fname}!`} />
                    
                    <Text center md>You are registered as a</Text>
                    <Text center b md>{type}-Verified User.</Text>

                    {age < 18 &&
                    <View style={{padding:Metrics.md}}>
                        <Text center md>All users under the age of 18 are automatically tagged as semi-	verified.</Text>
                    </View>
                    }

                    <Spacer />

                    <Text center md>Please remember your</Text>
                    <Text center md>{_('90')}</Text>

                    <Spacer sm />

                    <Text center b lg>{Func.formatWalletNo(walletno)}</Text>
                </Screen>
            
                <Footer>
                    <Button t='Start using the ML Wallet App!' onPress={this.handleGoToLogin} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    isFirstTime: state.app.isFirstTime
})

const mapDispatchToProps = dispatch => ({
    setIsFirstTime: isFirstTime => dispatch(Creators.setIsFirstTime(isFirstTime))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)