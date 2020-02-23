import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Screen, Footer, Headline, Text, Button, Spacer, Row, Checkbox, DynamicStaticInput, StaticInput, SignUpStepsTracker, Radio, MonthPicker, DayPicker, YearPicker} from '../components'
import {Colors} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'
import {Provider, RadioButton} from 'react-native-paper'

const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Review Information'
    }

    state = {
        editable:false,
        firstname:'Juan',
        middlename:'Palayugdug',
        lastname:'Perez',
        bday_month:2,
        bday_day:6,
        bday_year:1980,
        gender:'male',
        email:'juan.palayugdog@gmail.com',
        nationality:'Filipino',
        source_of_income:'Business',
        country:'Philippines',
        province:'Cebu',
        city:'Talisay',
        barangay:'dasud',
        zip_code:'6000',
        showMonthPicker:false,
        showDayPicker:false,
        showYearPicker:false,
        agree:false,
        processing:false
    }

    handleChangeFirstname = firstname => this.setState({firstname})

    handleChangeMiddlename = middlename => this.setState({middlename})

    handleChangeLastname = lastname => this.setState({lastname})

    handleChangeMonth = () => this.setState({showMonthPicker:true})

    handleHideMonthPicker = () => this.setState({showMonthPicker:false})

    handleChangeDay = () => this.setState({showDayPicker:true})

    handleHideDayPicker = () => this.setState({showDayPicker:false})

    handleChangeYear = () => this.setState({showYearPicker:true})

    handleHideYearPicker = () => this.setState({showYearPicker:false})

    handleSelectGender = gender => this.setState({gender})

    handleChangeEmail = email => this.setState({email})

    handleChangeNationality = nationality => this.setState({nationality})

    handleChangeSourceOfIncome = source_of_income => this.setState({source_of_income})

    handleSelectCountry = () => this.props.navigation.navigate('Countries')

    handleSelectProvince = () => this.props.navigation.navigate('Provinces',{country:this.state.country})

    handleSelectCity = () => this.props.navigation.navigate('Cities',{province:this.state.province})

    handleChangeBarangay = barangay => this.setState({barangay})

    handleChangeZipCode = zip_code => this.setState({zip_code})

    handleViewTerms = () => this.props.navigation.navigate('TermsAndConditions')

    handleToggleTerms = () => this.setState(prevState => ({agree:!prevState.agree}))

    handleToggleEdit = () => this.setState(prevState => ({editable:!prevState.editable}))

    handleFocusMiddlename = () => this.refs.middlename.focus()

    handleFocusLastname = () => this.refs.lastname.focus()

    handleFocusEmail = () => this.refs.email.focus()

    handleFocusNationality = () => this.refs.nationality.focus()

    handleFocusSourceOfIncome = () => this.refs.source_of_income.focus()

    handleFocusBarangay = () => this.refs.barangay.focus()

    handleFocusZipCode = () => this.refs.zip_code.focus()

    handleSubmit = async () => {
        this.props.navigation.navigate('SignUpVerificationMobile')
        return false
        let {question1, question2, question3, answer1, answer2, answer3, processing} = this.state

        if(processing) return false

        try {
            answer1 = answer1.trim()
            answer2 = answer2.trim()
            answer3 = answer3.trim()

            if(question1 == '' || question2 == '' || question3 =='' || answer1 == '' || answer2 == '' || answer3 == '') Say.some(_('8'))
            else {
                this.props.navigation.navigate('SignUpVerification')
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleSelectMonth = bday_month => this.setState({bday_month})

    handleSelectDay = bday_day => this.setState({bday_day})

    handleSelectYear = bday_year => this.setState({bday_year})

    render() {

        const {firstname, middlename, lastname, bday_month, bday_day, bday_year, gender, email, nationality, source_of_income,
            country, province, city, barangay, zip_code, editable, showMonthPicker, showDayPicker, showYearPicker, agree, processing} = this.state

        let ready = false

        if(firstname && middlename && lastname && nationality && source_of_income && barangay && zip_code && agree) {
            ready = true
        }

        return (
            <Provider>
                <Screen>
                    <SignUpStepsTracker step={4} />

                    <Headline subtext='Make sure all the details are correct.' />

                    {!editable &&
                    <>
                        <Text center md>{firstname} {middlename} {lastname}</Text>
                        <Text center md>January 20, 1980</Text>
                        <Text center md>{gender}</Text>
                        <Text center md>{email}</Text>
                        <Text center md>{nationality}</Text>
                        <Text center md>{source_of_income}</Text>
                        <Text center md>{barangay}, {city}, {province}, {country}</Text>
                        <Text center md>{zip_code}</Text>
                    </>
                    }

                    {editable &&
                    <>
                        <DynamicStaticInput
                            editable={editable}
                            label='First Name'
                            value={firstname}
                            autoCapitalize='words'
                            onChangeText={this.handleChangeFirstname}
                            onSubmitEditing={this.handleFocusMiddlename}
                            returnKeyType='next'
                        />

                        <DynamicStaticInput
                            ref='middlename'
                            editable={editable}
                            label='Middle Name'
                            value={middlename}
                            autoCapitalize='words'
                            onChangeText={this.handleChangeMiddlename}
                            onSubmitEditing={this.handleFocusLastname}
                            returnKeyType='next'
                        />

                        <DynamicStaticInput
                            ref='lastname'
                            editable={editable}
                            label='Last Name'
                            value={lastname}
                            autoCapitalize='words'
                            onChangeText={this.handleChangeLastname}
                            onSubmitEditing={this.handleFocusEmail}
                            returnKeyType='next'
                        />

                        <Spacer sm />

                        <Text md mute>Birthday</Text>
                        <Spacer xs />
                        <Row bw>
                            <StaticInput
                                editable={editable}
                                label='Month'
                                value={bday_month ? moment(bday_month,'M').format('MMM') : null}
                                onPress={this.handleChangeMonth}
                                style={{flex:2}}
                            />
                            <Spacer h xs/>
                            <StaticInput
                                editable={editable}
                                label='Day'
                                value={bday_day}
                                onPress={this.handleChangeDay}
                                style={{flex:1}}
                            />
                            <Spacer h xs/>
                            <StaticInput
                                editable={editable}
                                label='Year'
                                value={bday_year}
                                onPress={this.handleChangeYear}
                                style={{flex:1}}
                            />
                        </Row>

                        <Spacer />

                        <Text md mute>Gender</Text>
                        <RadioButton.Group onValueChange={this.handleSelectGender} value={gender}>
                            <Row>
                                <Radio value='male' label='Male' />
                                <Spacer h lg />
                                <Radio value='female' label='Female' />
                            </Row>
                        </RadioButton.Group>

                        <Spacer sm />

                        <DynamicStaticInput
                            ref='email'
                            editable={editable}
                            label={'Email address (optional)'}
                            value={email}
                            onChangeText={this.handleChangeEmail}
                            onSubmitEditing={this.handleFocusNationality}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            returnKeyType='next'
                        />

                        <DynamicStaticInput
                            ref='nationality'
                            editable={editable}
                            label={'Nationality'}
                            value={nationality}
                            onChangeText={this.handleChangeNationality}
                            onSubmitEditing={this.handleFocusSourceOfIncome}
                            autoCapitalize='words'
                            returnKeyType='next'
                        />

                        <DynamicStaticInput
                            ref='source_of_income'
                            editable={editable}
                            label={'Source of Income'}
                            value={source_of_income}
                            onChangeText={this.handleChangeSourceOfIncome}
                            onSubmitEditing={this.handleFocusBarangay}
                            autoCapitalize='words'
                            returnKeyType='next'
                        />

                        <StaticInput
                            editable={editable}
                            label='Country'
                            value={country}
                            onPress={this.handleSelectCountry}
                            style={{flex:2}}
                        />

                        <StaticInput
                            editable={editable}
                            label='Province'
                            value={province}
                            onPress={this.handleSelectProvince}
                            style={{flex:2}}
                        />

                        <StaticInput
                            editable={editable}
                            label='City'
                            value={city}
                            onPress={this.handleSelectCity}
                            style={{flex:2}}
                        />

                        <DynamicStaticInput
                            ref='barangay'
                            editable={editable}
                            label={'Barangay/Street'}
                            value={barangay}
                            onChangeText={this.handleChangeBarangay}
                            onSubmitEditing={this.handleFocusZipCode}
                            autoCapitalize='words'
                            returnKeyType='next'
                        />

                        <DynamicStaticInput
                            ref='zip_code'
                            editable={editable}
                            label={'Zip Code'}
                            value={zip_code}
                            onChangeText={this.handleChangeZipCode}
                            keyboardType='numeric'
                        />
                    </>
                    }
                </Screen>
            
                <Footer>
                    <Button mode='outlined' t={`${editable ? 'Save' : 'Edit'} Information`} onPress={this.handleToggleEdit} />
                    
                    <Spacer />

                    <Row>
                        <Checkbox status={agree} onPress={this.handleToggleTerms} />
                        
                        <Spacer h xs />
                        
                        <Text sm>I have read and agree to the </Text>

                        <TouchableOpacity onPress={this.handleViewTerms}>
                            <Text brand b>Terms and Conditions</Text>
                        </TouchableOpacity>
                    </Row>

                    <Spacer />

                    <Button disabled={!ready} t='Next' onPress={this.handleSubmit} loading={processing} />
                </Footer>

                <MonthPicker visible={showMonthPicker} onSelect={this.handleSelectMonth} onDismiss={this.handleHideMonthPicker} />

                <DayPicker visible={showDayPicker} onSelect={this.handleSelectDay} onDismiss={this.handleHideDayPicker} />

                <YearPicker visible={showYearPicker} onSelect={this.handleSelectYear} onDismiss={this.handleHideYearPicker} />
            </Provider>
        )
    }
}

export default Scrn