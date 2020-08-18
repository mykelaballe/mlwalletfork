import React from 'react'
import {StyleSheet, InteractionManager, View, Image} from 'react-native'
import {Screen} from '../components'
import {Colors, Metrics} from '../themes'
import {Say} from '../utils'
import ViewShot from 'react-native-view-shot'
import CameraRoll from '@react-native-community/cameraroll'

const snapShotConfig = {
    format:'jpg',
    quality:.6
}

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Receipt'
    }

    state = {
        receipt:this.props.navigation.state.params.receipt
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.handleExport)

    handleExport = () => {
        this.refs.viewShot.capture()
        .then(uri => {
            CameraRoll.save(uri, {type:'photo'})
            Say.ok('Receipt saved in gallery')
        })
        .catch(err => Say.warn('Cannot download receipt'))
    }

    render() {

        return (
            <>
                <Screen compact>
                    <ViewShot ref='viewShot' options={snapShotConfig}>
                        <View style={style.bannerContainer}>
                            <Image source={require('../res/logo_white.png')} style={style.banner} resizeMode='contain' />
                        </View>
                        {this.state.receipt}
                    </ViewShot>
                </Screen>
            </>
        )
    }
}

const style = StyleSheet.create({
    bannerContainer: {
        backgroundColor:Colors.brand,
        paddingHorizontal:Metrics.xl
    },
    banner: {
        height:100,
        width:undefined
    }
})