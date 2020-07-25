import React from 'react'
import {createAppContainer} from 'react-navigation'
import {connect} from 'react-redux'
import AppIntroStack from './AppIntroStack'
import AuthStack from './AuthStack'
import MainStack from './MainStack'
import ForceReenterDataStack from './ForceReenterDataStack'

const AppIntroContainer = createAppContainer(AppIntroStack)
const AuthAppContainer = createAppContainer(AuthStack)
const MainAppContainer = createAppContainer(MainStack)

class Navigation extends React.Component {

    render() {

        const {isFirstTime, isLoggedIn, user} = this.props

        if(isFirstTime) return <AppIntroContainer />

        if(isLoggedIn && user) return <MainAppContainer />
        return <AuthAppContainer />
    }
}

const mapStateToProps = state => ({
    isFirstTime: state.app.isFirstTime,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.user.data
})

export default connect(mapStateToProps)(Navigation)