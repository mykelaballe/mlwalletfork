import React from 'react'
import {View, StyleSheet} from 'react-native'
import {ScrollView, Text, Row, Spacer, Avatar, TopBuffer, Button, Outline} from '../components'
import {Metrics} from '../themes'
import {_} from '../utils'

const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Profile'
    }

    state = {
        avatar:'http://themes.themewaves.com/nuzi/wp-content/uploads/sites/4/2013/05/Team-Member-3.jpg',
        username:'johnsmith',
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

    handleEditProfile = () => this.props.navigation.navigate('EditProfileIndex')

    render() {

        const {avatar, username, firstname, lastname, wallet_no, address, mobile_no, email, source_income, birthday, gender, country, province, city, barangay, zip_code} = this.state

        return (
            <>
                <ScrollView>
                    <TopBuffer sm />

                    <View style={style.topContainer}>
                        <Avatar source={avatar} size={Metrics.image.lg} />
                        <Text b lg center mute>{firstname} {lastname}</Text>

                        <Spacer />

                        <Button mode='outlined' icon='pencil' t='Edit Profile' onPress={this.handleEditProfile} />
                    </View>

                    <View style={{padding:Metrics.md}}>
                    <Outline>
                        <Text sm mute>Username</Text>
                        <Text>{username}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Mobile No.</Text>
                        <Text>{mobile_no}</Text>
                    </Outline>
                
                    <Outline>
                        <Text sm mute>Email address</Text>
                        <Text>{email}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Source of Income</Text>
                        <Text>{source_income}</Text>
                    </Outline>

                    <Outline>
                        <Text md>Birthday</Text>
                        <Row ar>
                            <View>
                                <Text sm mute>Month</Text>
                                <Text md>{moment(birthday).format('MMMM')}</Text>
                            </View>
                            <View>
                                <Text sm mute>Day</Text>
                                <Text md>{moment(birthday).format('DD')}</Text>
                            </View>
                            <View>
                                <Text sm mute>Year</Text>
                                <Text md>{moment(birthday).format('YYYY')}</Text>
                            </View>
                        </Row>
                    </Outline>

                    <Outline>
                        <Text sm mute>Gender</Text>
                        <Text>{gender}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Country</Text>
                        <Text>{country}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Province</Text>
                        <Text>{province}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>City/Municipality</Text>
                        <Text>{city}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Barangay/Street</Text>
                        <Text>{barangay}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Zip Code</Text>
                        <Text>{zip_code}</Text>
                    </Outline>
                    </View>
                </ScrollView>
            </>
        )
    }
}

const style = StyleSheet.create({
    topContainer: {
        alignItems:'center'
    }
})

export default Scrn