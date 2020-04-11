import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Screen, Footer, Headline, ScrollFix, Text, Button, Spacer, Row, Checkbox, TextInput, DynamicStaticInput, StaticInput, SignUpStepsTracker, Radio, MonthPicker, DayPicker, YearPicker, Picker} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {Metrics} from '../themes'
import {Provider, RadioButton} from 'react-native-paper'

const moment = require('moment')

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Review Information'
    }

    state = {
        ...this.props.navigation.state.params,
        editable:false,
        showMonthPicker:false,
        showDayPicker:false,
        showYearPicker:false,
        agree:false,
        processing:false
    }

    componentDidMount = () => {
        this.props.navigation.setParams({
            nationality:null,
            country:null,
            province:null,
            city:null,
            source_of_income:null
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.nationality && params.nationality !== prevState.nationality) {
            this.props.navigation.setParams({nationality:null})
            this.setState({nationality:params.nationality})
        }

        else if(params.country && params.country !== prevState.country) {
            this.props.navigation.setParams({country:null})
            this.setState({
                country:params.country,
                province:{
                    province:'',
                    provCode:''
                },
                city:'',
                zip_code:''
            })
        }

        else if(params.province && params.province.province !== prevState.province.province) {
            this.props.navigation.setParams({province:null})
            this.setState({
                province:{
                    ...params.province
                },
                city:''
            })
        }

        else if(params.city && params.city.city !== prevState.city) {
            this.props.navigation.setParams({city:null})
            this.setState({
                city:params.city.city,
                zip_code:params.city.zipCode
            })
        }

        else if(params.source_of_income && params.source_of_income !== prevState.source_of_income) {
            this.props.navigation.setParams({source_of_income:null})
            this.setState({source_of_income:params.source_of_income})
        }
    }

    handleChangeFirstname = firstname => this.setState({firstname})

    handleChangeMiddlename = middlename => this.setState({middlename})

    handleToggleHasMiddlename = () => {
        this.setState(prevState => ({
            middlename:prevState.has_middlename ? _('50') : '',
            has_middlename:!prevState.has_middlename
        }))
    }

    handleChangeLastname = lastname => this.setState({lastname})

    handleChangeSuffix = (option = {}) => this.setState({suffix:option.label || ''})

    handleChangeSuffixOthers = other_suffix => this.setState({other_suffix})

    handleToggleHasSuffix = () => {
        this.setState(prevState => ({
            suffix:prevState.has_suffix ? _('51') : '',
            has_suffix:!prevState.has_suffix
        }))
    }

    handleChangeMonth = () => this.setState({showMonthPicker:true})

    handleHideMonthPicker = () => this.setState({showMonthPicker:false})

    handleChangeDay = () => this.setState({showDayPicker:true})

    handleHideDayPicker = () => this.setState({showDayPicker:false})

    handleChangeYear = () => this.setState({showYearPicker:true})

    handleHideYearPicker = () => this.setState({showYearPicker:false})

    handleSelectGender = gender => this.setState({gender})

    handleChangeEmail = email => this.setState({email})

    handleChangeNationality = nationality => this.setState({nationality})

    handleSelectNationality = () => {
        const {state, navigate} = this.props.navigation
        navigate('Nationalities',{sourceRoute:state.routeName})
    }

    handleSelectSourceOfIncome = () => {
        const {state, navigate} = this.props.navigation
        navigate('SourceOfIncome',{sourceRoute:state.routeName})
    }

    handleChangeSourceOfIncome = source_of_income => this.setState({source_of_income})

    handleFocusMiddlename = () => this.state.has_middlename ? this.refs.middlename.focus() : this.refs.lastname.focus()

    handleFocusLastname = () => this.refs.lastname.focus()

    handleFocusEmail = () => this.refs.email.focus()

    handleFocusNationality = () => this.refs.nationality.focus()

    handleFocusSourceOfIncome = () => this.refs.source_of_income.focus()

    handleSelectMonth = bday_month => this.setState({bday_month, bday_day:''})

    handleSelectDay = bday_day => this.setState({bday_day})

    handleSelectYear = bday_year => this.setState({bday_year})

    handleChangeHouse = house => this.setState({house})

    handleChangeStreet = street => this.setState({street})

    handleSelectCountry = () => {
        const {state, navigate} = this.props.navigation
        navigate('Countries',{sourceRoute:state.routeName})
    }

    handleSelectProvince = () => {
        const {state, navigate} = this.props.navigation
        navigate('Provinces',{sourceRoute:state.routeName, country:this.state.country})
    }

    handleSelectCity = () => {
        const {state, navigate} = this.props.navigation
        navigate('Cities',{sourceRoute:state.routeName, province:this.state.province})
    }

    handleChangeBarangay = barangay => this.setState({barangay})

    handleFocusBarangay = () => this.refs.barangay.focus()

    handleFocusStreet = () => this.refs.street.focus()

    handleFocusHouse = () => this.refs.houseno.focus()

    handleViewTerms = () => this.props.navigation.navigate('TermsAndConditions')

    handleToggleTerms = () => this.setState(prevState => ({agree:!prevState.agree}))

    handleToggleEdit = () => {
        const {editable} = this.state

        if(editable) {
            let res = this.validate()
            if(res) this.setState({editable:false})
        }
        else {
            this.setState({editable:true})
        }
    }

    validate = () => {
        let {firstname, middlename, lastname, suffix, other_suffix, bday_month, bday_day, bday_year, gender, email, nationality, source_of_income, house, street, country, province, city, barangay, zip_code, question1, answer1, question2, answer2, question3, answer3} = this.state

        try {
            firstname = firstname.trim()
            middlename = middlename.trim()
            lastname = lastname.trim()
            suffix = suffix.trim()
            other_suffix = other_suffix.trim()
            email = email.trim()
            source_of_income = source_of_income.trim()
            house = house.trim()
            street = street.trim()
            barangay = barangay.trim()
            zip_code = zip_code.trim()

            suffix = other_suffix || suffix

            if(suffix == 'Others') suffix = ''
            let birthday = `${bday_year}-${bday_month}-${bday_day}`

            if(!firstname || !middlename || !lastname || !bday_day || !source_of_income) Say.some(_('8'))
            else if(country == Consts.country.PH && (!province.province || !city || !barangay || !zip_code)) Say.some(_('8'))
            else if(!Func.isLettersOnly(firstname)) Say.warn(Consts.error.onlyLetters + '\n\nFirst Name')
            else if(!Func.isLettersOnly(middlename)) Say.warn(Consts.error.onlyLetters + '\n\nMiddle Name')
            else if(!Func.isLettersOnly(lastname)) Say.warn(Consts.error.onlyLetters + '\n\nLast Name')
            else if(!Func.isDateValid(birthday)) Say.warn(Consts.error.birthdate)
            else if(email && !Func.hasEmailSpecialCharsOnly(email)) Say.warn(Consts.error.notAllowedChar + '\n\nEmail')
            else if(email && !Func.isEmail(email)) Say.warn(Consts.error.email)
            else if(barangay && !Func.hasAddressSpecialCharsOnly(barangay)) Say.warn(Consts.error.notAllowedChar + '\n\nBarangay')
            else if(street && !Func.hasAddressSpecialCharsOnly(street)) Say.warn(Consts.error.notAllowedChar + '\n\nStreet')
            else if(house && !Func.hasAddressSpecialCharsOnly(house)) Say.warn(Consts.error.notAllowedChar + '\n\nHouse/Unit/Floor...: ')
            else {
                return {
                    ...this.props.navigation.state.params,
                    firstname,
                    middlename,
                    lastname,
                    suffix,
                    email,
                    gender,
                    source_of_income,
                    birthday,
                    nationality,
                    house,
                    street,
                    country,
                    province:province.province,
                    provincecode:province.provCode,
                    city,
                    barangay,
                    zip_code,
                    question1,
                    answer1,
                    question2,
                    answer2,
                    question3,
                    answer3
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    handleSubmit = async () => {
        let res = this.validate()
        if(res) this.props.navigation.navigate('SignUpVerificationMobile',res)
    }

    render() {  

        const {firstname, middlename, has_middlename, lastname, suffix, other_suffix, has_suffix, suffix_options, bday_month, bday_day, bday_year, gender, email, nationality, source_of_income,
            country, province, city, barangay, house, street, zip_code, editable, showMonthPicker, showDayPicker, showYearPicker, agree, processing} = this.state

        let ready = true

        if(firstname && middlename && lastname && suffix && bday_day && nationality && source_of_income && barangay && zip_code && agree) {
            ready = true
        }

        if(!firstname || !middlename || !lastname || !suffix || !bday_day || !source_of_income || !agree) ready = false

        if(country == Consts.country.PH && (!province.province || !city || !barangay || !zip_code)) ready = false


        return (
            <Provider>
                <Screen>
                    <SignUpStepsTracker step={4} />

                    <Headline subtext='Make sure all the details are correct.' />

                    {!editable &&
                    <ScrollFix style={{paddingBottom:Metrics.xl}}>
                        <Text sm mute center>First Name</Text>
                        <Text md center>{firstname}</Text>

                        <Spacer sm />

                        <Text sm mute center>Middle Name</Text>
                        <Text md center>{middlename}</Text>

                        <Spacer sm />

                        <Text sm mute center>Last Name</Text>
                        <Text md center>{lastname}</Text>

                        <Spacer sm />

                        <Text sm mute center>Suffix</Text>
                        <Text md center>{suffix}</Text>

                        <Spacer sm />

                        <Text sm mute center>Birthday: </Text>
                        <Text md center>{moment(bday_month,'MM').format('MMMM')} {moment(bday_day,'DD').format('DD')}, {moment(bday_year,'YYYY').format('YYYY')}</Text>

                        <Spacer sm />

                        <Text sm mute center>Gender</Text>
                        <Text md center>{gender}</Text>

                        <Spacer sm />

                        {email != '' && <Text center md>{email}</Text>}

                        <Text sm mute center>Nationality</Text>
                        <Text md center>{nationality}</Text>

                        <Spacer sm />

                        <Text sm mute center>Source of Income</Text>
                        <Text md center>{source_of_income}</Text>
                        
                        <Spacer sm />

                        <Text sm mute center>Address</Text>
                        <Text md center>{Func.formatAddress(this.state)}</Text>
                        
                        {country == Consts.country.PH &&
                        <>
                            <Spacer sm />
                            
                            <Text sm mute center>Zip Code</Text>
                            <Text md center>{zip_code}</Text>
                        </>
                        }
                    </ScrollFix>
                    }

                    {editable &&
                    <>
                        <TextInput
                            ref='firstname'
                            label={'First Name'}
                            value={firstname}
                            onChangeText={this.handleChangeFirstname}
                            onSubmitEditing={this.handleFocusMiddlename}
                            autoCapitalize='words'
                            returnKeyType='next'
                        />

                        <DynamicStaticInput
                            ref='middlename'
                            editable={has_middlename}
                            label={'Middle Name'}
                            value={middlename}
                            onChangeText={this.handleChangeMiddlename}
                            onSubmitEditing={this.handleFocusLastname}
                            autoCapitalize='words'
                            returnKeyType='next'
                        />

                        <Checkbox
                            status={!has_middlename}
                            onPress={this.handleToggleHasMiddlename}
                            label="I don't have a middle name"
                            labelStyle={{fontSize:Metrics.font.sm}}
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

                        <Picker
                            editable={has_suffix}
                            selected={suffix}
                            items={suffix_options}
                            placeholder='Suffix'
                            onChoose={this.handleChangeSuffix}
                        />

                        {suffix === 'Others' &&
                        <TextInput
                            label={'Enter custom suffix'}
                            value={other_suffix}
                            onChangeText={this.handleChangeSuffixOthers}
                        />
                        }

                        <Checkbox
                            status={!has_suffix}
                            onPress={this.handleToggleHasSuffix}
                            label="Not applicable"
                            labelStyle={{fontSize:Metrics.font.sm}}
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
                                <Radio value='Male' label={_('43')} />
                                <Spacer h lg />
                                <Radio value='Female' label={_('44')} />
                            </Row>
                        </RadioButton.Group>

                        <Spacer sm />

                        <TextInput
                            ref='email'
                            label={'Email address'}
                            value={email}
                            onChangeText={this.handleChangeEmail}
                            onSubmitEditing={this.handleFocusBarangay}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            returnKeyType='next'
                        />

                        <StaticInput
                            label='Nationality'
                            value={nationality}
                            onPress={this.handleSelectNationality}
                        />

                        <StaticInput
                            label='Source of Income'
                            value={source_of_income}
                            onPress={this.handleSelectSourceOfIncome}
                        />

                        <StaticInput
                            label='Country'
                            value={country}
                            onPress={this.handleSelectCountry}
                        />

                        {country == Consts.country.PH &&
                        <>
                            <StaticInput
                                label='Province'
                                value={province.province}
                                onPress={this.handleSelectProvince}
                            />

                            <StaticInput
                                label='City/Municipality'
                                value={city}
                                onPress={this.handleSelectCity}
                            />

                            <TextInput
                                ref='barangay'
                                label={'Barangay'}
                                value={barangay}
                                onChangeText={this.handleChangeBarangay}
                                onSubmitEditing={this.handleFocusStreet}
                                autoCapitalize='words'
                                returnKeyType='next'
                            />
                        </>
                        }

                        <TextInput
                            ref='street'
                            label={'Street'}
                            value={street}
                            onChangeText={this.handleChangeStreet}
                            onSubmitEditing={this.handleFocusHouse}
                            returnKeyType='next'
                        />

                        <TextInput
                            ref='houseno'
                            label={'House/Unit/Floor #, Bldg Name, Block or Lot #'}
                            value={house}
                            onChangeText={this.handleChangeHouse}
                            onSubmitEditing={this.handleFocusZipCode}
                            autoCapitalize='none'
                            returnKeyType='next'
                        />

                        {country === Consts.country.PH &&
                        <StaticInput
                            label='Zip Code'
                            value={zip_code}
                        />
                        }
                    </>
                    }
                </Screen>
            
                <Footer>
                    <Button mode='outlined' t={`${editable ? 'Save' : 'Edit'} Information`} onPress={this.handleToggleEdit} />
                    {!editable &&
                    <>
                        <Spacer />

                        <Row c>
                            <Checkbox status={agree} onPress={this.handleToggleTerms} />
                            <Text sm>I have read and agree to the </Text>
                        </Row>

                        <TouchableOpacity onPress={this.handleViewTerms}>
                            <Text brand b center>Terms and Conditions</Text>
                        </TouchableOpacity>

                        <Spacer />

                        <Button disabled={!ready || showMonthPicker || showDayPicker || showYearPicker} t={_('62')} onPress={this.handleSubmit} loading={processing} />
                    </>
                    }
                </Footer>

                <MonthPicker visible={showMonthPicker} onSelect={this.handleSelectMonth} onDismiss={this.handleHideMonthPicker} />

                <DayPicker month={bday_month} visible={showDayPicker} onSelect={this.handleSelectDay} onDismiss={this.handleHideDayPicker} />

                <YearPicker visible={showYearPicker} onSelect={this.handleSelectYear} onDismiss={this.handleHideYearPicker} />
            </Provider>
        )
    }
}