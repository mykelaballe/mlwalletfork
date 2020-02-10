import React from 'react'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Screen, Footer, Headline, Text, Button, Spacer, TextInput, StaticInput, SignUpStepsTracker} from '../components'
import {_, Say} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Security Questions'
    }

    state = {
        question1:'What is your nickname?',
        question2:'Who is your favorite teacher?',
        question3:'What was your first phone number?',
        answer1:'',
        answer2:'',
        answer3:'',
        processing:false
    }

    handleSelectQuestion = () => this.props.navigation.navigate('SecurityQuestions')

    handleChangeAnswer1 = answer1 => this.setState({answer1})

    handleChangeAnswer2 = answer2 => this.setState({answer2})

    handleChangeAnswer3 = answer3 => this.setState({answer3})

    handleSubmit = async () => {
        let {question1, question2, question3, answer1, answer2, answer3, processing} = this.state

        if(processing) return false

        try {
            answer1 = answer1.trim()
            answer2 = answer2.trim()
            answer3 = answer3.trim()

            if(question1 == '' || question2 == '' || question3 =='' || answer1 == '' || answer2 == '' || answer3 == '') Say.some(_('8'))
            else {
                this.props.navigation.navigate('SignUpReview')
            }
        }
        catch(err) {
            Say.err(_('18'))
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
                        subtext='Choose security questions below. These questions will help us verify your identity if you need to reset your password'
                    />

                    <StaticInput
                        label={'Security Question 1'}
                        value={question1}
                        onPress={this.handleSelectQuestion}
                    />

                    <TextInput
                        label={'Answer'}
                        value={answer1}
                        onChangeText={this.handleChangeAnswer1}
                    />

                    <StaticInput
                        label={'Security Question 2'}
                        value={question2}
                        onPress={this.handleSelectQuestion}
                    />

                    <TextInput
                        label={'Answer'}
                        value={answer2}
                        onChangeText={this.handleChangeAnswer2}
                    />

                    <StaticInput
                        label={'Security Question 3'}
                        value={question3}
                        onPress={this.handleSelectQuestion}
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