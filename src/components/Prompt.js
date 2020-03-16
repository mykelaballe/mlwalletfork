import React from 'react'
import {StyleSheet} from 'react-native'
import {Button, Modal, Text, Row, Spacer, TextInput} from './'
import SomeModal from './SomeModal'

export default class Prompt extends React.Component {

	handleConfirm = () => {
		const {onConfirm} = this.props

		if(onConfirm) onConfirm()

		SomeModal.hide()
	}

	handleDismiss = () => {
		const {onConfirm, onDismiss} = this.props

		if(onConfirm) onConfirm()
		else if(onDismiss) onDismiss()

		SomeModal.hide()
	}

	render() {

		const {props} = this

		let btns = <Button t={props.OkBtnLabel || 'OK'} onPress={this.handleDismiss} />

		if(props.type === 'yes_no') {
			btns = (
				<Row bw>
					<Button mode='outlined' style={style.btn} t={props.noBtnLabel || 'No'} onPress={props.onDismiss} />
					<Spacer h xs />
					<Button style={style.btn} t={props.yesBtnLabel || 'Yes'} onPress={this.handleConfirm} />
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

		let message = <Text mute md>{props.message}</Text>

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
				onDismiss={this.handleDismiss}
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