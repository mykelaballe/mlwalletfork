import React from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {ScrollView, Text, Row, Spacer, Avatar, TopBuffer, Button, Outline} from '../components'
import {Metrics} from '../themes'
import {_} from '../utils'

const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Profile'
    }

    state = {
        avatar:null
    }

    handleEditProfile = () => this.props.navigation.navigate('EditProfileIndex')

    render() {

        const {username, fname, mname, lname, suffix, mobile_no, email, source_of_income, birthdate, gender, nationality, country, province, city, barangay, zip_code} = this.props.user
        const {avatar} = this.state

        return (
            <ScrollView>
                <TopBuffer sm />

                <View style={style.topContainer}>
                    <Avatar source={avatar} size={Metrics.image.lg} />
                    <Text b lg center mute>{fname} {lname}</Text>

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
                        <Text>{source_of_income}</Text>
                    </Outline>

                    <Outline>
                        <Text md>Birthday</Text>
                        <Row ar>
                            <View>
                                <Text sm mute>Month</Text>
                                <Text md>{moment(birthdate).format('MMMM')}</Text>
                            </View>
                            <View>
                                <Text sm mute>Day</Text>
                                <Text md>{moment(birthdate).format('DD')}</Text>
                            </View>
                            <View>
                                <Text sm mute>Year</Text>
                                <Text md>{moment(birthdate).format('YYYY')}</Text>
                            </View>
                        </Row>
                    </Outline>

                    <Outline>
                        <Text sm mute>Gender</Text>
                        <Text>{gender}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Nationality</Text>
                        <Text>{nationality}</Text>
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
        )
    }
}

const style = StyleSheet.create({
    topContainer: {
        alignItems:'center'
    }
})

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)