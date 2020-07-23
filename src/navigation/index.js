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
const ForceReenterDataContainer = createAppContainer(ForceReenterDataStack)

class Navigation extends React.Component {

    render() {

        const {isFirstTime, isLoggedIn, isForceUpdate, user} = this.props

        //if(isForceUpdate) return <ForceReenterDataContainer />

        if(isFirstTime) return <AppIntroContainer />

        if(isLoggedIn && user) return <MainAppContainer />
        return <AuthAppContainer />
    }
}

const mapStateToProps = state => ({
    isFirstTime: state.app.isFirstTime,
    isLoggedIn: state.auth.isLoggedIn,
    isForceUpdate: state.auth.isForceUpdate,
    user: state.user.data
})

export default connect(mapStateToProps)(Navigation)