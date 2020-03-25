import React from 'react'
import {Screen, Button, TextInput, Footer, StaticInput, SignUpStepsTracker} from '../components'
import {_, Say, Consts} from '../utils'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Address'
    }

    state = {
        country:'Philippines',
        province:{
            province:'',
            provCode:''
        },
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
            this.setState({
                country:params.country,
                province:'',
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
    }

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

    handleChangeZipCode = zip_code => this.setState({zip_code})

    handleFocusBarangay = () => this.refs.barangay.focus()

    handleFocusStreet = () => this.refs.street.focus()

    handleFocusHouse = () => this.refs.house.focus()

    handleFocusZipCode = () => this.refs.zip_code.focus()

    handleSubmit = async () => {
        let {house, street, country, province, city, barangay, zip_code} = this.state

        try {
            house = house.trim()
            street = street.trim()
            barangay = barangay.trim()
            zip_code = zip_code.trim()

            if(!province.province || !city || !barangay || !zip_code) Say.some(_('8'))
            else if(country == Consts.country.PH && (!province.province || !city || !barangay || !zip_code)) Say.some(_('8'))
            else {
                this.props.navigation.navigate('SignUpStep3',{
                    ...this.props.navigation.state.params,
                    country,
                    province,
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

        const {house, street, country, province, city, barangay, zip_code, processing} = this.state
        let ready = true

        if(country && province && city && barangay && zip_code) ready = true
        if(country == Consts.country.PH && (!province || !city || !barangay || !zip_code)) ready = false

        return (
            <>
                <Screen>

                    <SignUpStepsTracker step={2} />

                    <StaticInput
                        label='Country'
                        value={country}
                        onPress={this.handleSelectCountry}
                    />

                    {country === Consts.country.PH &&
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
                        ref='house'
                        label={'House/Unit/Floor #, Bldg Name, Block or Lot #'}
                        value={house}
                        onChangeText={this.handleChangeHouse}
                        onSubmitEditing={this.handleFocusZipCode}
                        autoCapitalize='none'
                        returnKeyType='next'
                    />

                    {country == Consts.country.PH &&
                    <TextInput
                        ref='zip_code'
                        label={'Zip Code'}
                        value={zip_code}
                        onChangeText={this.handleChangeZipCode}
                        keyboardType='numeric'
                    />
                    }
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t={_('62')} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}