import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, Button, TextInput, Row, Spacer, HR, Ripple} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class SignUpTab4Screen extends React.Component {

    state = {
        new_question:'',
        answer1:'',
        answer2:'',
        answer3:''
    }

    handleNext = () => {
        let {answer1, answer2, answer3} = this.state

        try {

            answer1 = answer1.trim()
            answer2 = answer2.trim()
            answer3 = answer3.trim()

            if(answer1 == '' && answer2 == '' && answer3 == '') Say.some('Please complete all fields')
            else this.props.navigation.navigate('SignUpTab5')
        }
        catch(err) {
            Say.err('Something went wrong')
        }
    }

    handlePrev = () => this.props.navigation.navigate('SignUpTab3')

    handleViewQuestions = () => this.props.navigation.navigate('SecurityQuestions')

    handleChangeAnswer1 = answer1 => this.setState({answer1})

    handleChangeAnswer2 = answer2 => this.setState({answer2})

    handleChangeAnswer3 = answer3 => this.setState({answer3})

    handleChangeNewQuestion = new_question => this.setState({new_question})

    handleAddNewQuestion = () => {
        let {new_question} = this.state

        try {
            new_question = new_question.trim()

            if(new_question == '') Say.some('Enter question') 
            else {
                Say.ok('Added')
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleViewQuestions = () => this.props.navigation.navigate('SecurityQuestions')

    render() {

        const {new_question, answer1, answer2, answer3} = this.state

        return (
            <ScrollView style={{flex:1}}>
                <View style={{backgroundColor:Colors.dark,padding:Metrics.rg}}>
                    <Text center b light>Security Question</Text>
                </View>

                <View style={{flex:1,padding:Metrics.md}}>
                    <TextInput
                        label={'Create your own question'}
                        placeholder='Ex. What is my motto in life?'
                        value={new_question}
                        onChangeText={this.handleChangeNewQuestion}
                    />
                    <Spacer sm />
                    <Button t='Add Question' onPress={this.handleAddNewQuestion} />

                    <Spacer />

                    <Ripple onPress={this.handleViewQuestions} style={{padding:Metrics.sm}}>
                        <Row bw>
                            <Text b>{_('67')} 1</Text>
                            <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                        </Row>
                    </Ripple>
                    <TextInput
                        label={_('80')}
                        value={answer1}
                        onChangeText={this.handleChangeAnswer1}
                    />

                    <Spacer />

                    <Ripple onPress={this.handleViewQuestions} style={{padding:Metrics.sm}}>
                        <Row bw>
                            <Text b>{_('67')} 2</Text>
                            <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                        </Row>
                    </Ripple>
                    <TextInput
                        label={_('80')}
                        value={answer2}
                        onChangeText={this.handleChangeAnswer2}
                    />

                    <Spacer />

                    <Ripple onPress={this.handleViewQuestions} style={{padding:Metrics.sm}}>
                        <Row bw>
                            <Text b>{_('67')} 3</Text>
                            <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                        </Row>
                    </Ripple>
                    <TextInput
                        label={_('80')}
                        value={answer3}
                        onChangeText={this.handleChangeAnswer3}
                    />

                    <Row bw style={{flex:1,alignItems:'flex-end'}}>
                        <Button dark t='Previous' onPress={this.handlePrev} />
                        <Button dark t='Next' onPress={this.handleNext} />
                    </Row>
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({

})

export default SignUpTab4Screen