import React from 'react'
import {StyleSheet, View, ScrollView, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Text, Button, Row, Spacer, HR, Card, BrowseMediaModal} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import ImagePicker from 'react-native-image-picker'
import {Modal, Portal} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'

class SignUpTab3Screen extends React.Component {

    state = {
        selfie:null,
        id1_front:null,
        id1_back:null,
        id2_front:null,
        id2_back:null,
        _for:null,
        showModal:false
    }

    static getDerivedStateFromProps = (props, state) => {
        if(props.attachedFiles[0]) {
            if(props.attachedFiles[0] !== state[state._for]) {
                props.clearAttachedFiles()
                return {
                    [state._for]:props.attachedFiles[0]
                }
            }
        }
        
        return null
    }

    handleNext = () => {
        const {selfie} = this.state
        
        try {
            if(!selfie) Say.some('Please add atleast the main photo')
            else this.props.navigation.navigate('SignUpTab4')
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handlePrev = () => this.props.navigation.navigate('SignUpTab2')

    handleAttachImage = _for => this.setState({_for,showModal:true})

    handleCloseModal = () => this.setState({showModal:false})

    render() {

        const {selfie, id1_front, id1_back, id2_front, id2_back, showModal} = this.state

        return (
            <ScrollView contentContainerStyle={{flex:1}}>

                <BrowseMediaModal
                    visible={showModal}
                    onDismiss={this.handleCloseModal}
                />

                <View style={{backgroundColor:Colors.dark,padding:Metrics.rg}}>
                    <Text center b light>Photo and ID</Text>
                </View>

                <Spacer />

                <View style={{flex:1,padding:Metrics.md}}>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.handleAttachImage('selfie')}>
                            <Image source={selfie ? {uri:selfie.uri} : require('../res/avatar.jpg')} style={style.photo} resizeMode='contain' />
                            <Text center>SELFIE w/ ID</Text>
                        </TouchableOpacity>

                        <Spacer />

                        <Row ar>
                            <TouchableOpacity onPress={() => this.handleAttachImage('id1_front')}>
                                <Image source={id1_front ? {uri:id1_front.uri} : require('../res/avatar.jpg')} style={style.otherPhoto} resizeMode='contain' />
                                <Text center xs>ID1 Front</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleAttachImage('id1_back')}>
                                <Image source={id1_back ? {uri:id1_back.uri} : require('../res/avatar.jpg')} style={style.otherPhoto} resizeMode='contain' />
                                <Text center xs>ID1 Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleAttachImage('id2_front')}>
                                <Image source={id2_front ? {uri:id2_front.uri} : require('../res/avatar.jpg')} style={style.otherPhoto} resizeMode='contain' />
                                <Text center xs>ID2 Front</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleAttachImage('id2_back')}>
                                <Image source={id2_back ? {uri:id2_back.uri} : require('../res/avatar.jpg')} style={style.otherPhoto} resizeMode='contain' />
                                <Text center xs>ID2 Back</Text>
                            </TouchableOpacity>
                        </Row>
                    </View>

                    <Row bw style={{flex:1,alignItems:'flex-end'}}>
                        <Button dark t='Previous' onPress={this.handlePrev} />
                        <Button dark t='Next' onPress={this.handleNext} />
                    </Row>
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    photo: {
        width:200,
        height:200,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.dark
    },
    otherPhoto: {
        width:90,
        height:90,
        marginHorizontal:Metrics.xs,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.dark
    }
})

mapStateToProps = state => {
    return {
        attachedFiles: state.file.attachedFiles
    }
}

mapDispatchToProps = dispatch => {
    return {
        clearAttachedFiles:() => dispatch(Actions.clearAttachedFiles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpTab3Screen)