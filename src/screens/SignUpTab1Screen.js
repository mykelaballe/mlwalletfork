import React from 'react'
import {StyleSheet, View, ScrollView, Picker} from 'react-native'
import {Text, Button, TextInput, Row, Spacer, HR} from '../components'
import {Colors, Metrics} from '../themes'
import {RadioButton} from 'react-native-paper'

class SignUpTab1Screen extends React.Component {

    state = {
        firstname:'',
        middlename:'',
        lastname:'',
        email:'',
        country:'',
        province:'',
        city:'',
        barangay:'',
        zip_code:'',
        gender:'Male',
        wallet_name:''
    }

    handleNext = () => {
        this.props.navigation.navigate('SignUpTab2')
    }

    handleChangeFirstName = firstname => this.setState({firstname})

    handleChangeMiddleName = middlename => this.setState({middlename})

    handleChangeLastName = lastname => this.setState({lastname})

    handleChangeEmail = email => this.setState({email})

    handleChangeCountry = country => this.setState({country})

    handleChangeProvince = province => this.setState({province})

    handleChangeCity = city => this.setState({city})

    handleChangeBarangay = barangay => this.setState({barangay})

    handleChangeZipCode = zip_code => this.setState({zip_code})

    handleChangeGender = gender => this.setState({gender})

    handleChangeWalletName = wallet_name => this.setState({wallet_name})

    render() {

        const {firstname, middlename, lastname, email, country, province, city, barangay, zip_code, gender, wallet_name} = this.state

        return (
            <View style={{flex:1}}>
                <View style={{backgroundColor:Colors.dark,padding:Metrics.rg}}>
                    <Text center b light>Profile Information</Text>
                </View>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                    <View style={{flex:1,padding:Metrics.md}}>
                        <TextInput
                            label='First Name'
                            value={firstname}
                            onChangeText={this.handleChangeFirstName}
                            autoCapitalize='words'
                        />

                        <TextInput
                            label='Middle Name'
                            value={middlename}
                            onChangeText={this.handleChangeMiddleName}
                            autoCapitalize='words'
                        />

                        <TextInput
                            label='Last Name'
                            value={lastname}
                            onChangeText={this.handleChangeLastName}
                            autoCapitalize='words'
                        />

                        <TextInput
                            label='Email'
                            value={email}
                            onChangeText={this.handleChangeEmail}
                            autoCapitalize='none'
                            keyboardType='email-address'
                        />

                        <Spacer sm />

                        <Row>
                            <Text md style={style.pickerLabel}>Country</Text>
                            <Spacer h />
                            <Picker
                                style={{flex:1}}
                                selectedValue={country}
                                onValueChange={this.handleChangeCountry}
                                prompt='Country'
                            >
                                <Picker.Item key={0} label='Philippines' value={'Philippines'} />
                                <Picker.Item key={1} label='Polan' value={'Polan'} />
                                <Picker.Item key={2} label='Portugal' value={'Portugal'} />
                                <Picker.Item key={3} label='Qatar' value={'Qatar'} />
                                <Picker.Item key={4} label='Romania' value={'Romania'} />
                                <Picker.Item key={5} label='Russia' value={'Russia'} />
                            </Picker>
                        </Row>

                        <Row>
                            <Text md style={style.pickerLabel}>Province</Text>
                            <Spacer h />
                            <Picker
                                style={{flex:1}}
                                selectedValue={province}
                                onValueChange={this.handleChangeProvince}
                                prompt='Province'
                            >
                                <Picker.Item key={0} label='Cebu' value={'Cebu'} />
                                <Picker.Item key={1} label='Cotabato' value={'Cotabato'} />
                            </Picker>
                        </Row>

                        <Row>
                            <Text md style={style.pickerLabel}>City</Text>
                            <Spacer h />
                            <Picker
                                style={{flex:1}}
                                selectedValue={city}
                                onValueChange={this.handleChangeCity}
                                prompt='City'
                            >
                                <Picker.Item key={0} label='Alcantara' value={'Alcantara'} />
                                <Picker.Item key={1} label='Alcoy' value={'Alcoy'} />
                                <Picker.Item key={2} label='Alegria' value={'Alegria'} />
                                <Picker.Item key={3} label='Aloguinsan' value={'Aloguinsan'} />
                                <Picker.Item key={4} label='Argao' value={'Argao'} />
                            </Picker>
                        </Row>

                        <TextInput
                            label='Barangay / Street'
                            value={barangay}
                            onChangeText={this.handleChangeBarangay}
                            autoCapitalize='words'
                        />

                        <TextInput
                            label='Zip Code'
                            value={zip_code}
                            onChangeText={this.handleChangeZipCode}
                            keyboardType='numeric'
                        />

                        <Spacer sm />

                        <Row>
                            <Text md style={style.pickerLabel}>Gender</Text>
                            <Spacer h />
                            <Row>
                                <RadioButton.Group onValueChange={this.handleChangeGender} value={gender}>
                                    <RadioButton value='Male' />
                                    <Text md>Male</Text>

                                    <RadioButton value='Female' />
                                    <Text md>Female</Text>
                                </RadioButton.Group>
                            </Row>
                        </Row>

                        <TextInput
                            label='Wallet Name'
                            value={wallet_name}
                            onChangeText={this.handleChangeWalletName}
                        />
                    </View>
                </ScrollView>

                <View style={{padding:Metrics.rg}}>
                    <Button dark t='Next' onPress={this.handleNext} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    pickerLabel: {
        width:100,
        paddingLeft:Metrics.rg
    }
})

export default SignUpTab1Screen