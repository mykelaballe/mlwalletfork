import React from 'react'
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native'
import {FlatList, Text} from './'
import {Metrics, Colors} from '../themes'
import {Portal, Modal} from 'react-native-paper'

const {width, height} = Dimensions.get('window')
const moment = require('moment')
const MAX_COLUMN = 7
const ITEM_SIZE = width / MAX_COLUMN

const ItemUI = props => (
	<View style={{width:ITEM_SIZE,alignItems:'center'}}>
		<TouchableOpacity onPress={() => props.onSelect(props.index)} style={[style.badge,{backgroundColor:props.data.selected ? Colors.brand : 'transparent'}]}>
			<Text center md color={props.data.selected ? Colors.light : Colors.mute}>{props.data.label}</Text>
		</TouchableOpacity>
	</View>
)

export default class DayPicker extends React.Component {

	state = {
		month:this.props.month,
		initialValue:this.props.initialValue,
		list:[]
	}

	componentDidMount = () => this.listDays()

	componentDidUpdate = (prevProps, prevState) => {
		if(prevState.month != this.props.month) {
			this.setState({
				month:this.props.month
			},this.listDays)
		}
	}

	listDays = () => {
		const {month, initialValue} = this.state
		let list = []

		let numOfDays = moment(`${moment().year()}-${month}`, 'YYYY-MM').daysInMonth()
		
		for(let i=1; i<=numOfDays; i++) {
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