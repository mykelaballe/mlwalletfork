import React from 'react'
import {Screen, Button, TextInput, Footer, StaticInput, SignUpStepsTracker} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Address'
    }

    state = {
        country:'Philippines',
        region:'',
        province:'',
        city:'',
        barangay:'',
        street:'',
        house:'',
        zip_code:'',
        processing:false
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.country && params.country !== prevState.country) {
            this.props.navigation.setParams({country:null})
            this.setState({country:params.country})
        }

        if(params.region && params.region !== prevState.region) {
            this.props.navigation.setParams({region:null})
            this.setState({region:params.region})
        }

        if(params.province && params.province !== prevState.province) {
            this.props.navigation.setParams({province:null})
            this.setState({province:params.province})
        }

        if(params.city && params.city !== prevState.city) {
            this.props.navigation.setParams({city:null})
            this.setState({city:params.city})
        }
    }

    handleChangeHouse = house => this.setState({house})

    handleChangeStreet = street => this.setState({street})

    handleSelectCountry = () => {
        const {state, navigate} = this.props.navigation
        navigate('Countries',{sourceRoute:state.routeName})
    }

    handleSelectRegion = () => {
        const {state, navigate} = this.props.navigation
        navigate('Regions',{sourceRoute:state.routeName})
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

    handleChangeZipCode = zip_code => this.setState({zip_code})

    handleFocusBarangay = () => this.refs.barangay.focus()

    handleFocusStreet = () => this.refs.street.focus()

    handleFocusHouse = () => this.refs.house.focus()

    handleFocusZipCode = () => this.refs.zip_code.focus()

    handleSubmit = async () => {
        let {region, house, street, country, province, city, barangay, zip_code} = this.state

        try {
            house = house.trim()
            street = street.trim()
            barangay = barangay.trim()
            zip_code = zip_code.trim()

            if(!province || !city || !barangay || !zip_code || !region) Say.some(_('8'))
            else {
                this.props.navigation.navigate('SignUpStep3',{
                    ...this.props.navigation.state.params,
                    country,
                    province,
                    region,
                    city,
                    house,
                    street,
                    barangay,
                    zip_code
                })
            }
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    render() {

        const {house, street, country, province, city, barangay, zip_code, region, processing} = this.state
        let ready = false

        if(country && province && city && barangay && zip_code && region) {
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
                        label='Region'
                        value={region}
                        onPress={this.handleSelectRegion}
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
                        label={'Barangay'}
                        value={barangay}
                        onChangeText={this.handleChangeBarangay}
                        onSubmitEditing={this.handleFocusStreet}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='street'
                        label={'Street'}
                        value={street}
                        onChangeText={this.handleChangeStreet}
                        onSubmitEditing={this.handleFocusHouse}
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='house'
                        label={'House/Unit/Floor #, Bldg Name, Block or Lot #'}
                        value={house}
                        onChangeText={this.handleChangeHouse}
                        onSubmitEditing={this.handleFocusZipCode}
                        autoCapitalize='none'
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