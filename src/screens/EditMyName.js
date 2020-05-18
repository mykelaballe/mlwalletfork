import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, TextInput, Button, Checkbox, Picker} from '../components'
import {Metrics} from '../themes'
import {_, Say, Consts, Func} from '../utils'
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
        suffix_options:Consts.suffixOptions,
        error_fname:false,
        error_mname:false,
        error_lname:false,
        error_suffix:false,
        processing:false
    }

    handleChangeFirstName = fname => this.setState({fname,error_fname:false})

    handleChangeMiddleName = mname => this.setState({mname,error_mname:false})

    handleToggleHasMiddlename = () => {
        this.setState(prevState => ({
            mname:prevState.has_middlename ? _('50') : '',
            has_middlename:!prevState.has_middlename,
            error_mname:false
        }))
    }

    handleChangeLastName = lname => this.setState({lname,error_lname:false})

    handleChangeSuffix = (option = {}) => this.setState({suffix:option.label || '',error_suffix:false})

    handleChangeSuffixOthers = other_suffix => this.setState({other_suffix,error_suffix:false})

    handleToggleHasSuffix = () => {
        this.setState(prevState => ({
            suffix:prevState.has_suffix ? _('51') : '',
            has_suffix:!prevState.has_suffix,
            error_suffix:false
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

            if(suffix == 'Others') suffix = ''

            if(!fname || !mname || !lname || !suffix) {
                if(!fname) this.setState({error_fname:true})
                if(!mname) this.setState({error_mname:true})
                if(!lname) this.setState({error_lname:true})
                if(!suffix) this.setState({error_suffix:true})

                Say.some('Fill-out missing fields to proceed')
            }
            else if(!Func.isLettersOnly(fname)) {
                this.setState({error_fname:true})
                Say.warn(Consts.error.onlyLettersInName)
            }
            else if(!Func.isLettersOnly(mname)) {
                this.setState({error_mname:true})
                Say.warn(Consts.error.onlyLettersInName)
            }
            else if(!Func.isLettersOnly(lname)) {
                this.setState({error_lname:true})
                Say.warn(Consts.error.onlyLettersInName)
            }
            else {
    
                let res = await API.requestUpdateProfile({
                    walletno,
                    firstname:fname,
                    middlename:mname,
                    lastname:lname,
                    suffix,
                    reasons
                })

                if(res.error) Say.warn(res.message)
                else {
                    Say.ok('Your request to change your name has been sent for approval. We will get back to you soon!')
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {fname, mname, has_middlename, lname, suffix, other_suffix, has_suffix, suffix_options, error_fname, error_mname, error_lname, error_suffix, processing} = this.state
        let ready = false

        if(fname && mname && lname && suffix) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please make sure to enter all the correct details' />

                    <TextInput
                        label='First Name'
                        value={fname}
                        error={error_fname}
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
                        error={error_mname}
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
                        error={error_lname}
                        onChangeText={this.handleChangeLastName}
                        onSubmitEditing={this.handleFocusContactNo}
                        autoCapitalize='words'
                    />

                    <Picker
                        editable={has_suffix}
                        selected={suffix}
                        error={error_suffix}
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