import React from 'react'
import {View} from 'react-native'
import {withNavigation} from 'react-navigation'
import {Ripple} from './'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Ionicons'

class Hamburger extends React.Component {

    render() {

        const {toggleDrawer} = this.props.navigation

        return (
            <Ripple onPress={() => toggleDrawer()}>
                <View style={{paddingLeft:Metrics.lg}}>
                    <Icon name='ios-menu' size={Metrics.icon.rg} color={Colors.light} />
                </View>
            </Ripple>
        )
    }
}

export default withNavigation(Hamburger)