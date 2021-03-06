import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, Button, ButtonText, Spacer, TextInput} from '../components'
import {_, Say, Func, Consts} from '../utils'
import {API} from '../services'

import registered_questions from '../services/registered_security_questions'
import personal_questions from '../services/personal_security_questions'
import transactional_questions from '../services/transactional_security_questions'

class Scrn extends React.Component {

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
            question:question.text || question,
            key:question.key || ''
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.question) {
            const question = params.question.text || params.question
            if(question !== prevState.question) {
                this.props.navigation.setParams({question:''})
                this.setState({
                    question:params.question.text || params.question,
                    key:params.question.key || ''
                }) 
            }
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

                if(key === 'lasttransamount' || key === 'balance') {
                    payload.answer = Func.formatToRealCurrency(payload.answer)
                }

                let securityRes = await API.validateSecurityQuestion(payload)

                if(securityRes.error) {
                    Say.attemptLeft(securityRes.message, {
                        frontMsg:Consts.error.wrongInfo
                    })

                    if(securityRes.message == Consts.error.blk1d && this.props.isLoggedIn) this.props.logout()
                }
                else {
                    if(params.steps) {

                        let steps = params.steps
                        
                        steps.shift()

                        if(params.steps.length > 0) {

                            if(questions.length > 0 && steps[0] == 'registered') {
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
            Say.err(err)
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
            questions.push(q[0])
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
                        editable={!processing}
                        label='Answer'
                        value={answer}
                        onChangeText={this.handleChangeAnswer}
                        autoCapitalize='none'
                        helpText={error}
                    />

                    <Spacer lg />

                    {(!params.questions || params.questions.length > 1) &&
                    <ButtonText disabled={processing} t='Answer a different question' onPress={this.handleChangeQuestion} />
                    }
                </Screen>

                <Footer>
                    <Button disabled={!answer} t={_('62')} onPress={this.handleNext} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
    logout:() => dispatch(Creators.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)