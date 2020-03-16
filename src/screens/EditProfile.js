import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, Avatar, TopBuffer, Button, TextInput, Outline} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'

const moment = require('moment')

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Profile'
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
        zip_code:'6045',
        processing:false
    }
    
    handleChangeMobileNo = mobile_no => this.setState({mobile_no})

    handleChangeEmail = email => this.setState({email})

    handleChangeSourceIncome = source_income => this.setState({source_income})

    handleChangeCountry = () => this.props.navigation.navigate('Countries')

    handleChangeProvince = () => this.props.navigation.navigate('Provinces',{country:this.state.country})

    handleChangeCity = () => this.props.navigation.navigate('Cities',{province:this.state.province})

    handleChangeBarangay = barangay => this.setState({barangay})

    handleChangeZipCode = zip_code => this.setState({zip_code})

    handleSave = async () => {
        let {mobile_no, email, source_income, processing} = this.state

        if(processing) return

        try {

            this.setState({processing:true})

            mobile_no = mobile_no.trim()
            email = email.trim()
            source_income = source_income.trim()

            Say.ok("You've successfully saved your Profile details")
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {avatar, username, firstname, lastname, wallet_no, address, mobile_no, email, source_income, birthday, gender, country, province, city, barangay, zip_code, processing} = this.state

        return (
            <ScrollView>
                
                <TopBuffer sm />

                <View style={style.topContainer}>
                    <Avatar source={avatar} size={Metrics.image.lg} />
                    <Text b lg center>{firstname} {lastname}</Text>
                </View>

                <View style={style.inputContainer}>
                    <Outline>
                        <Text sm gray>Username</Text>
                        <Text gray>{username}</Text>
                    </Outline>

                    <TextInput
                        value={mobile_no}
                        label='Mobile No.'
                        onChangeText={this.handleChangeMobileNo}
                        keyboardType='numeric'
                    />

                    <TextInput
                        value={email}
                        label='Email address'
                        onChangeText={this.handleChangeEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />

                    <TextInput
                        value={source_income}
                        label='Source of Income'
                        onChangeText={this.handleChangeSourceIncome}
                    />

                    <Outline>
                        <Text md gray>Birthday</Text>
                        <Row ar>
                            <View>
                                <Text sm gray>Month</Text>
                                <Text md gray>{moment(birthday).format('MMMM')}</Text>
                            </View>
                            <View>
                                <Text sm gray>Day</Text>
                                <Text md gray>{moment(birthday).format('DD')}</Text>
                            </View>
                            <View>
                                <Text sm gray>Year</Text>
                                <Text md gray>{moment(birthday).format('YYYY')}</Text>
                            </View>
                        </Row>
                    </Outline>

                    <Outline>
                        <Text sm gray>Gender</Text>
                        <Text gray>{gender}</Text>
                    </Outline>

                    <TouchableOpacity onPress={this.handleChangeCountry}>
                        <Outline>
                            <Text sm mute>Country</Text>
                            <Text>{country}</Text>
                        </Outline>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleChangeProvince}>
                        <Outline>
                            <Text sm mute>Province</Text>
                            <Text>{province}</Text>
                        </Outline>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleChangeCity}>
                        <Outline>
                            <Text sm mute>City/Municipality</Text>
                            <Text>{city}</Text>
                        </Outline>
                    </TouchableOpacity>

                    <TextInput
                        value={barangay}
                        label='Barangay/Street'
                        onChangeText={this.handleChangeBarangay}
                    />

                    <TextInput
                        value={zip_code}
                        label='Zip Code'
                        onChangeText={this.handleChangeZipCode}
                        keyboardType='numeric'
                    />

                    <Spacer />

                    <Button t='Save' onPress={this.handleSave} loading={processing} />
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    topContainer: {
        alignItems:'center'
    },
    inputContainer: {
        padding:Metrics.md
    },
})