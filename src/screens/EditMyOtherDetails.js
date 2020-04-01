import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, StaticInput, TextInput, Button} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Other Details'
    }

    state = {
        nationality:this.props.user.nationality,
        sourceofincome:this.props.user.sourceofincome,
        country:this.props.user.country,
        province:{
            province:this.props.user.province || '',
            provCode:this.props.user.provincecode || ''
        },
        city:this.props.user.city || '',
        barangay:this.props.user.barangay || '',
        houseno:this.props.user.houseno || '',
        street:this.props.user.street || '',
        zipcode:this.props.user.zipcode || '',
        processing:false
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.nationality && params.nationality !== prevState.nationality) {
            this.props.navigation.setParams({nationality:null})
            this.setState({nationality:params.nationality})
        }

        else if(params.country && params.country !== prevState.country) {
            this.props.navigation.setParams({country:null})
            this.setState(prevState => ({
                country:params.country,
                province:{
                    province:'',
                    provCode:''
                },
                city:'',
                zipcode:''
            }))
        }

        else if(params.province && params.province.province !== prevState.province.province) {
            this.props.navigation.setParams({province:null})
            this.setState({
                province:params.province,
                city:''
            })
        }

        else if(params.city && params.city.city !== prevState.city) {
            this.props.navigation.setParams({city:null})
            this.setState({
                city:params.city.city,
                zipcode:params.city.zipCode
            })
        }

        else if(params.source_of_income && params.source_of_income !== prevState.sourceofincome) {
            this.props.navigation.setParams({source_of_income:null})
            this.setState({sourceofincome:params.source_of_income})
        }
    }

    handleSelectNationality = () => this.props.navigation.navigate('Nationalities',{sourceRoute:this.props.navigation.state.routeName})

    handleChangeSourceOfIncome = sourceofincome => this.setState({sourceofincome})

    handleSelectCountry = () => this.props.navigation.navigate('Countries',{sourceRoute:this.props.navigation.state.routeName})

    handleSelectProvince = () => this.props.navigation.navigate('Provinces',{country:this.state.country,sourceRoute:this.props.navigation.state.routeName})

    handleSelectCity = () => this.props.navigation.navigate('Cities',{province:this.state.province,sourceRoute:this.props.navigation.state.routeName})

    handleChangeBarangay = barangay => this.setState({barangay})

    handleChangeHouse = houseno => this.setState({houseno})

    handleChangeStreet = street => this.setState({street})

    handleSelectSourceOfIncome = () => {
        const {state, navigate} = this.props.navigation
        navigate('SourceOfIncome',{sourceRoute:state.routeName})
    }

    handleFocusBarangay = () => this.refs.barangay.focus()

    handleFocusStreet = () => this.refs.street.focus()

    handleFocusHouse = () => this.refs.houseno.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {nationality, sourceofincome, country, province, city, barangay, houseno, street, zipcode, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            sourceofincome = sourceofincome.trim()
            barangay = barangay.trim()
            street = street.trim()
            houseno = houseno.trim()
            zipcode = zipcode.trim()

            if(!sourceofincome) Say.some(_('8'))
            else if(country == Consts.country.PH && (!province.province || !city || !barangay || !zipcode)) Say.some(_('8'))
            else if(barangay && !Func.hasAddressSpecialCharsOnly(barangay)) Say.warn(Consts.error.notAllowedChar + '\n\nBarangay')
            else if(street && !Func.hasAddressSpecialCharsOnly(street)) Say.warn(Consts.error.notAllowedChar + '\n\nStreet')
            else if(houseno && !Func.hasAddressSpecialCharsOnly(houseno)) Say.warn(Consts.error.notAllowedChar + '\n\nHouse/Unit/Floor...: ')
            else {

                let payload = {
                    walletno,
                    nationality,
                    sourceofincome,
                    country,
                    province:province.province,
                    provincecode:province.provCode,
                    city,
                    barangay,
                    houseno,
                    street,
                    zipcode
                }
    
                let res = await API.updateProfile(payload)

                if(!res.error) {
                    this.props.updateInfo(payload)
                    Say.ok('Details updated')
                }
                else Say.warn(res.message)
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {nationality, sourceofincome, country, province, city, barangay, houseno, street, zipcode, processing} = this.state
        let ready = true

        if(!sourceofincome) ready = false
        if(country == Consts.country.PH && (!province.province || !city || !barangay || !zipcode)) ready = false

        return (
            <>
                <Screen>
                    <Headline subtext='Please make sure to enter all the correct details' />

                    <StaticInput
                        label='Nationality'
                        value={nationality}
                        onPress={this.handleSelectNationality}
                    />

                    <StaticInput
                        label='Source of Income'
                        value={sourceofincome}
                        onPress={this.handleSelectSourceOfIncome}
                    />

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
                        ref='houseno'
                        label={'House/Unit/Floor #, Bldg Name, Block or Lot #'}
                        value={houseno}
                        onChangeText={this.handleChangeHouse}
                        autoCapitalize='none'
                    />

                    {country === Consts.country.PH &&
                    <StaticInput
                        label='Zip Code'
                        value={zipcode}
                    />
                    }
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
    updateInfo:newInfo => dispatch(Creators.updateUserInfo(newInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)