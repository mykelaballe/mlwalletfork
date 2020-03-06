import React from 'react'
import {Screen, Footer, Headline, Button, ButtonText, Spacer, TextInput} from '../components'
import {_, Say} from '../utils'
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
                    wallet_no:params.walletno,
                    question,
                    answer
                }

                let securityRes = await API.validateSecurityQuestion(payload)

                if(securityRes.error) Say.some('Invalid security question and answer')
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
                            if(params.purpose && params.purpose == 'updateDevice') {
                                let updateDeviceRes = await API.updateDevice({
                                    username:params.username
                                })
                                
                                if(!updateDeviceRes.error) {
                                    Say.some('New device successfully registered')
                                    this.props.navigation.navigate('Login')
                                }
                            }
                        }
                    }
                    else {
                        this.props.navigation.navigate('SendPassword',{...payload})
                    }
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
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