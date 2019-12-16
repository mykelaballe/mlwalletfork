import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer, Row} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class MyProfileScreen extends React.Component {

    static navigationOptions = {
        title:'My Profile'
    }

    render() {

        const {navigate} = this.props.navigation

        return (
            <View style={{flex:1,padding:Metrics.xl}}>

                <TopBuffer />

                <View style={{alignItems:'center'}}>
                    <Image source={{uri:'https://www.burges-salmon.com/-/media/images/profile-images/john-smith.jpg?h=250&la=en&mw=250&w=250&hash=0D9E913C3C069238FC61E93EDE573F9938F19527'}} style={style.avatar} resizeMode='contain' />
                </View>

                <Spacer />

                <Text center xl b>John Smith</Text>
                <Text center md>January 10, 1975</Text>

                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <Row bw>
                        <Button t={_('82')} onPress={() => navigate('MyAccount')} />
                        <Button t={_('17')} onPress={() => navigate('ProfileIndex')} />
                    </Row>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    avatar: {
        width:300,
        height:300,
        borderColor:Colors.gray,
        borderWidth:StyleSheet.hairlineWidth
    }
})

export default MyProfileScreen