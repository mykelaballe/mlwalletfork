import React from 'react'
import {Screen, Headline, Spacer, Button, ButtonText, View} from '../components'
import {_} from '../utils'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Feather'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add Money'
    }

    handleUseQR = () => this.props.navigation.navigate('MyQR')

    handleUseForm = () => this.props.navigation.navigate('AddMoneyForm')

    handleLocateBranch = () => this.props.navigation.navigate('Locator',{is_nearest:true})

    render() {

        return (
            <Screen>
                <Headline subtext={`To add money to your account, go to the nearest\nM Lhuillier branch.`} />
                
                <View style={{padding:Metrics.xl}}>
                    <Button mode='outlined' t='My QR Code' onPress={this.handleUseQR} />
                    <Spacer />
                    <Button mode='outlined' t='Fill up Form' onPress={this.handleUseForm} />

                    <Spacer xl />

                    <View style={{alignItems:'center'}}>
                        <Icon name='map-pin' color={Colors.brand} size={Metrics.icon.xl} />
                        <Spacer sm />
                        <ButtonText t='Locate nearest branch' onPress={this.handleLocateBranch} />
                    </View>
                </View>
            </Screen>
        )
    }
}