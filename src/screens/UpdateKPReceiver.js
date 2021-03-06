import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Button, Checkbox, Picker} from '../components'
import {Metrics} from '../themes'
import {_, Say, Func, Consts} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Receiver'
    }

    state = {
        id:this.props.navigation.state.params.receiver.id,
        firstname:this.props.navigation.state.params.receiver.firstname,
        middlename:this.props.navigation.state.params.receiver.middlename || _('50'),
        has_middlename:this.props.navigation.state.params.receiver.middlename ? true : false,
        lastname:this.props.navigation.state.params.receiver.lastname,
        suffix:this.props.navigation.state.params.receiver.suffix || _('51'),
        other_suffix:'',
        has_suffix:this.props.navigation.state.params.receiver.suffix ? true : false,
        suffix_options:Consts.suffixOptions,
        contact_no:`${Consts.mobilePrefixPH} ${this.props.navigation.state.params.receiver.ContactNo.slice(1, this.props.navigation.state.params.receiver.ContactNo.length)}`,
        processing:false
    }

    handleChangeFirstName = firstname => this.setState({firstname})
    handleChangeMiddleName = middlename => this.setState({middlename})
    handleToggleHasMiddlename = () => {
        this.setState(prevState => ({
            middlename:prevState.has_middlename ? _('50') : '',
            has_middlename:!prevState.has_middlename
        }))
    }
    handleChangeLastName = lastname => this.setState({lastname})
    handleChangeSuffix = (option = {}) => this.setState({suffix:option.label,other_suffix:''})
    handleChangeSuffixOthers = other_suffix => this.setState({other_suffix})
    handleToggleHasSuffix = () => {
        this.setState(prevState => ({
            suffix:prevState.has_suffix ? _('51') : '',
            other_suffix:'',
            has_suffix:!prevState.has_suffix
        }))
    }
    handleChangeContactNo = contact_no => this.setState({contact_no})

    handleFocusMiddleName = () => this.state.has_middlename ? this.refs.middlename.focus() : this.refs.lastname.focus()
    handleFocusLastName = () => this.refs.lastname.focus()
    handleFocusContactNo = () => this.refs.contact_no.focus()

    handleSubmit = async () => {
        try {
            const {receiver} = this.props.navigation.state.params
            let {firstname, middlename, lastname, suffix, other_suffix, contact_no, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            firstname = firstname.trim()
            middlename = middlename.trim()
            lastname = lastname.trim()
            contact_no = contact_no.trim()
            suffix = suffix.trim()
            other_suffix = other_suffix.trim()

            suffix = other_suffix || suffix

            contact_no = Func.formatToPHMobileNumber(contact_no)

            if(!firstname || !middlename || !lastname || !suffix || !contact_no) Say.some(_('8'))
            else if(!Func.isLettersOnly(firstname)) Say.warn(Consts.error.onlyLettersInName)
            else if(!Func.isLettersOnly(middlename)) Say.warn(Consts.error.onlyLettersInName)
            else if(!Func.isLettersOnly(lastname)) Say.warn(Consts.error.onlyLettersInName)
            else if(!Func.isLettersOnly(suffix)) Say.warn(Consts.error.onlyLetters)
            else if(!Func.isPHMobileNumber(contact_no)) Say.warn(Consts.error.mobile)
            else {

                let payload = {
                    receiverNumVal:receiver.receiverno,
                    Fname:firstname,
                    Mname:middlename == _('50') ? '' : middlename,
                    Lname:lastname,
                    Suffix:suffix == _('51') ? '' : suffix,
                    ContactNo:contact_no
                }
    
                let res = await API.updateKPReceiver(payload)

                if(!res.error) {
                    this.props.updateReceiver({
                        ...receiver,
                        firstname,
                        middlename,
                        lastname,
                        suffix,
                        ContactNo:contact_no
                    })
                    this.props.refreshAll(true)
                    this.props.refreshFavorites(true)
                    this.props.refreshRecent(true)
                    Say.ok('KP receiver updated!')
                    this.props.navigation.pop()
                }
                else Say.warn(res.message)
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {firstname, middlename, has_middlename, lastname, suffix, other_suffix, has_suffix, suffix_options, contact_no, processing} = this.state
        let ready = false

        if(firstname && middlename && lastname && suffix && contact_no) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please ensure that the name of the receiver is the same as it appears in their valid ID.' />

                    <TextInput
                        label='First Name'
                        value={firstname}
                        onChangeText={this.handleChangeFirstName}
                        onSubmitEditing={this.handleFocusMiddleName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='middlename'
                        editable={has_middlename}
                        label='Middle Name'
                        value={middlename}
                        onChangeText={this.handleChangeMiddleName}
                        onSubmitEditing={this.handleFocusLastName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <Checkbox
                        status={!has_middlename}
                        onPress={this.handleToggleHasMiddlename}
                        label="I prefer not to indicate my receiver's middle name"
                        labelStyle={{fontSize:Metrics.font.sm}}
                    />

                    <TextInput
                        ref='lastname'
                        label='Last Name'
                        value={lastname}
                        onChangeText={this.handleChangeLastName}
                        autoCapitalize='words'
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

                    <TextInput
                        ref='contact_no'
                        label='Contact No.'
                        value={contact_no}
                        onChangeText={this.handleChangeContactNo}
                        keyboardType='numeric'
                        mask={Consts.mobileMaskPH}
                    />
                </Screen>

                <Footer>
                    <Button disabled={!ready} t={_('83')} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateReceiver:newProp => dispatch(Creators.updateKPReceiver(newProp)),
    refreshAll:refresh => dispatch(Creators.refreshKPAllReceivers(refresh)),
    refreshFavorites:refresh => dispatch(Creators.refreshKPFavorites(refresh)),
    refreshRecent:refresh => dispatch(Creators.refreshKPRecent(refresh))
})

export default connect(null, mapDispatchToProps)(Scrn)