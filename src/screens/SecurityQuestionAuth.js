import React from 'react'
import {Screen, Footer, Headline, Text, Button, ButtonText, Spacer, TextInput} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

export default class Scrn extends React.Component {

    state = {
        answer:'',
        processing:false,
        error:''
    }

    handleChangeAnswer = answer => this.setState({answer})

    handleNext = async () => {
        try {
            let {answer, processing} = this.state

            if(processing) return

            this.setState({processing:true})
            
            answer = answer.trim()

            if(answer == '') Say.some('Enter your answer')
            else {
                if(answer == 'wrong') this.setState({error:'Incorrect Answer'})
                else this.props.navigation.navigate('SendPassword')
            }

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
            Say.err('Something went wrong')
        }
    }

    handleChangeQuestion = () => this.props.navigation.navigate('SecurityQuestions')

    render() {

        const {answer, processing, error} = this.state

        return (
            <>
                <Screen>
                    <Headline
                        title='Security Question'
                        subtext="What is your mother's maiden name?"
                    />

                    <TextInput
                        label='Answer'
                        value={answer}
                        onChangeText={this.handleChangeAnswer}
                        autoCapitalize='none'
                        helpText={error}
                    />

                    <Spacer lg />

                    <ButtonText t='Answer a different question' onPress={this.handleChangeQuestion} />
                </Screen>

                <Footer>
                    <Button disabled={!answer} t='Next' onPress={this.handleNext} loading={processing} />
                </Footer>
            </>
        )
    }
}