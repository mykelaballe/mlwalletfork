import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native'
import {ButtonText, ButtonIcon, Row, ActivityIndicator, Text} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Consts} from '../utils'
import {RNCamera} from 'react-native-camera'
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FoundationIcon from 'react-native-vector-icons/Foundation'

const {width, height} = Dimensions.get('window')

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title:params.title || 'Camera',
            headerStyle:{
                backgroundColor:Colors.dark
            }
        }
    }

    state = {
        source:null,
        viewType:RNCamera.Constants.Type.back,
        eyes:[],
        processing:false
    }

    handleChangeViewType = () => {
        if(this.state.processing) return false
        this.setState(prevState => ({
            viewType:prevState.viewType === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        }))
    }

    handleCapture = () => {
        const {processing} = this.state

        if(processing) return false

        const PERMISSION = Consts.is_android ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA

        request(PERMISSION)
        .then(async res => {
            if(res == RESULTS.GRANTED) {
                if(this.camera) {

                    try {
                        this.setState({processing:true})
        
                        //base64, width, height, pictureOrientation, deviceOrientation
                        let source = await this.camera.takePictureAsync({
                            //width: 480,
                            //height: 720,
                            quality: 0.7,
                            base64: true,
                            orientation: 'portrait',
                            skipProcessing:true,
                            mirrorImage:true,
        
                            //Android
                            fixOrientation:true,
        
                            //iOS
                            forceUpOrientation:true
                        })
        
                        //source.base64 = `data:image/jpeg;base64,${source.bsae64}`
        
                        this.setState({source})
                    }
                    catch(err) {
                        if(Consts.is_android) {
                            this.camera.pausePreview()
                            this.camera.resumePreview()
                        }
                        Say.err(err)
                    }
        
                    this.setState({processing:false})
                }
            }
            else if(res == RESULTS.UNAVAILABLE) Say.warn('This feature is not available')
            else Say.warn('Please allow the app to use the camera')
        })
    }

    handleRetake = () => this.setState({source:null})

    handleConfirm = () => {
        this.props.navigation.navigate(this.props.navigation.state.params.sourceRoute,{source:this.state.source.base64})
    }

    handleFaceDetected = async data => {
        if(this.state.processing) return false

        if(data.faces.length > 0) {
            const leftEye = data.faces[0].leftEyeOpenProbability
            const rightEye = data.faces[0].rightEyeOpenProbability

            let bothEyes = (leftEye + rightEye) / 2
            bothEyes = parseFloat(bothEyes.toFixed(2))

            let eyes = this.state.eyes.slice()

            eyes.push(bothEyes)

            let hasClose = false

            for(let e in eyes) {
                let eye = eyes[e]
                
                if(eye <= 0.3) hasClose = true
            }

            if(hasClose) {
                eyes = []
                this.handleCapture()
            }

            this.setState({eyes})
        }
    }

    handleFaceDetectionError = () => alert('Face Detection Error')

    render() {
        
        const {params = {}} = this.props.navigation.state
        const {source, viewType, processing} = this.state
        const isLivePhoto = params.title == 'Live Photo'

        const useFaceDetection = false

        return (
            <> 
                <View style={style.container}>
                    {source && <Image source={{uri:source.uri}} style={{flex:1,width}} resizeMode='contain' />}
                    
                    {!source &&
                    <RNCamera
                        ref={ref => this.camera = ref}
                        style={style.preview}
                        type={viewType}
                        captureAudio={false}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        faceDetectionMode={useFaceDetection ? RNCamera.Constants.FaceDetection.Mode.accurate : undefined}
                        faceDetectionLandmarks={useFaceDetection ? RNCamera.Constants.FaceDetection.Landmarks.all : undefined}
                        faceDetectionClassifications={useFaceDetection ? RNCamera.Constants.FaceDetection.Classifications.all : undefined}
                        onFacesDetected={useFaceDetection ? this.handleFaceDetected : undefined}
                        onFaceDetectionError={useFaceDetection ? this.handleFaceDetectionError : undefined}
                    >
                        {!isLivePhoto && <View style={style.guide} />}
                    </RNCamera>
                    }
                </View>

                <Row ar style={style.footer}>
                    {!source && 
                    <View style={{alignItems:'center'}}>
                        {processing && <ActivityIndicator />}
                        
                        {!processing &&
                        <Text center sm>{isLivePhoto ? 'Take a clear selfie' : 'Place your ID within the frame and take a picture'}</Text>
                        }

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
        justifyContent: 'center',//'flex-end',
        alignItems: 'center',
    },
    guide: {
        width:width * .9,
        height:height * .4,
        borderWidth:2,
        borderColor:Colors.success
    },
    footer: {
        paddingVertical: Metrics.xl
    }
})

export default Scrn