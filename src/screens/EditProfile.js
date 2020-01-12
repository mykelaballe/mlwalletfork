import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, HR, Avatar, TopBuffer, Button, TextInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const moment = require('moment')

class EditProfile extends React.Component {

    static navigationOptions = {
        title:'Edit Profile'
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
        zip_code:'6045',
        processing:false
    }
    
    handleChangeMobileNo = mobile_no => this.setState({mobile_no})

    handleChangeEmail = email => this.setState({email})

    handleChangeSourceIncome = source_income => this.setState({source_income})

    handleChangeGender = gender => this.setState({gender})

    handleChangeCountry = country => this.setState({country})

    handleChangeProvince = province => this.setState({province})

    handleChangeCity = city => this.setState({city})

    handleChangeBarangay = barangay => this.setState({barangay})

    handleChangeZipCode = zip_code => this.setState({zip_code})

    handleSave = async () => {
        const {mobile_no, email, source_income, gender, processing} = this.state

        if(processing) return

        try {

            this.setState({processing:true})

            mobile_no = mobile_no.trim()
            email = email.trim()
            source_income = source_income.trim()

            this.setState({processing:false})
            Say.ok('Success')
            this.props.navigation.pop()
        }
        catch(err) {
            this.setState({processing:false})
        }
    }

    render() {

        const {avatar, firstname, lastname, wallet_no, address, mobile_no, email, source_income, birthday, gender, country, province, city, barangay, zip_code} = this.state

        return (
            <ScrollView>
                <TopBuffer sm />

                <View style={style.topContainer}>
                    <Avatar source={avatar} size={Metrics.image.lg} />
                    <Text b lg center>{firstname} {lastname}</Text>
                </View>

                <View style={style.inputContainer}>
                    <TextInput
                        style={style.input}
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

                    <TextInput
                        value={gender}
                        label='Gender'
                        onChangeText={this.handleChangeGender}
                    />

                    <TextInput
                        value={country}
                        label='Country'
                        onChangeText={this.handleChangeCountry}
                    />

                    <TextInput
                        value={province}
                        label='Province'
                        onChangeText={this.handleChangeProvince}
                    />

                    <TextInput
                        value={city}
                        label='City'
                        onChangeText={this.handleChangeCity}
                    />

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

                    <Button t='Save' onPress={this.handleSave} />
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
        paddingHorizontal:Metrics.md
    },
    input: {
        marginBottom:Metrics.rg
    }
})

export default EditProfile