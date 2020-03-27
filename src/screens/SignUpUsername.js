import React from 'react'
import {Screen, Headline, Button, TextInput, Footer, Errors} from '../components'
import {_, Say, Func} from '../utils'
import {API} from '../services'

const CRITERIA = {
    minLength:8,
    alphaNum:true
}

export default class Scrn extends React.Component {

    state = {
        username:'',
        error:false,
        username_errors:[],
        processing:false
    }

    handleChangeUsername = username => this.setState({username,error:false})

    handleSubmit = async () => {

        let {username, processing} = this.state
        let username_errors = []

        if(processing) return false

        try {
            this.setState({processing:true})

            username = username.trim()

            if(!username) Say.some(_('8'))
            else {

                let usernameValidation = Func.validate(username, CRITERIA)

                username_errors = usernameValidation.errors
                
                if(usernameValidation.ok) {
                    let res = await API.validateUsername(username)

                    if(!res.error) Say.some('Oops! Username already exists. Please type another')
                    else {
                        let payload = {
                            username
                        }
                        this.props.navigation.navigate('SignUpPassword',{payload})
                    }
                }
                else {
                    //Say.warn('Invalid format')
                    this.setState({error:true})
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {username, error, username_errors, processing} = this.state
        let ready = false

        if(username) ready = true

        return (
            <>
                <Screen>
                    
                    <Headline
                        title='Registration'
                        subtext='To start, create your desired username. Make it as unique as possible.'
                    />

                    <TextInput
                        ref='username'
                        label={_('1')}
                        value={username}
                        error={error}
                        onChangeText={this.handleChangeUsername}
                        autoCapitalize='none'
                    />

                    <Errors
                        value={username}
                        criteria={CRITERIA}
                    />
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t='Next' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}