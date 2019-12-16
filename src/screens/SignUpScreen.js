import React from 'react'
import {StyleSheet, View, ScrollView, Picker} from 'react-native'
import {Text, Button, TextInput, Row, Spacer, HR} from '../components'
import {Colors, Metrics} from '../themes'

class SignUpScreen extends React.Component {

    static navigationOptions = {
        title:'Registration'
    }

    state = {
        firstname:''
    }

    handleNext = () => {

    }

    render() {

        const {firstname} = this.state

        return (
            <ScrollView contentContainerStyle={{flex:1,padding:Metrics.md}}>
                <Text center b brand>Input all necessary fields</Text>

                <TextInput
                    label='First Name'
                    value={firstname}
                    onChangeText={() => this.setState({firstname})}
                />

                <TextInput
                    label='Middle Name'
                    value={firstname}
                    onChangeText={() => this.setState({firstname})}
                />

                <TextInput
                    label='Last Name'
                    value={firstname}
                    onChangeText={() => this.setState({firstname})}
                />

                <TextInput
                    label='Email'
                    value={firstname}
                    onChangeText={() => this.setState({firstname})}
                />

                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <Button t='Next' onPress={this.handleNext} />
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({

})

export default SignUpScreen