import React from 'react'
import {Provider, Screen, Headline, Text, Checkbox, Button, Spacer, TextInput, Row, Footer, Radio, DynamicStaticInput, StaticInput, SignUpStepsTracker, Picker, MonthPicker, DayPicker, YearPicker} from '../components'
import {_, Say, Func, Consts} from '../utils'
import {RadioButton} from 'react-native-paper'
import {Metrics} from '../themes'

const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Personal Information'
    }

    state = {
        firstname:'',
        middlename:'',
        has_middlename:true,
        lastname:'',
        suffix:'NONE',
        other_suffix:'',
        has_suffix:false,
        suffix_options:[
            {label:'Jr.'},
            {label:'Sr.'},
            {label:'I'},
            {label:'II'},
            {label:'III'},
            {label:'IV'},
            {label:'V'},
            {label:'Others'}
        ],
        bday_month:'',
        bday_day:'',
        bday_year:'',
        gender:'Male',
        email:'',
        nationality:'Filipino',
        source_of_income:'',
        showMonthPicker:false,
        showDayPicker:false,
        showYearPicker:false,
        processing:false,
        error_firstname:false,
        error_middlename:false,
        error_lastname:false,
        error_suffix:false,
        error_bday_month:false,
        error_bday_day:false,
        error_bday_year:false,
        error_source_of_income:false
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.nationality && params.nationality !== prevState.nationality) {
            this.props.navigation.setParams({nationality:null})
            this.setState({nationality:params.nationality})
        }

        if(params.source_of_income && params.source_of_income !== prevState.source_of_income) {
            this.props.navigation.setParams({source_of_income:null})
            this.setState({
                source_of_income:params.source_of_income,
                error_source_of_income:false
            })
        }
    }

    handleChangeFirstname = firstname => this.setState({firstname,error_firstname:false})

    handleChangeMiddlename = middlename => this.setState({middlename,error_middlename:false})

    handleToggleHasMiddlename = () => {
        this.setState(prevState => ({
            middlename:prevState.has_middlename ? _('50') : '',
            has_middlename:!prevState.has_middlename,
            error_middlename:false
        }))
    }

    handleChangeLastname = lastname => this.setState({lastname,error_lastname:false})

    handleChangeSuffix = (option = {}) => this.setState({suffix:option.label || '',error_suffix:false})

    handleChangeSuffixOthers = other_suffix => this.setState({other_suffix,error_suffix:false})

    handleToggleHasSuffix = () => {
        this.setState(prevState => ({
            suffix:prevState.has_suffix ? _('51') : '',
            has_suffix:!prevState.has_suffix,
            error_suffix:false
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

    handleFocusMiddlename = () => this.state.has_middlename ? this.refs.middlename.focus() : this.refs.lastname.focus()

    handleFocusLastname = () => this.refs.lastname.focus()

    handleFocusEmail = () => this.refs.email.focus()

    handleFocusNationality = () => this.refs.nationality.focus()

    handleFocusSourceOfIncome = () => this.refs.source_of_income.focus()

    handleSelectMonth = bday_month => this.setState({bday_month, bday_day:'', error_bday_month:false})

    handleSelectDay = bday_day => this.setState({bday_day, error_bday_day:false})

    handleSelectYear = bday_year => this.setState({bday_year, error_bday_year:false})

    handleSubmit = async () => {
        let {firstname, middlename, has_middlename, lastname, suffix, other_suffix, has_suffix, suffix_options, bday_month, bday_day, bday_year, gender, email, nationality, source_of_income} = this.state

        try {
            firstname = firstname.trim()
            middlename = middlename.trim()
            lastname = lastname.trim()
            email = email.trim()
            nationality = nationality.trim()
            source_of_income = source_of_income.trim()
            suffix = suffix.trim()
            other_suffix = other_suffix.trim()

            suffix = other_suffix || suffix

            if(suffix == 'Others') suffix = ''

            if(!firstname || !middlename || !lastname || !suffix || !bday_month || !bday_day || !bday_year || !source_of_income) {
                if(!firstname) this.setState({error_firstname:true})
                if(!middlename) this.setState({error_middlename:true})
                if(!lastname) this.setState({error_lastname:true})
                if(!suffix) this.setState({error_suffix:true})
                if(!bday_month) this.setState({error_bday_month:true})
                if(!bday_day) this.setState({error_bday_day:true})
                if(!bday_year) this.setState({error_bday_year:true})
                if(!source_of_income) this.setState({error_source_of_income:true})

                Say.some('Fill-out missing fields to proceed')
            }
            else if(!Func.isLettersOnly(firstname)) {
                this.setState({error_firstname:true})
                Say.warn(Consts.error.onlyLetters)
            }
            else if(!Func.isLettersOnly(middlename)) {
                this.setState({error_middlename:true})
                Say.warn(Consts.error.onlyLetters)
            }
            else if(!Func.isLettersOnly(lastname)) {
                this.setState({error_lastname:true})
                Say.warn(Consts.error.onlyLetters)
            }
            else if(email && !Func.hasEmailSpecialCharsOnly(email)) Say.warn(Consts.error.notAllowedChar + '\n\nEmail')
            else {
                this.props.navigation.navigate('SignUpStep2',{
                    ...this.props.navigation.state.params,
                    firstname,
                    middlename,
                    has_middlename,
                    lastname,
                    gender,
                    email,
                    nationality,
                    source_of_income,
                    suffix,
                    other_suffix,
                    has_suffix,
                    suffix_options,
                    bday_day,
                    bday_month,
                    bday_year
                })
            }
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    render() {

        const {firstname, middlename, has_middlename, lastname, suffix, other_suffix, has_suffix, suffix_options, bday_month, bday_day, bday_year, gender, email, nationality, source_of_income, showMonthPicker, showDayPicker, showYearPicker, processing} = this.state
        const {error_firstname, error_middlename, error_lastname, error_suffix, error_bday_month, error_bday_day, error_bday_year, error_source_of_income} = this.state
        //let ready = false
        let ready = true

        /*if(firstname && middlename && lastname && suffix && bday_month && bday_day && bday_year && nationality && source_of_income) {
            ready = true
        }*/

        return (
            <Provider>
                <Screen>
                    
                    <SignUpStepsTracker step={1} />

                    <Headline subtext='Enter your complete, personal details below' />

                    <TextInput
                        ref='firstname'
                        label={'First Name'}
                        value={firstname}
                        error={error_firstname}
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
                        error={error_middlename}
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
                        error={error_lastname}
                        onChangeText={this.handleChangeLastname}
                        onSubmitEditing={this.handleFocusEmail}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <Picker
                        editable={has_suffix}
                        selected={suffix}
                        error={error_suffix}
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
                            error={error_bday_month}
                            onPress={this.handleChangeMonth}
                            style={{flex:2}}
                        />
                        <Spacer h xs/>
                        <StaticInput
                            label='Day'
                            value={bday_day}
                            error={error_bday_day}
                            onPress={this.handleChangeDay}
                            style={{flex:1}}
                        />
                        <Spacer h xs/>
                        <StaticInput
                            label='Year'
                            value={bday_year}
                            error={error_bday_year}
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
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />

                    <StaticInput
                        label='Nationality'
                        value={nationality}
                        onPress={this.handleSelectNationality}
                    />

                    <StaticInput
                        label='Source of Income'
                        value={source_of_income}
                        error={error_source_of_income}
                        onPress={this.handleSelectSourceOfIncome}
                    />

                </Screen>
            
                <Footer>
                    <Button disabled={!ready || showMonthPicker || showDayPicker || showYearPicker} t='Next' onPress={this.handleSubmit} loading={processing} />
                </Footer>

                <MonthPicker visible={showMonthPicker} onSelect={this.handleSelectMonth} onDismiss={this.handleHideMonthPicker} />

                <DayPicker month={bday_month} visible={showDayPicker} onSelect={this.handleSelectDay} onDismiss={this.handleHideDayPicker} />

                <YearPicker visible={showYearPicker} onSelect={this.handleSelectYear} onDismiss={this.handleHideYearPicker} />                
            </Provider>
        )
    }
}

export default Scrn