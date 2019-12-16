import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, Button, TextInput, Row, Spacer, HR, Ripple} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {Checkbox} from 'react-native-paper'

class SignUpTab5Screen extends React.Component {

    state = {
        username:'',
        password:'',
        confirm_password:'',
        agree:false
    }

    handleDone = () => {
        this.props.navigation.replace('RegisterSuccess')
    }

    handlePrev = () => this.props.navigation.navigate('SignUpTab4')

    handleChangeUsername = username => this.setState({username})

    handleChangePassword = password => this.setState({password})

    handleChangeConfirmPassword = confirm_password => this.setState({confirm_password})

    handleToggleTerms = () => this.setState(prevState => ({agree:!prevState.agree}))

    handleTerms = () => this.props.navigation.navigate('TermsAndConditions')

    render() {

        const {username, password, confirm_password, agree} = this.state

        return (
            <ScrollView contentContainerStyle={style.container}>
                <View style={style.header}>
                    <Text center b light>User Access and Agreement</Text>
                </View>

                <View style={{flex:1,padding:Metrics.md}}>

                    <TextInput
                        label={'Username / Login ID'}
                        value={username}
                        onChangeText={this.handleChangeUsername}
                        autoCapitalize='none'
                    />
                    <Text sm>Username must be atleast six (6) characters with  a combination of number</Text>
                    
                    <TextInput
                        label={_('2')}
                        value={password}
                        onChangeText={this.handleChangePassword}
                        autoCapitalize='none'
                        secureTextEntry
                    />

                    <TextInput
                        label={_('49')}
                        value={confirm_password}
                        onChangeText={this.handleChangeConfirmPassword}
                        autoCapitalize='none'
                        secureTextEntry
                    />

                    <Spacer />

                    <Row>
                        <Checkbox
                            status={agree ? 'checked' : 'unchecked'}
                            onPress={this.handleToggleTerms}
                        />
                        <Ripple onPress={this.handleTerms}>
                            <Text sm>I agree to terms and conditions</Text>
                        </Ripple>
                    </Row>

                    <Row bw style={style.footer}>
                        <Button dark t='Previous' onPress={this.handlePrev} />
                        <Button dark t='Done' onPress={this.handleDone} />
                    </Row>
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1
    },
    header: {
        backgroundColor:Colors.dark,
        padding:Metrics.rg
    },
    footer: {
        flex:1,
        alignItems:'flex-end'
    }
})

export default SignUpTab5Screen