import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {withNavigation} from 'react-navigation'
import {Row, Text, Spacer, ButtonText} from './'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Entypo'
import {Func} from '../utils'

class Balance extends React.Component {

    state = {
        show: false
    }

    handleToggle = () => this.setState(prevState => ({show:!prevState.show}))

    handleViewPoints = () => this.props.navigation.navigate('Points')

    render() {

        const {balance} = this.props.user
        const {show} = this.state

        return (
            <View style={style.jumbo}>
                <Text center light md>Available Balance</Text>
                <Row>
                    <Text rg light>Php</Text>
                    <Spacer h xs />
                    <Text b h3 light>{show ? Func.formatToRealCurrency(balance) : '******.**'}</Text>
                    <Spacer h sm />
                    <TouchableOpacity onPress={this.handleToggle}>
                        <Icon name={`eye${!show ? '-with-line' : ''}`} size={Metrics.icon.rg} color={Colors.light} />
                    </TouchableOpacity>
                </Row>
                {/*<ButtonText
                    style={{borderColor:Colors.light}}
                    mode='outlined'
                    color={Colors.light}
                    t='15 ML Diamond Card Points'
                    onPress={this.handleViewPoints}
                />*/}
            </View>
        )
    }
}

const style = StyleSheet.create({
    jumbo: {
        alignItems:'center',
        backgroundColor:Colors.dark,
        paddingVertical:Metrics.md
    },
})

const mapStateToProps = state => ({
    user: state.user.data
})

export default withNavigation(connect(mapStateToProps)(Balance))