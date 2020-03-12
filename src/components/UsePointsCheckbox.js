import React from 'react'
import {connect} from 'react-redux'
import {Prompt, Checkbox, Text, Spacer} from './'

class UsePointsCheckbox extends React.Component {

    state = {
        points:'0',
        is_checked:false,
        showModal:false
    }

    handleChangeText = points => this.setState({points})

    handleToggle = () => this.setState(prevState => ({
        is_checked:!prevState.is_checked,
        showModal:!prevState.is_checked
    }))

    handleConfirm = () => {
        this.props.onChange(this.state.points)
        this.handleClose()
    }

    handleClose = () => {
        this.setState(prevState => ({
            showModal:false,
            points:parseInt(prevState.points) > 0 ? prevState.points : '0'
        }))
    }

    render() {

        const {points, is_checked, showModal} = this.state

        return (
            <>
                <Prompt
                    visible={showModal}
                    title='Use Points'
                    customMessage={
                        <>
                            <Text md center>You currently have {this.props.user.points}</Text>
                            <Text md center b>ML Diamond Card points.</Text>

                            <Spacer />

                            <Text md center>Type how many points you want to use for this transaction.</Text>
                        </>
                    }
                    type='input'
                    inputProps={{
                        label:'Points',
                        value:points,
                        keyboardType:'numeric',
                        onChangeText:this.handleChangeText
                    }}
                    onConfirm={this.handleConfirm}
                    onDismiss={this.handleClose}
                />

                <Checkbox status={is_checked} label='Use my points' onPress={this.handleToggle} />
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(UsePointsCheckbox)