import React from 'react'
import {withNavigation} from 'react-navigation'
import {Button} from './'

class BackHomeButton extends React.Component {

    handlePress = () => this.props.navigation.navigate('Home')

    render() {

        return <Button t='Back to Home' onPress={this.handlePress} />
    }
}

export default withNavigation(BackHomeButton)