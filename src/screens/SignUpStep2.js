import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Button, TextInput, Footer, StaticInput, SignUpStepsTracker} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

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
        error_barangay:false,
        error_street:false,
        error_house:false,
        processing:false
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.country && params.country !== prevState.country) {
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
    }

    handleChangeHouse = house => this.setState({house,error_house:false})

    handleChangeStreet = street => this.setState({street,error_street:false})

    handleSelectCountry = () => this.props.navigation.navigate('Countries',{sourceRoute:this.props.navigation.state.routeName})

    handleSelectProvince = () => this.props.navigation.navigate('Provinces',{sourceRoute:this.props.navigation.state.routeName, country:this.state.country})

    handleSelectCity = () => this.props.navigation.navigate('Cities',{sourceRoute:this.props.navigation.state.routeName, province:this.state.province})

    handleChangeBarangay = barangay => this.setState({barangay,error_barangay:false})

    handleFocusBarangay = () => this.refs.barangay.focus()

    handleFocusStreet = () => this.refs.street.focus()

    handleFocusHouse = () => this.refs.house.focus()

    handleSubmit = async () => {
        const {params = {}} = this.props.navigation.state
        const {user} = this.props
        let {house, street, country, province, city, barangay, zip_code} = this.state

        try {
            house = house.trim()
            street = street.trim()
            barangay = barangay.trim()
            zip_code = zip_code.trim()

            if(country == Consts.country.PH && (!province.province || !city || !barangay || !zip_code)) {
                this.setState({error_barangay:true})
                Say.some(_('8'))
            }
            else if(!house || !street) {
                if(!house) this.setState({error_house:true})
                if(!street) this.setState({error_street:true})

                Say.some(_('8'))
            }
            else if(barangay && !Func.hasAddressSpecialCharsOnly(barangay)) Say.warn(Consts.error.notAllowedChar + '\n\nBarangay')
            else if(street && !Func.hasAddressSpecialCharsOnly(street)) Say.warn(Consts.error.notAllowedChar + '\n\nStreet')
            else if(house && !Func.hasAddressSpecialCharsOnly(house)) Say.warn(Consts.error.notAllowedChar + '\n\nHouse/Unit/Floor...: ')
            else {
                if(params.isForceUpdate) {
                    this.setState({processing:true})

                    let updateRes = await API.updateProfile({
                        walletno:user.walletno,
                        country,
                        province:province.province,
                        provincecode:province.provCode,
                        city,
                        barangay,
                        houseno:house,
                        street,
                        zipcode:zip_code
                    })
                    
                    if(updateRes.error) Say.warn(updateRes.message)
                    else {
                        Say.ok(
                            `Thanks for updating your profile, ${user.fname}!\n\nExplore the new ML Wallet now`,
                            null,
                            {
                                onConfirm:() => {
                                    this.props.updateUserInfo(updateRes.data)
                                    this.props.login()
                                }
                            }
                        )
                    }
                }
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
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {params = {}} = this.props.navigation.state
        const {house, street, country, province, city, barangay, zip_code, error_barangay, error_house, error_street, processing} = this.state
        let ready = true

        if(country == Consts.country.PH && (!province.province || !city || !barangay || !zip_code)) ready = false

        if(!house || !street) ready = false

        return (
            <>
                <Screen>

                    {!params.isForceUpdate && <SignUpStepsTracker step={2} />}

                    <StaticInput
                        label='Country*'
                        value={country}
                        onPress={this.handleSelectCountry}
                    />

                    {country === Consts.country.PH &&
                    <>
                        <StaticInput
                            label='Province*'
                            value={province.province}
                            onPress={this.handleSelectProvince}
                        />

                        <StaticInput
                            label='City/Municipality*'
                            value={city}
                            onPress={this.handleSelectCity}
                        />

                        <TextInput
                            ref='barangay'
                            label={'Barangay*'}
                            value={barangay}
                            error={error_barangay}
                            onChangeText={this.handleChangeBarangay}
                            onSubmitEditing={this.handleFocusStreet}
                            autoCapitalize='words'
                            returnKeyType='next'
                        />
                    </>
                    }

                    <TextInput
                        ref='street'
                        label={'Street*'}
                        value={street}
                        error={error_street}
                        onChangeText={this.handleChangeStreet}
                        onSubmitEditing={this.handleFocusHouse}
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='house'
                        label={'House/Unit/Floor #, Bldg Name, Block or Lot #*'}
                        value={house}
                        error={error_house}
                        onChangeText={this.handleChangeHouse}
                        autoCapitalize='none'
                    />

                    {country == Consts.country.PH &&
                    <StaticInput
                        label='Zip Code*'
                        value={zip_code}
                    />
                    }
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t={params.isForceUpdate ? _('10') : _('62')} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    login:() => dispatch(Creators.login()),
    updateUserInfo:newInfo => dispatch(Creators.updateUserInfo(newInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)