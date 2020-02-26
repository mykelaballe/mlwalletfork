import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {FlatList, Text} from './'
import {Metrics, Colors} from '../themes'
import {Modal} from 'react-native-paper'

const ItemUI = props => (
	<TouchableOpacity onPress={() => props.onSelect(props.index)} style={[style.badge,{backgroundColor:props.data.selected ? Colors.brand : 'transparent'}]}>
		<Text center md color={props.data.selected ? Colors.light : Colors.mute}>{props.data.label}</Text>
	</TouchableOpacity>
)

export default class MonthPicker extends React.Component {

	state = {
		list:[
			{label:'Jan'},
			{label:'Feb'},
			{label:'Mar'},
			{label:'Apr'},
			{label:'May'},
			{label:'Jun'},
			{label:'Jul'},
			{label:'Aug'},
			{label:'Sep'},
			{label:'Oct'},
			{label:'Nov'},
			{label:'Dec'},
		]
	}

	componentDidMount = () => {
		const {initialValue} = this.props
		let list = this.state.list.slice()

		if(initialValue) {
			list.map((l, i) => {
				if(i == (initialValue - 1)) {
					l.selected = true
				}
			})
		}

		this.setState({list})
	}

	handleSelect = index => {
		const {onSelect, onDismiss} = this.props
		let list = this.state.list.slice()
		
		list.map(m => m.selected = false)
		list[index].selected = true

		onSelect(index + 1)
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
						numColumns={3}
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