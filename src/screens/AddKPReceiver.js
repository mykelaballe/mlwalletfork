import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Button, Checkbox, Picker} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add New Receiver'
    }

    state = {
        firstname:'',
        middlename:'',
        has_middlename:true,
        lastname:'',
        suffix:'',
        other_suffix:'',
        has_suffix:true,
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
        contact_no:'',
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

    handleChangeSuffix = (option = {}) => this.setState({suffix:option.label})

    handleChangeSuffixOthers = other_suffix => this.setState({other_suffix})

    handleToggleHasSuffix = () => {
        this.setState(prevState => ({
            suffix:prevState.has_suffix ? _('51') : '',
            has_suffix:!prevState.has_suffix
        }))
    }

    handleChangeContactNo = contact_no => this.setState({contact_no})

    handleFocusMiddleName = () => this.state.has_middlename ? this.refs.middlename.focus() : this.refs.lastname.focus()

    handleFocusLastName = () => this.refs.lastname.focus()

    handleFocusContactNo = () => this.refs.contact_no.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
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

            if(!firstname || !middlename || !lastname || !suffix || !contact_no) Say.some(_('8'))
            else {
    
                let res = await API.addKPReceiver({
                    walletno,
                    Fname:firstname,
                    Mname:middlename === _('50') ? null : middlename,
                    Lname:lastname,
                    Suffix:suffix === _('51') ? null : suffix,
                    ContactNo:contact_no
                })

                if(res.walletno) {
                    this.props.refreshAll(true)
                    Say.ok('Successfully added KP receiver')
                    this.props.navigation.pop()
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
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
                        onSubmitEditing={this.handleFocusContactNo}
                        autoCapitalize='words'
                        returnKeyType='next'
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
                    />
                </Screen>

                <Footer>
                    <Button disabled={!ready} t={_('83')} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    //addReceiver:newReceiver => dispatch(Creators.addKPReceiver(newReceiver)),
    refreshAll:refresh => dispatch(Creators.refreshKPAllReceivers(refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)