import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Screen, Footer, Text, ButtonText, ButtonIcon, Spacer, Row, HR, ActivityIndicator} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {RNCamera} from 'react-native-camera'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FoundationIcon from 'react-native-vector-icons/Foundation'

const {width} = Dimensions.get('window')

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Capture Live Photo',
        headerStyle:{
            backgroundColor:Colors.dark
        }
    }

    state = {
        source:null,
        viewType:RNCamera.Constants.Type.back,
        processing:false
    }

    handleChangeViewType = () => {
        this.setState(prevState => ({
            viewType:prevState.viewType === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        }))
    }

    handleCapture = async () => {
        const {processing} = this.state

        if(processing) return false

        if(this.camera) {

            this.setState({processing:true})

            //base64, width, height, pictureOrientation, deviceOrientation
            let source = await this.camera.takePictureAsync({
                width: 720,
                height: 540,
                quality: 0.5,
                base64: true
            })

            //alert(source.width + '\n' + source.height + '\n' + source.pictureOrientation + '\n' + source.deviceOrientation)

            //source.base64 = `data:image/jpeg;base64,${source.bsae64}`

            this.setState({
                source,
                processing:false
            })
        }
    }

    handleRetake = () => this.setState({source:null})

    handleConfirm = () => {
        this.props.navigation.pop()
    }

    render() {

        const {source, viewType, processing} = this.state

        return (
            <> 
                <View style={style.container}>
                    {source && <Image source={{uri:source.uri}} style={{flex:1,width}} resizeMode='contain' />}
                    
                    {!source &&
                    <RNCamera
                        ref={ref => this.camera = ref}
                        style={style.preview}
                        type={viewType}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                    />
                    }
                </View>

                <Row ar style={style.footer}>
                    {!source && 
                    <View style={{alignItems:'center'}}>
                        {processing && <ActivityIndicator />}

                        {!processing &&
                        <TouchableOpacity onPress={this.handleCapture}>
                            <FoundationIcon name='record' size={Metrics.icon.xl} color={Colors.brand} />
                        </TouchableOpacity>
                        }

                        <ButtonIcon
                            icon={<AntDesignIcon name={viewType === RNCamera.Constants.Type.back ? 'camerao' : 'camera'} size={Metrics.icon.sm} />}
                            onPress={this.handleChangeViewType}
                        />
                    </View>
                    }
                    
                    {source &&
                    <>
                        <ButtonText t='Retake' onPress={this.handleRetake} />
                        <ButtonText t='Use this Photo' onPress={this.handleConfirm} />
                    </>
                    }
                </Row>
            </>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.black,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    footer: {
        paddingVertical: Metrics.xl
    }
})

export default Scrn