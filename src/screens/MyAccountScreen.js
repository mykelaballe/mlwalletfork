import React from 'react'
import {StyleSheet, View, Image, ScrollView} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer, Row, HR} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import Snackbar from 'react-native-snackbar'

class MyAccountScreen extends React.Component {

    static navigationOptions = {
        title:'My Account'
    }

    componentDidMount() {
        setTimeout(() => {
            Snackbar.show({
                title:"This information is confidential, don't make it public for your account's safety",
                duration:Snackbar.LENGTH_LONG,
                action: {
                    title:'dismiss',
                    color:Colors.light
                }
            })
        },1000)
    }

    componentWillUnmount() {
        Snackbar.dismiss()
    }

    render() {

        const {navigate} = this.props.navigation

        return (
            <ScrollView contentContainerStyle={{padding:Metrics.xl}} showsVerticalScrollIndicator={false}>

                <Row>
                    <Image
                        source={{uri:'https://www.burges-salmon.com/-/media/images/profile-images/john-smith.jpg?h=250&la=en&mw=250&w=250&hash=0D9E913C3C069238FC61E93EDE573F9938F19527'}}
                        style={style.avatar}
                        resizeMode='contain'
                    />
                    <Spacer sm h />
                    <View style={{flex:1}}>
                        <Text lg b>John Smith</Text>
                        <Text md>09123456789</Text>
                    </View>
                </Row>

                <Spacer />

                <HR />

                <Spacer />

                <View>
                    <Text md brand center>Account Information</Text>
                    
                    <Spacer />

                    <Row>
                        <Text right style={style.label}>Wallet #:</Text>
                        <Text style={style.value}>190-0000-3050-71</Text>
                    </Row>

                    <Spacer sm />

                    <Row>
                        <Text right style={style.label}>Wallet Name:</Text>
                        <Text style={style.value}>Mykel2019</Text>
                    </Row>

                    <Spacer sm />

                    <Row>
                        <Text right style={style.label}>Balance:</Text>
                        <Text style={style.value}>0.00</Text>
                    </Row>

                    <Spacer sm />

                    <Row>
                        <Text right style={style.label}>Address:</Text>
                        <Text style={style.value}>Lot 1 Blk 1, My Subdivision, Basak, Cebu City, Cebu</Text>
                    </Row>

                    <Spacer sm />

                    <Row>
                        <Text right style={style.label}>Email:</Text>
                        <Text style={style.value}>myemail@gmail.com</Text>
                    </Row>

                    <Spacer sm />

                    <Row>
                        <Text right style={style.label}>Status:</Text>
                        <Text style={style.value}></Text>
                    </Row>

                    <Spacer sm />

                    <Row>
                        <Text right style={style.label}>Level:</Text>
                        <Text style={style.value}>5</Text>
                    </Row>
                </View>

                <Spacer />

                <Button t='My QR Code' onPress={() => navigate('QRCode')} />

                <Spacer />

                <HR />

                <Spacer />

                <View>
                    <Text b>Levels</Text>

                    <Spacer xs />

                    <Row>
                        <Text xs style={style.labelSm}>Level 1:</Text>
                        <Text xs style={style.value}>KYC verified. Can do bills payment only.</Text>
                    </Row>

                    <Spacer sm />

                    <Row>
                        <Text xs style={style.labelSm}>Level 2:</Text>
                        <Text xs style={style.value}>P2P approved. Can do all services at P50,000.00 limit.</Text>
                    </Row>

                    <Spacer sm />

                    <Row>
                        <Text xs style={style.labelSm}>Level 3:</Text>
                        <Text xs style={style.value}>Custom Limit.</Text>
                    </Row>
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    label: {
        width:100,
        marginRight:Metrics.lg
    },
    labelSm: {
        width:50
    },
    value: {
        flex:1
    },
    avatar: {
        width:80,
        height:80,
        borderColor:Colors.gray,
        borderWidth:StyleSheet.hairlineWidth
    }
})

export default MyAccountScreen