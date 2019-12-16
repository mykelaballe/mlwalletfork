import React from 'react'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Portal, Modal} from 'react-native-paper'
import ImagePicker from 'react-native-image-picker'
import {Colors, Metrics} from '../themes'
import {Row, Card, Spacer, Button} from './'
import Icon from 'react-native-vector-icons/Ionicons'

class BrowseMediaModal extends React.Component {

    state = {
        visible:false
    }

    static getDerivedStateFromProps = (props, state) => {
        if(props.visible != state.visible) {
            return {
                visible:props.visible
            }
        }
        
        return null
    }

    handleOpenGallery = () => ImagePicker.launchImageLibrary(null, res => this.processMedia(res))

    handleOpenCamera = () => ImagePicker.launchCamera(null, res => this.processMedia(res))

    processMedia = res => {
        if(res.uri) {
            this.props.setAttachedFiles([res])
            this.handleDismiss()
        }
    }

    handleDismiss = () => this.props.onDismiss()

    render() {

        const {visible} = this.state

        return (
            <Portal>
                <Modal visible={visible} onDismiss={this.handleDismiss}>
                    <Row style={{padding:Metrics.lg,justifyContent:'center'}}>
                        <Card style={{alignItems:'center'}}>
                            <Icon name='ios-images' color={Colors.dark} size={Metrics.icon.lg} />
                            <Spacer sm />
                            <Button t='Gallery' onPress={this.handleOpenGallery} />
                        </Card>
                        <Spacer h />
                        <Card style={{alignItems:'center'}}>
                            <Icon name='ios-camera' color={Colors.dark} size={Metrics.icon.lg} />
                            <Spacer sm />
                            <Button t='Camera' onPress={this.handleOpenCamera} />
                        </Card>
                    </Row>
                </Modal>
            </Portal>
        )
    }
}

mapDispatchToProps = dispatch => {
    return {
        setAttachedFiles:files => dispatch(Actions.setAttachedFiles(files))
    }
}

export default connect(null, mapDispatchToProps)(BrowseMediaModal)