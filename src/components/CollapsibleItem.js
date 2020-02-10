import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Colors, Metrics, Res} from '../themes'
import {Text, Spacer, Row, HR} from './'
import Icon from 'react-native-vector-icons/Ionicons'

class CollapsibleItem extends React.Component {

	state = {
		collapsed:false
	}

	handleToggle = () => {
		let {collapsed} = this.state
		const {data, onPress} = this.props
		if(data && onPress) onPress(data)
		this.setState({
			collapsed:!collapsed
		})
	}

	render() {

		const {leftContent, topContent, bottomContent} = this.props
		const {collapsed} = this.state

		return (
			<TouchableOpacity onPress={this.handleToggle} style={{...this.props.style}}>
				<Row bw style={style.outerRow}>
					<Row style={{flex:1}}>
						
						{leftContent &&
						<>
							{leftContent}
							<Spacer h />
						</>
						}
						
						<View style={{flex:1}}>
							{topContent}
							
							{collapsed &&
							<>
								<Spacer h sm />
								{bottomContent}
							</>
							}
						</View>
					</Row>

					<Icon name={`ios-arrow-${collapsed ? 'up' : 'down'}`} size={Metrics.icon.sm} color={Colors.gray} />
				</Row>
			</TouchableOpacity>
		)
	}
}

const style = StyleSheet.create({
	outerRow: {
		paddingVertical:Metrics.rg
    }
})

export default CollapsibleItem