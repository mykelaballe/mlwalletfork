import React from 'react'
import {createAppContainer} from 'react-navigation'
import {connect} from 'react-redux'
import AppIntroStack from './AppIntroStack'
import AuthStack from './AuthStack'
import MainStack from './MainStack'

const AppIntroContainer = createAppContainer(AppIntroStack)
const AuthAppContainer = createAppContainer(AuthStack)
const MainAppContainer = createAppContainer(MainStack)

class Navigation extends React.Component {

    render() {

        const {isFirstTime, isLoggedIn} = this.props

        return <AppIntroContainer />

        if(isFirstTime) return <AppIntroContainer />

        if(isLoggedIn) return <MainAppContainer />
        return <AuthAppContainer />
    }
}

const mapStateToProps = state => ({
    isFirstTime: state.app.isFirstTime,
    isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(Navigation)