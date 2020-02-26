import React from 'react'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Screen, Button, TextInput, Footer, StaticInput, SignUpStepsTracker} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Address'
    }

    state = {
        country:'Philippines',
        province:'Cebu',
        city:'Talisay',
        barangay:'',
        zip_code:'',
        processing:false
    }

    handleSelectCountry = () => this.props.navigation.navigate('Countries')

    handleSelectProvince = () => this.props.navigation.navigate('Provinces',{country:this.state.country})

    handleSelectCity = () => this.props.navigation.navigate('Cities',{province:this.state.province})

    handleChangeBarangay = barangay => this.setState({barangay})

    handleChangeZipCode = zip_code => this.setState({zip_code})

    handleFocusZipCode = () => this.refs.zip_code.focus()

    handleSubmit = async () => {
        let {country, province, city, barangay, zip_code, processing} = this.state

        if(processing) return false

        try {
            barangay = barangay.trim()
            zip_code = zip_code.trim()

            if(country == '' || province == '' || city == '' || barangay == '' || zip_code == '') Say.some(_('8'))
            else {
                this.props.navigation.navigate('SignUpStep3')
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    render() {

        const {country, province, city, barangay, zip_code, processing} = this.state
        let ready = false

        if(country && province && city && barangay && zip_code) {
            ready = true
        }

        return (
            <>
                <Screen>

                    <SignUpStepsTracker step={2} />

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
                    <Button disabled={!ready} t={_('62')} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

export default Scrn