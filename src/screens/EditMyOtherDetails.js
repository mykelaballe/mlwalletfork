import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, StaticInput, TextInput, Button, Checkbox, Picker, Prompt} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Other Details'
    }

    state = {
        email:this.props.user.email,
        nationality:this.props.user.nationality,
        source_of_income:this.props.user.source_of_income,
        country:this.props.user.country,
        province:this.props.user.province,
        city:this.props.user.city,
        barangay:this.props.user.barangay,
        zip_code:this.props.user.zip_code,
        processing:false,
        showSuccessModal:false
    }

    handleChangeEmail = email => this.setState({email})

    handleSelectNationality = () => this.props.navigation.navigate('Nationalities')

    handleChangeSourceOfIncome = source_of_income => this.setState({source_of_income})

    handleSelectCountry = () => this.props.navigation.navigate('Countries')

    handleSelectProvince = () => this.props.navigation.navigate('Provinces',{country:this.state.country})

    handleSelectCity = () => this.props.navigation.navigate('Cities',{province:this.state.province})

    handleChangeBarangay = barangay => this.setState({barangay})

    handleChangeZipCode = zip_code => this.setState({zip_code})

    handleFocusSourceOfIncome = () => this.refs.source_of_income.focus()

    handleFocusBarangay = () => this.refs.barangay.focus()

    handleFocusZipCode = () => this.refs.zip_code.focus()

    handleSubmit = async () => {
        try {
            let {email, nationality, source_of_income, country, province, city, barangay, zip_code, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            email = email.trim()
            source_of_income = source_of_income.trim()
            barangay = barangay.trim()
            zip_code = zip_code.trim()

            if(!source_of_income || !barangay || !zip_code) Say.some(_('8'))
            else {

                let payload = {
                    email,
                    nationality,
                    source_of_income,
                    country,
                    province,
                    city,
                    barangay,
                    zip_code
                }
    
                //await API.addNewReceiver(payload)

                this.setState({
                    processing:false,
                    showSuccessModal:true
                })
            }

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
            Say.err(_('500'))
        }
    }

    handleCloseModal = () => this.setState({showSuccessModal:false})

    render() {

        const {email, nationality, source_of_income, country, province, city, barangay, zip_code, processing, showSuccessModal} = this.state
        let ready = false

        if(barangay && zip_code && source_of_income) ready = true

        return (
            <>
                <Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message='Details updated'
                    onDismiss={this.handleCloseModal}
                />
                
                <Screen>
                    <Headline subtext='Please make sure to enter all the correct details' />

                    <TextInput
                        ref='email'
                        label={'Email address (optional)'}
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        onSubmitEditing={this.handleFocusSourceOfIncome}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        returnKeyType='next'
                    />

                    <StaticInput
                        label='Nationality'
                        value={nationality}
                        onPress={this.handleSelectNationality}
                    />

                    <TextInput
                        ref='source_of_income'
                        label={'Source of Income'}
                        value={source_of_income}
                        onChangeText={this.handleChangeSourceOfIncome}
                        onSubmitEditing={this.handleFocusBarangay}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <StaticInput
                        label='Country'
                        value={country}
                        onPress={this.handleSelectCountry}
                    />

                    <StaticInput
                        label='Province'
                        value={province}
                        onPress={this.handleSelectProvince}
                    />

                    <StaticInput
                        label='City/Municipality'
                        value={city}
                        onPress={this.handleSelectCity}
                    />

                    <TextInput
                        ref='barangay'
                        label={'Barangay/Street'}
                        value={barangay}
                        onChangeText={this.handleChangeBarangay}
                        onSubmitEditing={this.handleFocusZipCode}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='zip_code'
                        label={'Zip Code'}
                        value={zip_code}
                        onChangeText={this.handleChangeZipCode}
                        keyboardType='numeric'
                    />
                </Screen>

                <Footer>
                    <Button disabled={!ready} t={'Save Changes'} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)