import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, HR, Avatar, TopBuffer, ButtonText} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const moment = require('moment')

class Profile extends React.Component {

    static navigationOptions = {
        title:'Profile'
    }

    state = {
        avatar:'http://themes.themewaves.com/nuzi/wp-content/uploads/sites/4/2013/05/Team-Member-3.jpg',
        firstname:'John',
        lastname:'Doe',
        wallet_no:'1234-5678-90',
        address:'Talisay City, Cebu',
        mobile_no:'0912345678',
        email:'johndoe@gmail.com',
        source_income:'Salary',
        birthday:'1980-01-01',
        gender:'Male',
        country:'Philippines',
        province:'Cebu',
        city:'Talisay',
        barangay:'Dumlog',
        zip_code:'6045'
    }

    handleEditProfile = () => this.props.navigation.navigate('EditProfile')

    render() {

        const {avatar, firstname, lastname, wallet_no, address, mobile_no, email, source_income, birthday, gender, country, province, city, barangay, zip_code} = this.state

        return (
            <ScrollView>
                <TopBuffer sm />

                <View style={style.topContainer}>
                    <Avatar source={avatar} size={Metrics.image.lg} />
                    <Text b lg center>{firstname} {lastname}</Text>

                    <Spacer />

                    <ButtonText icon='edit' t='Edit Profile' onPress={this.handleEditProfile} />
                </View>

                <View style={style.item}>
                    <Text mute>Mobile No.</Text>
                    <Text>{mobile_no}</Text>
                    <HR />
                </View>
            
                <View style={style.item}>
                    <Text mute>Email address</Text>
                    <Text>{email}</Text>
                    <HR />
                </View>

                <View style={style.item}>
                    <Text mute>Source of Income</Text>
                    <Text>{source_income}</Text>
                    <HR />
                </View>

                <View style={style.item}>
                    <Text mute>Birthday</Text>
                    <Text>{birthday}</Text>
                    <HR />
                </View>

                <View style={style.item}>
                    <Text mute>Gender</Text>
                    <Text>{gender}</Text>
                    <HR />
                </View>

                <View style={style.item}>
                    <Text mute>Country</Text>
                    <Text>{country}</Text>
                    <HR />
                </View>

                <View style={style.item}>
                    <Text mute>Province</Text>
                    <Text>{province}</Text>
                    <HR />
                </View>

                <View style={style.item}>
                    <Text mute>City/Municipality</Text>
                    <Text>{city}</Text>
                    <HR />
                </View>

                <View style={style.item}>
                    <Text mute>Barangay/Street</Text>
                    <Text>{barangay}</Text>
                    <HR />
                </View>

                <View style={style.item}>
                    <Text mute>Zip Code</Text>
                    <Text>{zip_code}</Text>
                    <HR />
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    topContainer: {
        alignItems:'center'
    },
    item: {
        paddingVertical:Metrics.rg,
        paddingHorizontal:Metrics.lg
    }
})

export default Profile