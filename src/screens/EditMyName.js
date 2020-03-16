import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, TextInput, Button, Checkbox, Picker} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Name'
    }

    state = {
        fname:this.props.user.fname,
        mname:this.props.user.mname || _('50'),
        has_middlename:this.props.user.mname ? true : false,
        lname:this.props.user.lname,
        suffix:this.props.user.suffix || _('51'),
        other_suffix:'',
        has_suffix:this.props.user.suffix ? true : false,
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
        processing:false
    }

    handleChangeFirstName = fname => this.setState({fname})

    handleChangeMiddleName = mname => this.setState({mname})

    handleToggleHasMiddlename = () => {
        this.setState(prevState => ({
            mname:prevState.has_middlename ? _('50') : '',
            has_middlename:!prevState.has_middlename
        }))
    }

    handleChangeLastName = lname => this.setState({lname})

    handleChangeSuffix = (option = {}) => this.setState({suffix:option.label})

    handleChangeSuffixOthers = other_suffix => this.setState({other_suffix})

    handleToggleHasSuffix = () => {
        this.setState(prevState => ({
            suffix:prevState.has_suffix ? _('51') : '',
            has_suffix:!prevState.has_suffix
        }))
    }

    handleFocusMiddleName = () => this.state.has_middlename ? this.refs.mname.focus() : this.refs.lname.focus()

    handleFocusLastName = () => this.refs.lname.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            const {reasons} = this.props.navigation.state.params
            let {fname, mname, lname, suffix, other_suffix, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            fname = fname.trim()
            mname = mname.trim()
            lname = lname.trim()
            suffix = suffix.trim()
            other_suffix = other_suffix.trim()

            suffix = other_suffix || suffix

            if(!fname || !mname || !lname || !suffix) Say.some(_('8'))
            else {
    
                let res = await API.requestUpdateProfile({
                    walletno,
                    firstname:fname,
                    middlename:mname,
                    lastname:lname,
                    suffix,
                    reasons
                })

                if(res.error) Say.some(res.message)
                else {
                    Say.ok('Details updated')
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {fname, mname, has_middlename, lname, suffix, other_suffix, has_suffix, suffix_options, processing} = this.state
        let ready = false

        if(fname && mname && lname && suffix) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please make sure to enter all the correct details' />

                    <TextInput
                        label='First Name'
                        value={fname}
                        onChangeText={this.handleChangeFirstName}
                        onSubmitEditing={this.handleFocusMiddleName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='mname'
                        editable={has_middlename}
                        label='Middle Name'
                        value={mname}
                        onChangeText={this.handleChangeMiddleName}
                        onSubmitEditing={this.handleFocusLastName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <Checkbox
                        status={!has_middlename}
                        onPress={this.handleToggleHasMiddlename}
                        label='I have no middle name'
                        labelStyle={{fontSize:Metrics.font.sm}}
                    />

                    <TextInput
                        ref='lname'
                        label='Last Name'
                        value={lname}
                        onChangeText={this.handleChangeLastName}
                        onSubmitEditing={this.handleFocusContactNo}
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