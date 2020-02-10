import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Screen, Headline, FlatList, Text, Button, ButtonText, Spacer, TextInput, Row, Footer, Radio, HR, StaticInput, SignUpStepsTracker, MonthPicker, DayPicker, YearPicker} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'
import {Provider, RadioButton} from 'react-native-paper'

const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Personal Info'
    }

    state = {
        firstname:'',
        middlename:'',
        lastname:'',
        bday_month:null,
        bday_day:null,
        bday_year:null,
        gender:'male',
        email:'',
        nationality:'',
        source_of_incode:'',
        showMonthPicker:false,
        showDayPicker:false,
        showYearPicker:false,
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

    handleFocusMiddlename = () => this.refs.middlename.focus()

    handleFocusLastname = () => this.refs.lastname.focus()

    handleFocusEmail = () => this.refs.email.focus()

    handleFocusNationality = () => this.refs.nationality.focus()

    handleFocusSourceOfIncome = () => this.refs.source_of_income.focus()

    handleSubmit = async () => {
        let {firstname, middlename, lastname, bday_month, bday_day, bday_year, gender, email, nationality, source_of_income, processing} = this.state

        if(processing) return false

        try {
            firstname = firstname.trim()
            middlename = middlename.trim()
            lastname = lastname.trim()
            email = email.trim()
            nationality = nationality.trim()
            source_of_income = source_of_income.trim()

            if(firstname == '' || middlename == '' || lastname == '' || nationality == '' || source_of_income == '') Say.some(_('8'))
            else {
                this.props.navigation.navigate('SignUpStep2')
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

        const {firstname, middlename, lastname, bday_month, bday_day, bday_year, gender, email, nationality, source_of_income, showMonthPicker, showDayPicker, showYearPicker, processing} = this.state
        let ready = false

        if(firstname && middlename && lastname && bday_month && bday_day && bday_year && nationality && source_of_income) {
            ready = true
        }

        return (
            <Provider>
                <Screen>
                    
                    <SignUpStepsTracker step={1} />

                    <Headline subtext='Enter your complete personal details for your account' />

                    <TextInput
                        ref='firstname'
                        label={'First Name'}
                        value={firstname}
                        onChangeText={this.handleChangeFirstname}
                        onSubmitEditing={this.handleFocusMiddlename}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='middlename'
                        label={'Middle Name'}
                        value={middlename}
                        onChangeText={this.handleChangeMiddlename}
                        onSubmitEditing={this.handleFocusLastname}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='lastname'
                        label={'Last Name'}
                        value={lastname}
                        onChangeText={this.handleChangeLastname}
                        onSubmitEditing={this.handleFocusEmail}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <Spacer sm />

                    <Text md mute>Birthday</Text>
                    <Spacer xs />
                    <Row bw>
                        <StaticInput
                            label='Month'
                            value={bday_month ? moment(bday_month,'M').format('MMM') : null}
                            onPress={this.handleChangeMonth}
                            style={{flex:2}}
                        />
                        <Spacer h xs/>
                        <StaticInput
                            label='Day'
                            value={bday_day}
                            onPress={this.handleChangeDay}
                            style={{flex:1}}
                        />
                        <Spacer h xs/>
                        <StaticInput
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

                    <TextInput
                        ref='email'
                        label={'Email address (optional)'}
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        onSubmitEditing={this.handleFocusNationality}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='nationality'
                        label={'Nationality'}
                        value={nationality}
                        onChangeText={this.handleChangeNationality}
                        onSubmitEditing={this.handleFocusSourceOfIncome}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='source_of_income'
                        label={'Source of Income'}
                        value={source_of_income}
                        onChangeText={this.handleChangeSourceOfIncome}
                        autoCapitalize='words'
                    />

                </Screen>
            
                <Footer>
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