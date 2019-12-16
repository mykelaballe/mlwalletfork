import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Row, Text} from './'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Ionicons'

class Balance extends React.Component {

    state = {
        show: false
    }

    handleToggle = () => {
        this.setState((prevState, props) => ({
            show: !prevState.show
        }))
    }

    render() {

        const {show} = this.state

        return (
            <Row style={style.toolbar}>
                <View style={{flex:1}}>
                    <Text light center b lg>Balance: PHP {show ? '0.00' : '*.**'}</Text>
                </View>
                <TouchableOpacity onPress={this.handleToggle} style={{alignItems:'flex-end'}}>
                    <Icon name={`ios-eye${show ? '-off' : ''}`} size={Metrics.icon.rg} color={Colors.light} />
                </TouchableOpacity>
            </Row>
        )
    }
}

const style = StyleSheet.create({
    toolbar: {
        justifyContent:'center',
        backgroundColor:Colors.black,
        padding:Metrics.rg
    }
})

export default Balance