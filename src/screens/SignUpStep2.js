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
        house:'',
        street:'',
        province:'Cebu',
        barangay:'',
        city:'Talisay',
        zip_code:'',
        country:'Philippines',
        processing:false
    }

    handleChangeHouse = house => this.setState({house})

    handleChangeStreet = street => this.setState({street})

    handleSelectCountry = () => this.props.navigation.navigate('Countries')

    handleSelectProvince = () => this.props.navigation.navigate('Provinces',{country:this.state.country})

    handleSelectCity = () => this.props.navigation.navigate('Cities',{province:this.state.province})

    handleChangeBarangay = barangay => this.setState({barangay})

    handleChangeZipCode = zip_code => this.setState({zip_code})

    handleFocusStreet = () => this.refs.street.focus()

    handleFocusBarangay = () => this.refs.barangay.focus()

    handleFocusZipCode = () => this.refs.zip_code.focus()

    handleSubmit = async () => {
        let {house, street, country, province, city, barangay, zip_code, processing} = this.state

        if(processing) return false

        try {
            house = house.trim()
            street = street.trim()
            barangay = barangay.trim()
            zip_code = zip_code.trim()

            if(!country || !province || !city || !barangay || !zip_code) Say.some(_('8'))
            else {
                this.props.navigation.navigate('SignUpStep3')
            }
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    render() {

        const {house, street, country, province, city, barangay, zip_code, processing} = this.state
        let ready = false

        if(country && province && city && barangay && zip_code) {
            ready = true
        }

        return (
            <>
                <Screen>

                    <SignUpStepsTracker step={2} />

                    <TextInput
                        ref='house'
                        label={'House/Unit/Floor #, Bldg Name, Block or Lot #'}
                        value={house}
                        onChangeText={this.handleChangeHouse}
                        onSubmitEditing={this.handleFocusStreet}
                        autoCapitalize='none'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='street'
                        label={'Street'}
                        value={street}
                        onChangeText={this.handleChangeStreet}
                        onSubmitEditing={this.handleFocusBarangay}
                        returnKeyType='next'
                    />

                    <StaticInput
                        label='Province'
                        value={province}
                        onPress={this.handleSelectProvince}
                    />

                    <TextInput
                        ref='barangay'
                        label={'Barangay'}
                        value={barangay}
                        onChangeText={this.handleChangeBarangay}
                        onSubmitEditing={this.handleFocusZipCode}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <StaticInput
                        label='City/Municipality'
                        value={city}
                        onPress={this.handleSelectCity}
                    />

                    <TextInput
                        ref='zip_code'
                        label={'Zip Code'}
                        value={zip_code}
                        onChangeText={this.handleChangeZipCode}
                        keyboardType='numeric'
                    />

                    <StaticInput
                        label='Country'
                        value={country}
                        onPress={this.handleSelectCountry}
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