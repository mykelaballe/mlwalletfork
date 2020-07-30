import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Card, Spacer, IconButton} from './'
import {Metrics, Colors} from '../themes'
import {Portal, Modal} from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'

export default props => {
	return (
		<Portal>
			<Modal visible={props.visible} onDismiss={props.onDismiss}>
				<Card style={style.card}>
					<View style={style.closeContainer}>
						<IconButton icon='close' onPress={props.onDismiss} />
					</View>
					<Text xl b>{props.title}</Text>

					<Spacer md />

					{props.content}
				</Card>
			</Modal>
		</Portal>
	)
}

const style = StyleSheet.create({
	card: {
		marginHorizontal:Metrics.xl,
		padding:Metrics.lg
	},
	closeContainer: {
		alignItems:'flex-end'
	}
})