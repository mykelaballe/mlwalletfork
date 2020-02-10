import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {FlatList, Text} from './'
import {Metrics, Colors} from '../themes'
import {Consts} from '../utils'
import {Modal} from 'react-native-paper'

const moment = require('moment')

const CURRENT_YEAR = parseInt(moment().format('YYYY'))
const MAX_YEAR = CURRENT_YEAR - Consts.user_min_age
const MIN_YEAR = CURRENT_YEAR - Consts.user_max_age

const ItemUI = props => (
	<TouchableOpacity onPress={() => props.onSelect(props.index)} style={[style.badge,{backgroundColor:props.data.selected ? Colors.brand : 'transparent'}]}>
		<Text center md color={props.data.selected ? Colors.light : Colors.mute}>{props.data.label}</Text>
	</TouchableOpacity>
)

export default class YearPicker extends React.Component {

	state = {
		list:[]
	}

	componentDidMount = () => {
		let list = []
		
		for(let i=MIN_YEAR; i<=MAX_YEAR; i++) list.push({label:i})

		this.setState({list})
	}

	handleSelect = index => {
		const {onSelect, onDismiss} = this.props
		let list = this.state.list.slice()
		
		list.map(m => m.selected = false)
		list[index].selected = true

		onSelect(list[index].label)
		onDismiss()
	}

	renderItem = ({item, index}) => <ItemUI index={index} data={item} onSelect={this.handleSelect} />

	render() {

		const {list} = this.state
		const {visible, onDismiss} = this.props

		return (
			<Modal contentContainerStyle={style.modal} visible={visible} onDismiss={onDismiss}>
				<View style={style.content}>
					<FlatList
						data={list}
						renderItem={this.renderItem}
						numColumns={4}
						columnWrapperStyle={{justifyContent:'space-around'}}
					/>
				</View>
			</Modal> 
		)
	}
}

const style = StyleSheet.create({
	modal: {
		flex:1,
		justifyContent:'flex-end'
	},
	content: {
		maxHeight:300,
		backgroundColor:Colors.light
	},
	badge: {
        marginVertical:Metrics.lg,
        height:45,
        width:45,
        borderRadius:45,
        justifyContent:'center',
        alignItems:'center'
    }
})