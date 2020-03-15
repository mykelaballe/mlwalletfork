import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, StaticInput, TextInput, Button, Prompt} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

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
        //showSuccessModal:false
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.nationality && params.nationality !== prevState.nationality) {
            this.props.navigation.setParams({nationality:null})
            this.setState({nationality:params.nationality})
        }

        else if(params.country && params.country !== prevState.country) {
            this.props.navigation.setParams({country:null})
            this.setState({country:params.country})
        }

        else if(params.region && params.region !== prevState.region) {
            this.props.navigation.setParams({region:null})
            this.setState({region:params.region})
        }

        else if(params.province && params.province !== prevState.province) {
            this.props.navigation.setParams({province:null})
            this.setState({province:params.province})
        }

        else if(params.city && params.city !== prevState.city) {
            this.props.navigation.setParams({city:null})
            this.setState({city:params.city})
        }

        else if(params.source_of_income && params.source_of_income !== prevState.source_of_income) {
            this.props.navigation.setParams({source_of_income:null})
            this.setState({source_of_income:params.source_of_income})
        }
    }

    handleChangeEmail = email => this.setState({email})

    handleSelectNationality = () => this.props.navigation.navigate('Nationalities',{sourceRoute:this.props.navigation.state.routeName})

    handleChangeSourceOfIncome = source_of_income => this.setState({source_of_income})

    handleSelectCountry = () => this.props.navigation.navigate('Countries',{sourceRoute:this.props.navigation.state.routeName})

    handleSelectProvince = () => this.props.navigation.navigate('Provinces',{country:this.state.country,sourceRoute:this.props.navigation.state.routeName})

    handleSelectCity = () => this.props.navigation.navigate('Cities',{province:this.state.province,sourceRoute:this.props.navigation.state.routeName})

    handleChangeBarangay = barangay => this.setState({barangay})

    handleChangeZipCode = zip_code => this.setState({zip_code})

    handleSelectSourceOfIncome = () => {
        const {state, navigate} = this.props.navigation
        navigate('SourceOfIncome',{sourceRoute:state.routeName})
    }

    handleFocusBarangay = () => this.refs.barangay.focus()

    handleFocusZipCode = () => this.refs.zip_code.focus()

    handleSubmit = async () => {
        try {
            const {walletno, mobile_no, suffix, street} = this.props.user
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
                    walletno,
                    emailadd:email,
                    nationality,
                    sourceofincome:source_of_income,
                    country,
                    province,
                    city,
                    barangay,
                    zipcode:zip_code,
                    street,
                    mobileno:mobile_no,
                    suffix
                }
    
                let res = await API.updateProfile(payload)

                if(!res.error) {
                    this.props.setUser({
                        ...this.props.user,
                        email,
                        nationality,
                        source_of_income,
                        country,
                        province,
                        city,
                        barangay,
                        zip_code
                    })
                    Say.ok('Details updated')
                    //this.setState({showSuccessModal:true})
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    //handleCloseModal = () => this.setState({showSuccessModal:false})

    render() {

        const {email, nationality, source_of_income, country, province, city, barangay, zip_code, processing, showSuccessModal} = this.state
        let ready = false

        if(barangay && zip_code && source_of_income) ready = true

        return (
            <>
                {/*<Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message='Details updated'
                    onDismiss={this.handleCloseModal}
                />*/}
                
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

const mapDispatchToProps = dispatch => ({
    setUser:user => dispatch(Creators.setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)