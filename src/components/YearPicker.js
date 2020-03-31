import React from 'react'
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native'
import {FlatList, Text} from './'
import {Metrics, Colors} from '../themes'
import {Consts} from '../utils'
import {Portal, Modal} from 'react-native-paper'

const {width} = Dimensions.get('window')
const moment = require('moment')
const MAX_COLUMN = 4
const ITEM_SIZE = width / MAX_COLUMN

const CURRENT_YEAR = parseInt(moment().format('YYYY'))

const ItemUI = props => (
	<View style={{width:ITEM_SIZE,alignItems:'center'}}>
		<TouchableOpacity onPress={() => props.onSelect(props.index)} style={[style.badge,{backgroundColor:props.data.selected ? Colors.brand : 'transparent'}]}>
			<Text center md color={props.data.selected ? Colors.light : Colors.mute}>{props.data.label}</Text>
		</TouchableOpacity>
	</View>
)

export default class YearPicker extends React.Component {

	state = {
		list:[]
	}

	componentDidMount = () => {
		const {initialValue, max, min} = this.props
		let list = []
		let min_year = min || CURRENT_YEAR - Consts.user_max_age
		let max_year = max || CURRENT_YEAR - Consts.user_min_age
		
		for(let i=max_year; i>min_year; i--) {
			list.push({
				label:i,
				selected:initialValue && initialValue == i ? true : false
			})
		}

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
			<Portal>
				<Modal contentContainerStyle={style.modal} visible={visible} onDismiss={onDismiss}>
					<View style={style.content}>
						<FlatList
							data={list}
							renderItem={this.renderItem}
							numColumns={MAX_COLUMN}
							columnWrapperStyle={{justifyContent:'space-around'}}
						/>
					</View>
				</Modal>
			</Portal>
		)
	}
}

const style = StyleSheet.create({
	modal: {
		flex:1,
		justifyContent:'flex-end'
	},
	content: {
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