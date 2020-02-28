import React from 'react'
import {Screen, Footer, Button, TextInput, Headline} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

export default class Scrn extends React.Component {

    state = {
        username:'',
        processing:false
    }

    handleChangeUsername = username => this.setState({username})

    handleNext = async () => {
        try {
            let {username, processing} = this.state

            if(processing) return

            this.setState({processing:true})
            
            username = username.trim()

            if(username == '') Say.some('Enter your username')
            else {
                this.props.navigation.navigate('SecurityQuestion')
            }

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
            Say.err(_('500'))
        }
    }

    render() {

        const {username, processing} = this.state

        return (
            <>
                <Screen>
                    <Headline
                        title='Forgot Password'
                        subtext='To reset your password, please enter your registered Username.'
                    />

                    <TextInput
                        label='Username'
                        value={username}
                        onChangeText={this.handleChangeUsername}
                        autoCapitalize='none'
                    />
                </Screen>

                <Footer>
                    <Button disabled={!username} t={_('62')} onPress={this.handleNext} loading={processing} />
                </Footer>
            </>
        )
    }
}