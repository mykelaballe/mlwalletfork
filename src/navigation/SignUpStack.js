import React from 'react'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {
    SignUpTab1Screen,
    SignUpTab2Screen,
    SignUpTab3Screen,
    SignUpTab4Screen,
    SignUpTab5Screen
} from '../screens'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Ionicons'

export default createMaterialTopTabNavigator({
    SignUpTab1: {
        screen:SignUpTab1Screen,
        navigationOptions:{
            tabBarIcon:<Icon name='ios-information-circle' color={Colors.light} size={Metrics.icon.rg} />
        }
    },
    SignUpTab2: {
        screen:SignUpTab2Screen,
        navigationOptions:{
            tabBarIcon:<Icon name='ios-keypad' color={Colors.light} size={Metrics.icon.rg} />,
            /*tabBarOnPress:({navigation, defaultHandler}) => {
                let {params = {}} = navigation.state
                alert(params.SignUpTab1_OK)
                if(typeof params.SignUpTab1_OK === 'undefined') return null
                defaultHandler()
            }*/
        }
    },
    SignUpTab3: {
        screen:SignUpTab3Screen,
        navigationOptions:{
            tabBarIcon:<Icon name='ios-contact' color={Colors.light} size={Metrics.icon.rg} />
        }
    },
    SignUpTab4: {
        screen:SignUpTab4Screen,
        navigationOptions:{
            tabBarIcon:<Icon name='ios-paper' color={Colors.light} size={Metrics.icon.rg} />
        }
    },
    SignUpTab5: {
        screen:SignUpTab5Screen,
        navigationOptions:{
            tabBarIcon:<Icon name='ios-lock' color={Colors.light} size={Metrics.icon.rg} />
        }
    }
},{
    lazy:true,
    tabBarPosition:'bottom',
    swipeEnabled:false,
    tabBarOptions: {
        inactiveTintColor:'#bbb',
        indicatorStyle: {
            backgroundColor:Colors.light
        },
        style: {
            backgroundColor:Colors.brand
        },
        showIcon:true,
        showLabel:false
    },
    defaultNavigationOptions:({navigation}) => ({
        tabBarOnLongPress:() => null,
        tabBarOnPress:({navigation, defaultHandler}) => {
            /*const {params = {}, routeName} = navigation.state
            
            if(routeName == 'SignUpTab2' && !params.SignUpTab1_OK) return null
            defaultHandler()*/
        }
    })
})