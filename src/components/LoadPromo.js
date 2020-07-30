import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors, Metrics} from '../themes'
import {CollapsibleItem, Text} from './'
import {Consts} from '../utils'

class LoadPromo extends React.Component {

	handlePress = () => {
		const {index, onPress} = this.props
		onPress(index)
	}

	render() {

		const {data} = this.props

		let bgColor = !data.collapsed ? Colors.dark : Colors.light
		let txtColor = !data.collapsed ? Colors.dark : Colors.light

		return (
			<View style={[style.container,{backgroundColor:data.collapsed ? Colors.brand : 'transparent'}]}>
				<CollapsibleItem
					data={data}
					leftContent={
						<View style={[style.circle,{borderColor:bgColor}]}>
							<Text center xs color={txtColor}>{Consts.currency.PH}</Text>
							<Text center md color={txtColor}>{data.Amount}</Text>
						</View>
					}
					topContent={
						<View>
							<Text b color={txtColor}>{data.loadType}</Text>
							<Text color={txtColor}>{data.promoCode}</Text>
						</View>
					}
					bottomContent={
						<Text color={txtColor}>{data.promoName}</Text>
					}
					onPress={this.handlePress}
				/>
			</View>
		)
	}
}

const style = StyleSheet.create({
	container: {
		flex:1,
		borderWidth:StyleSheet.hairlineWidth,
		borderColor:Colors.gray,
		padding:Metrics.rg,
		marginVertical:Metrics.sm
	},
    circle: {
        width:60,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.mute,
        borderRadius:60
    }
})

export default LoadPromo