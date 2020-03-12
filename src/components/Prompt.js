import React from 'react'
import {StyleSheet} from 'react-native'
import {Button, Modal, Text, Row, Spacer, TextInput} from './'

export default class Prompt extends React.Component {

	render() {

		const {props} = this

		let btns = <Button t={props.OkBtnLabel || 'OK'} onPress={props.onConfirm || props.onDismiss} />

		if(props.type === 'yes_no') {
			btns = (
				<Row bw>
					<Button mode='outlined' style={style.btn} t={props.noBtnLabel || 'No'} onPress={props.onDismiss} />
					<Spacer h xs />
					<Button style={style.btn} t={props.yesBtnLabel || 'Yes'} onPress={props.onConfirm} />
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

				{props.type === 'input' && <TextInput {...props.inputProps} />}

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
}

const style = StyleSheet.create({
	btn: {
		flex:1
	}
})