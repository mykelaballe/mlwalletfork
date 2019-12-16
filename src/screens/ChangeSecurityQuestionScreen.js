import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {Text, Button, TextInput, Spacer, Ripple, Row} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const image_res = require('../res/security_questions.png')

class ChangeSecurityQuestionScreen extends React.Component {

    static navigationOptions = {
        title:_('56')
    }

    state = {
        answer1:'',
        answer2:'',
        answer3:''
    }

    handleSubmit = async () => {
        let {answer1, answer2, answer3} = this.state

        try {
            answer1 = answer1.trim()
            answer2 = answer2.trim()
            answer3 = answer3.trim()

            if(answer1 == '' || answer2 == '' || answer3 == '') Say.some(_('8'))
            else {
                Say.ok(_('14'))
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleChangeAnswer1 = answer1 => this.setState({answer1})

    handleChangeAnswer2 = answer2 => this.setState({answer2})

    handleChangeAnswer3 = answer3 => this.setState({answer3})

    handleViewQuestions = () => this.props.navigation.navigate('SecurityQuestions')

    render() {

        const {answer1, answer2, answer3} = this.state

        return (
            <View style={style.container}>

                <View style={style.imageWrapper}>
                    <Image source={image_res} style={style.image} resizeMode='contain' />
                    <Spacer sm />
                    <Text mute center>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                </View>

                <Spacer />
                
                <Ripple onPress={this.handleViewQuestions} style={style.btn}>
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

                <Ripple onPress={this.handleViewQuestions} style={style.btn}>
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

                <Ripple onPress={this.handleViewQuestions} style={style.btn}>
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

                <Spacer />

                <Button t={_('9')} onPress={this.handleSubmit} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.xl
    },
    imageWrapper: {
        alignItems:'center'
    },
    image: {
        width:200,
        height:200
    },
    btn: {
        padding:Metrics.sm
    }
})

export default ChangeSecurityQuestionScreen