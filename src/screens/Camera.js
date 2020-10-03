import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native'
import {ButtonText, ButtonIcon, Row, ActivityIndicator, Text} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Consts} from '../utils'
import {RNCamera, Face} from 'react-native-camera'
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import RNFetchBlob from 'rn-fetch-blob'

const {width, height} = Dimensions.get('window')
const FRAME_WIDTH = width * .9
const FRAME_HEIGHT = height * .4
const BASE_WIDTH = 1280
const BASE_HEIGHT = 1920
const QUALITY = 0.7

export default class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title:params.title || 'Camera',
            headerStyle:{
                backgroundColor:Colors.dark
            }
        }
    }

    constructor(props) {
        super(props)
        const {params = {}} = props.navigation.state
        this.mode = params.title == 'Live Photo' ? 'face' : 'id'
        this.state = {
            source:null,
            viewType:this.mode == 'id' ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front,
            eyes:[],
            hasStarted:false,
            didCloseEyes:false,
            hasBlinked:false,
            processing:false
        }
    }

    handleChangeViewType = () => {
        if(this.state.processing) return false
        this.setState(prevState => ({
            viewType:prevState.viewType === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        }))
    }

    handleCapture = () => {
        const {viewType, processing} = this.state

        if(processing) return false

        const PERMISSION = Consts.is_android ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA

        request(PERMISSION)
        .then(async res => {
            if(res == RESULTS.GRANTED) {
                if(this.camera) {

                    try {
                        this.setState({processing:true})
        
                        let source = await this.camera.takePictureAsync({
                            width: Consts.is_android ? BASE_WIDTH : BASE_WIDTH * QUALITY,
                            height: Consts.is_android ? BASE_HEIGHT : BASE_HEIGHT * QUALITY,
                            quality: Consts.is_android ? 0.9 : QUALITY,
                            base64: true,
                            orientation: 'portrait',
                            skipProcessing: true,
                            pauseAfterCapture: true,
                            mirrorImage: viewType == RNCamera.Constants.Type.back ? false : true,
        
                            //Android
                            fixOrientation: true,
        
                            //iOS
                            forceUpOrientation: true
                        })
                        
                        if(!Consts.is_android) source.uri = source.uri.replace('file:///', '/')

                        let filestat = await RNFetchBlob.fs.stat(source.uri)

                        if(filestat.size) source.filesize = filestat.size / 1000 //bytes to kb
        
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

    handleRetake = () => {
        this.setState({
            hasStarted:false,
            didCloseEyes:false,
            hasBlinked:false,
            source:null
        })
    }

    handleConfirm = () => this.props.navigation.navigate(this.props.navigation.state.params.sourceRoute,{source:this.state.source})

    handleFaceDetected = async event => {
        const {faces} = event
        
        if(faces.length > 0) {
            const face = faces[0]
            const {hasStarted, isTakingPicture, didCloseEyes, hasBlinked} = this.state

            if(!isTakingPicture) {
                if(!this.isFacingCamera) {
                    //this.onResetAll()
                    return
                }
                if(!hasStarted && !didCloseEyes && !hasBlinked && this.didBothEyesOpen(face)) {
                    this.onStartProcess()
                    return
                }
                if(hasStarted && !didCloseEyes && !hasBlinked && this.didBothEyesClose(face)) {
                    this.setState({didCloseEyes: true})
                    return
                }
                if(hasStarted && didCloseEyes && !hasBlinked && this.didBothEyesOpen(face)) {
                    this.setState({hasBlinked:true})
                    this.handleCapture()
                    return
                }
            }
        }
    }

    handleFaceDetectionError = () => Say.err('Face Detection Error')

    isFacingCamera = face => {
        const {noseBasePosition} = face
        const {x, y} = noseBasePosition
        const isNoseBaseInDesiredPosition = x >= 0.3 && x <= 0.7 && (y >= 0.2 && y <= 0.6)
        return isNoseBaseInDesiredPosition
    }

    didBothEyesOpen = face => face.leftEyeOpenProbability >= 0.9 && face.rightEyeOpenProbability >= 0.9
    
    onStartProcess = () => this.setState({hasStarted:true})
    
    didBothEyesClose = face => face.leftEyeOpenProbability <= 0.1 && face.rightEyeOpenProbability <= 0.1

    render() {
        
        const {params = {}} = this.props.navigation.state
        const {source, viewType, processing} = this.state
        const isLivePhoto = this.mode == 'face'

        const useFaceDetection = isLivePhoto

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
                        autoFocus={RNCamera.Constants.AutoFocus.on}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        pauseAfterCapture={true}
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
                        <View style={style[isLivePhoto ? 'guideFace' : 'guideID']} />
                    </RNCamera>
                    }
                </View>

                <Row ar style={style.footer}>
                    {!source && 
                    <View style={{alignItems:'center'}}>
                        {processing && <ActivityIndicator />}
                        
                        {!processing &&
                        <>
                            {!isLivePhoto &&
                            <>
                                <Text center sm>Place your ID within the frame and take a picture</Text>
                                <Text center sm>Make sure you're in a well-lighted area.</Text>
                            </>
                            }

                            {isLivePhoto &&
                            <View style={{alignItems:'flex-start'}}>
                                <Text brand b u sm>Friendly reminder:</Text>
                                <Text sm left>Step 1: Make sure you're in a well-lighted area.</Text>
                                <Text sm left>Step 2: Position your face within the frame.</Text>
                                <Text sm left>Step 3: Blink both eyes to take a live photo.</Text>
                            </View>
                            }
                        </>
                        }

                        {(!processing && !isLivePhoto) &&
                        <TouchableOpacity onPress={this.handleCapture}>
                            <FoundationIcon name='record' size={Metrics.icon.xl} color={Colors.brand} />
                        </TouchableOpacity>
                        }

                        {!isLivePhoto &&
                        <ButtonIcon
                            icon={<AntDesignIcon name={viewType === RNCamera.Constants.Type.back ? 'camerao' : 'camera'} size={Metrics.icon.sm} />}
                            onPress={this.handleChangeViewType}
                        />
                        }
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
    guideID: {
        width:FRAME_WIDTH,
        height:FRAME_HEIGHT,
        borderWidth:2,
        borderColor:Colors.brand
    },
    guideFace: {
        width:FRAME_WIDTH,
        height:FRAME_WIDTH,
        borderWidth:2,
        borderRadius:FRAME_WIDTH / 2,
        borderColor:Colors.brand
    },
    footer: {
        paddingVertical: Metrics.xl
    }
})