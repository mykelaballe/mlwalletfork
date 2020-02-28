import React from 'react'
import {Screen, Footer, Headline, Button, ButtonText, Spacer, TextInput} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

import registered_questions from '../services/registered_security_questions'
import personal_questions from '../services/personal_security_questions'
import transactional_questions from '../services/transactional_security_questions'

export default class Scrn extends React.Component {

    state = {
        question:this.randomizeQuestion(),
        answer:'',
        processing:false,
        error:''
    }

    componentDidMount = () => {
        //const {} = this.props.navigation.state.params
    }

    randomizeQuestion = () => {
        return registered_questions[parseInt(Math.random() * registered_questions.length)]
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

        const {question, answer, processing, error} = this.state

        return (
            <>
                <Screen>
                    <Headline
                        title='Security Question'
                        subtext={question}
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