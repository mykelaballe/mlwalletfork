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
        username_errors:[],
        processing:false
    }

    handleChangeUsername = username => this.setState({username})

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

                    if(!res.error) Say.some('Username already taken')
                    else {
                        this.props.navigation.navigate('SignUpPassword',{username})
                    }
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {username, username_errors, processing} = this.state
        let ready = false

        if(username) ready = true

        return (
            <>
                <Screen>
                    
                    <Headline
                        title='Registration'
                        subtext='To start, create your own desired username. Make it as unique as possible.'
                    />

                    <TextInput
                        ref='username'
                        label={_('1')}
                        value={username}
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