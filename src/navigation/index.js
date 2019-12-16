import React from 'react'
import {createAppContainer} from 'react-navigation'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import AuthStack from './AuthStack'
import MainStack from './MainStack'

const AuthAppContainer = createAppContainer(AuthStack)
const MainAppContainer = createAppContainer(MainStack)

class Navigation extends React.Component {

    render() {

        const {isLoggedIn} = this.props

        if(isLoggedIn) return <MainAppContainer />
        return <AuthAppContainer />
    }
}

mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps)(Navigation)