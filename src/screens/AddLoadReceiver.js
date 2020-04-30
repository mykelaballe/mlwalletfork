import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, TextInput, Button, Text, Row, Spacer} from '../components'
import {_, Say, Func, Consts} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add New Receiver'
    }

    state = {
        mobileno:'',
        fullname:'',
        processing:false
    }

    handleChangeFullName = fullname => this.setState({fullname})
    handleChangeContactNo = mobileno => this.setState({mobileno})

    handleFocusFullName = () => this.refs.fullname.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {fullname, mobileno, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            fullname = fullname.trim()
            mobileno = mobileno.trim()

            mobileno = `09${mobileno}`

            if(!fullname || !mobileno) Say.some(_('8'))
            else if(!Func.isLettersOnly(fullname)) Say.warn(Consts.error.onlyLetters)
            else if(!Func.isPHMobileNumber(mobileno)) Say.warn(Consts.error.mobile)
            else {

                let payload = {
                    _walletno:walletno,
                    _fullname:fullname,
                    _mobileno:mobileno,
                    _isfavorite:false
                }
    
                let res = await API.addELoadReceiver(payload)

                if(!res.error) {
                    this.props.refreshAll(true)
                    this.props.navigation.pop()
                    Say.ok('New ELoad receiver successfully added')
                }
                else {
                    Say.warn(res.message)
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {mobileno, fullname, processing} = this.state
        let ready = false

        if(fullname && mobileno) ready = true

        return (
            <>
                <Screen>
                    <Row>
                        <Text>+639</Text>
                        <Spacer h sm />
                        <TextInput
                            ref='contact_no'
                            label='Contact No.'
                            value={mobileno}
                            onChangeText={this.handleChangeContactNo}
                            onSubmitEditing={this.handleFocusFullName}
                            keyboardType='numeric'
                            returnKeyType='next'
                            maxLength={9}
                        />
                    </Row>

                    <TextInput
                        ref='fullname'
                        label='Full Name'
                        value={fullname}
                        onChangeText={this.handleChangeFullName}
                        autoCapitalize='words'
                    />
                </Screen>

                <Footer>
                    <Button disabled={!ready} t='Save Receiver' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    refreshAll:refresh => dispatch(Creators.refreshELoadAllReceivers(refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)