import React from 'react'
import {Screen, Footer, Text, Button, Spacer, TextInput, Headline} from '../components'
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
            Say.err('Something went wrong')
        }
    }

    render() {

        const {username, processing} = this.state

        return (
            <>
                <Screen>
                    <Headline
                        title='Forgot Password'
                        subtext='Input the number you used to register to ML Wallet to reset your password'
                    />

                    <TextInput
                        label='Username'
                        value={username}
                        onChangeText={this.handleChangeUsername}
                        autoCapitalize='none'
                    />
                </Screen>

                <Footer>
                    <Button disabled={!username} t='Next' onPress={this.handleNext} loading={processing} />
                </Footer>
            </>
        )
    }
}