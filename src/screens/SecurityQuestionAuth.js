import React from 'react'
import {Screen, Footer, Headline, Button, ButtonText, Spacer, TextInput} from '../components'
import {_, Say, Func} from '../utils'
import {API} from '../services'

import registered_questions from '../services/registered_security_questions'
import personal_questions from '../services/personal_security_questions'
import transactional_questions from '../services/transactional_security_questions'

export default class Scrn extends React.Component {

    state = {
        type:'',
        questions:[],
        question:'',
        answer:'',
        key:'',
        processing:false,
        error:''
    }

    componentDidMount = () => {
        const {params = {}} = this.props.navigation.state
        let type = 'registered'
        let questions = params.questions || registered_questions
        let question = ''

        if(params.questionType) type = params.questionType

        if(params.steps && params.steps.length > 0) type = params.steps[0]

        if(type === 'personal') questions = personal_questions
        else if(type === 'transactional') questions = transactional_questions

        question = Func.randomize(questions)

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
                question:typeof params.question === 'object' ? params.question.text : params.question,
                key:typeof params.question === 'object' ? params.question.key : ''
            })
        }
    }

    handleChangeAnswer = answer => this.setState({answer})

    handleNext = async () => {
        try {
            const {params = {}} = this.props.navigation.state
            let {type, questions, question, answer, key, processing} = this.state

            if(processing) return

            this.setState({processing:true})
            
            answer = answer.trim()

            if(!answer) Say.some('Enter your answer')
            else {
                let payload = {
                    wallet_no:params.walletno,
                    type,
                    question,
                    answer,
                    key
                }

                let securityRes = await API.validateSecurityQuestion(payload)

                if(securityRes.error) Say.warn('Invalid security question or answer')
                else {
                    if(params.steps) {

                        let steps = params.steps
                        
                        steps.shift()

                        if(params.steps.length > 0) {

                            if(questions.length > 0) {
                                let index = questions.indexOf(question)
                                questions.splice(index, 1)
                            }

                            this.props.navigation.replace('SecurityQuestion',{
                                ...params,
                                questions,
                                steps
                            })
                        }
                        else {
                            if(params.func) params.func()
                        }
                    }
                    else if(params.func) params.func()
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    handleChangeQuestion = () => {
        const {params = {}} = this.props.navigation.state
        const {type} = this.state
        let questions = this.state.questions.slice()

        if(params.questions && type === 'registered') {
            let n = Math.floor(Math.random() * (questions.length - 2))
            let q = questions.splice(n,1)
            questions.push(q)
            this.setState({
                questions,
                question:questions[n]
            })
        }
        else {
            this.props.navigation.navigate('SecurityQuestions',{
                sourceRoute:this.props.navigation.state.routeName,
                type:this.state.type
            })
        }
    }

    render() {

        const {params = {}} = this.props.navigation.state
        const {question, answer, processing, error} = this.state

        return (
            <>
                <Screen>
                    <Headline
                        title='Security Question'
                        subtext={typeof question === 'object' ? question.text : question}
                    />

                    <TextInput
                        label='Answer'
                        value={answer}
                        onChangeText={this.handleChangeAnswer}
                        autoCapitalize='none'
                        helpText={error}
                    />

                    <Spacer lg />

                    {(!params.questions || params.questions.length > 1) &&
                    <ButtonText t='Answer a different question' onPress={this.handleChangeQuestion} />
                    }
                </Screen>

                <Footer>
                    <Button disabled={!answer} t={_('62')} onPress={this.handleNext} loading={processing} />
                </Footer>
            </>
        )
    }
}