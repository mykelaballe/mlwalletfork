import React from 'react'
import {Screen, Footer, Headline, Button, TextInput, StaticInput, SignUpStepsTracker} from '../components'
import {_, Say} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Security Questions'
    }

    state = {
        question1:'',
        question2:'',
        question3:'',
        answer1:'',
        answer2:'',
        answer3:'',
        processing:false
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.question && params.question !== prevState[params._for]) {
            this.props.navigation.setParams({[params._for]:null})
            this.setState({[params._for]:params.question})
        }
    }

    handleSelectQuestion1 = () => {
        const {state, navigate} = this.props.navigation
        navigate('SecurityQuestions',{sourceRoute:state.routeName, _for:'question1'})
    }

    handleSelectQuestion2 = () => {
        const {state, navigate} = this.props.navigation
        navigate('SecurityQuestions',{sourceRoute:state.routeName, _for:'question2'})
    }

    handleSelectQuestion3 = () => {
        const {state, navigate} = this.props.navigation
        navigate('SecurityQuestions',{sourceRoute:state.routeName, _for:'question3'})
    }

    handleChangeAnswer1 = answer1 => this.setState({answer1})

    handleChangeAnswer2 = answer2 => this.setState({answer2})

    handleChangeAnswer3 = answer3 => this.setState({answer3})

    handleSubmit = async () => {
        let {question1, question2, question3, answer1, answer2, answer3} = this.state

        try {
            answer1 = answer1.trim()
            answer2 = answer2.trim()
            answer3 = answer3.trim()

            if(!question1 || !question2 || !question3 || !answer1 || !answer2 || !answer3) Say.some(_('8'))
            else {
                this.props.navigation.navigate('SignUpReview',{
                    ...this.props.navigation.state.params,
                    question1,
                    answer1,
                    question2,
                    answer2,
                    question3,
                    answer3
                })
            }
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    render() {

        const {question1, question2, question3, answer1, answer2, answer3, processing} = this.state
        let ready = false

        if(question1 && question2 && question3 && answer1 && answer2 && answer3) {
            ready = true
        }

        return (
            <>
                <Screen>
                    <SignUpStepsTracker step={4} />

                    <Headline
                        subtext='To help us verify your identity in case you forget your password, please choose a security question below.'
                    />

                    <StaticInput
                        label={'Security Question 1'}
                        value={question1}
                        onPress={this.handleSelectQuestion1}
                    />

                    <TextInput
                        label={'Answer'}
                        value={answer1}
                        onChangeText={this.handleChangeAnswer1}
                    />

                    <StaticInput
                        label={'Security Question 2'}
                        value={question2}
                        onPress={this.handleSelectQuestion2}
                    />

                    <TextInput
                        label={'Answer'}
                        value={answer2}
                        onChangeText={this.handleChangeAnswer2}
                    />

                    <StaticInput
                        label={'Security Question 3'}
                        value={question3}
                        onPress={this.handleSelectQuestion3}
                    />

                    <TextInput
                        label={'Answer'}
                        value={answer3}
                        onChangeText={this.handleChangeAnswer3}
                    />
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t='Next' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

export default Scrn