import React from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {ScrollView, Text, Row, Spacer, Avatar, TopBuffer, Button, Outline} from '../components'
import {Metrics} from '../themes'
import {_, Func} from '../utils'

const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Profile'
    }

    handleEditProfile = () => this.props.navigation.navigate('EditProfileIndex')

    render() {

        const {user} = this.props

        return (
            <ScrollView>
                <TopBuffer sm />

                <View style={style.topContainer}>
                    <Avatar source={user.profilepic} size={Metrics.image.lg} />
                    <Text b lg center mute>{Func.formatName(user)}</Text>

                    <Spacer />

                    <Button mode='outlined' icon='pencil' t='Edit Profile' onPress={this.handleEditProfile} />
                </View>

                <View style={{padding:Metrics.md}}>
                    <Outline>
                        <Text sm mute>Username</Text>
                        <Text>{user.username}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Mobile No.</Text>
                        <Text>{user.mobileno}</Text>
                    </Outline>
                
                    <Outline>
                        <Text sm mute>Email address</Text>
                        <Text>{user.emailaddress}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Source of Income</Text>
                        <Text>{user.sourceofincome}</Text>
                    </Outline>

                    <Outline>
                        <Text md>Birthday</Text>
                        <Row ar>
                            <View>
                                <Text sm mute>Month</Text>
                                <Text md>{moment(user.birthdate).format('MMMM')}</Text>
                            </View>
                            <View>
                                <Text sm mute>Day</Text>
                                <Text md>{moment(user.birthdate).format('DD')}</Text>
                            </View>
                            <View>
                                <Text sm mute>Year</Text>
                                <Text md>{moment(user.birthdate).format('YYYY')}</Text>
                            </View>
                        </Row>
                    </Outline>

                    <Outline>
                        <Text sm mute>Gender</Text>
                        <Text>{user.gender}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Nationality</Text>
                        <Text>{user.nationality}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Country</Text>
                        <Text>{user.country}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Province</Text>
                        <Text>{user.province}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>City/Municipality</Text>
                        <Text>{user.city}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Barangay</Text>
                        <Text>{user.barangay}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Street</Text>
                        <Text>{user.street}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>House/Unit/Floor #, Bldg Name, Block or Lot #</Text>
                        <Text>{user.houseno}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Zip Code</Text>
                        <Text>{user.zipcode}</Text>
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