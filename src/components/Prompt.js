import React from 'react'
import {StyleSheet} from 'react-native'
import {Button, Modal, Text, Row, Spacer} from './'

export default props => {

	let btns = <Button t={props.OkBtnLabel || 'OK'} onPress={props.onConfirm || props.onDismiss} />

	if(props.type === 'yes_no') {
		btns = (
			<Row bw>
				<Button mode='outlined' style={style.btn} t='No' onPress={props.onDismiss} />
				<Spacer h xs />
				<Button style={style.btn} t='Yes' onPress={props.onConfirm} />
			</Row>
		)
	}
	else if(props.type === 'delete') {
		btns = (
			<Row bw>
				<Button mode='outlined' style={style.btn} t='Close' onPress={props.onDismiss} />
				<Spacer h xs />
				<Button style={style.btn} t='Delete' onPress={props.onConfirm} />
			</Row>
		)
	}

	let message = <Text mute>{props.message}</Text>

	if(props.customMessage) message = props.customMessage

	let content = (
		<>
			{message}
			<Spacer md />
			{btns}
		</>
	)

	return (
		<Modal
			visible={props.visible}
			title={props.title}
			onDismiss={props.onDismiss}
			content={content}
		/>
	)
}

const style = StyleSheet.create({
	btn: {
		flex:1
	}
})