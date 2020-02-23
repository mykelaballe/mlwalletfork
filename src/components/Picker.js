import React from 'react'
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import {Text, ButtonText, Row} from './'
import {Colors, Metrics} from '../themes'
import {Menu} from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'

export default class Picker extends React.Component {

    state = {
        visible:false
    }

    handleToggle = () => this.setState(prevState => ({visible:!prevState.visible}))

    handleChoose = item => {
        const {onChoose} = this.props
        onChoose(item)
        this.handleToggle()
    }

    handleOnClear = () => this.props.onChoose()
    
    render() {

        const {selected, items, placeholder, editable} = this.props
        const {visible} = this.state
        const value = selected && selected !== '' ? selected : null

        const pickerContent = (
            <Row bw style={style.btn}>
                <Text mute md>{value || placeholder}</Text>
                {(!value || editable === false) && <Icon name='down' color={Colors.gray} />}

                {(value && (typeof editable === 'undefined' || editable === true)) &&
                <TouchableOpacity onPress={this.handleOnClear}>
                    <Icon name='closecircle' color={Colors.gray} size={Metrics.icon.sm} />
                </TouchableOpacity>
                }
            </Row>
        )

        if(typeof editable !== 'undefined' && editable === false) {
            return pickerContent
        }

        return (
            <Menu
                style={style.menu}
                visible={visible}
                onDismiss={this.handleToggle}
                anchor={
                    <TouchableOpacity onPress={this.handleToggle}>
                        {pickerContent}
                    </TouchableOpacity>
                }
            >
                {items.map((f, i) => <ButtonText key={i} t={f.label} onPress={() => this.handleChoose(f)} />)}
            </Menu>
        )
    }
}

const style = StyleSheet.create({
    menu: {
        width:Dimensions.get('window').width - (Metrics.md * 2)
    },
    btn: {
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.lightgray,
        borderRadius:Metrics.sm,
        padding:Metrics.md,
        marginVertical:Metrics.sm
    },
})