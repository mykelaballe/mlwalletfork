import React from 'react'
import {Screen, Footer, Headline, Button, ButtonText, Spacer, TextInput} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

import registered_questions from '../services/registered_security_questions'
import personal_questions from '../services/personal_security_questions'
import transactional_questions from '../services/transactional_security_questions'
import { isAirplaneModeSync } from 'react-native-device-info'

export default class Scrn extends React.Component {

    state = {
        type:'',
        questions:[],
        question:'',
        answer:'',
        processing:false,
        error:''
    }

    componentDidMount = () => {
        const {params = {}} = this.props.navigation.state
        let type = 'registered'
        let questions = registered_questions
        let question = ''

        if(params.questionType) type = params.questionType
        if(params.steps && params.steps.length > 0) type = params.steps[0]

        if(type === 'personal') questions = personal_questions
        else if(type === 'transactional') questions = transactional_questions

        question = this.randomizeQuestion(questions)

        this.setState({
            type,
            questions,
            question
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.question && params.question !== prevState.question) {
            this.props.navigation.setParams({question:''})
            this.setState({
                question:params.question
            })
        }
    }

    randomizeQuestion = questions => questions[parseInt(Math.random() * questions.length)]

    handleChangeAnswer = answer => this.setState({answer})

    handleNext = async () => {
        try {
            const {params = {}} = this.props.navigation.state
            let {question, answer, processing} = this.state

            if(processing) return

            this.setState({processing:true})
            
            answer = answer.trim()

            if(answer == '') Say.some('Enter your answer')
            else {
                let payload = {
                    walletno:params.walletno,
                    question,
                    answer
                }

                if(answer == 'wrong') this.setState({error:'Incorrect Answer'})
                else {
                    if(params.steps) {

                        let steps = params.steps
                        steps.shift()

                        if(params.steps.length > 0) {
                            this.props.navigation.replace('SecurityQuestion',{
                                ...params,
                                steps
                            })
                        }
                        else {
                            this.props.navigation.navigate('Login')
                        }
                    }
                    else {
                        this.props.navigation.navigate('SendPassword',{...payload})
                    }
                }
            }

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
            Say.err('Something went wrong')
        }
    }

    handleChangeQuestion = () => this.props.navigation.navigate('SecurityQuestions',{
        sourceRoute:this.props.navigation.state.routeName,
        type:this.state.type
    })

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
                    <Button disabled={!answer} t={_('62')} onPress={this.handleNext} loading={processing} />
                </Footer>
            </>
        )
    }
}