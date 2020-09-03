import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Text, Row, Spacer, Avatar, Button, Outline, ScrollFix, HR} from '../components'
import {Metrics} from '../themes'
import {_, Func, Consts, Say} from '../utils'
import ImagePicker from 'react-native-image-picker'
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions'

const moment = require('moment')

const IMG_PICKER_CONFIG = {
    title: 'Profile Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
}

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Profile'
    }

    state = {
        localPhoto:this.props.user.localPhoto
    }

    handleEditProfile = () => this.props.navigation.navigate('EditProfileIndex')

    handleChangeAvatar = () => {
        Say.some(
            '',
            'Change Photo',
            {
                customMessage:(
                    <>
                        <Button icon='camera' t='Camera' onPress={this.handleOpenCamera} />
                        <Spacer xs />
                        <Button icon='image' t='Gallery' onPress={this.handleOpenGallery} />
                        
                        {this.state.localPhoto &&
                        <>
                            <HR m={Metrics.rg} />
                            <Button mode='outlined' t='Remove' onPress={this.handleRemoveLocalPhoto} />
                        </>
                        }
                    </>
                ),
                noBtn:true
            }
        )
    }

    browseLocalPhoto = type => {
        const PERMISSION = Consts.is_android ? PERMISSIONS.ANDROID[type == 'Camera' ? 'CAMERA' : 'READ_EXTERNAL_STORAGE'] : PERMISSIONS.IOS[type == 'Camera' ? 'CAMERA' : 'PHOTO_LIBRARY']

        request(PERMISSION)
        .then(async res => {
            if(res == RESULTS.GRANTED) {
                ImagePicker[`launch${type}`](IMG_PICKER_CONFIG, res => {
                    if(res.uri) {
                        //if(Func.isImage(res.fileName || res.uri)) {
                            Say.hide()
                            this.props.updateInfo({localPhoto:res.uri})
                            this.props.saveLocalPhoto(this.props.user.walletno, res.uri)
                            this.setState({localPhoto:res.uri})
                        }
                        //else Say.warn('File not allowed')
                    }
                })
            }
            else Say.warn('Please allow permission')
        })
    }

    handleOpenCamera = () => this.browseLocalPhoto('Camera')

    handleOpenGallery = () => this.browseLocalPhoto('ImageLibrary')

    handleRemoveLocalPhoto = () => {
        Say.hide()
        this.props.updateInfo({localPhoto:null})
        this.props.saveLocalPhoto(this.props.user.walletno, null)
        this.setState({localPhoto:null})
    }

    render() {

        const {user} = this.props
        const {localPhoto} = this.state

        return (
            <Screen>

                <View style={style.topContainer}>
                    <TouchableOpacity onPress={this.handleChangeAvatar}>
                        <Avatar source={localPhoto || user.remotePhoto} size={Metrics.image.lg} />
                    </TouchableOpacity>

                    <Text sm mute center>Tap to change photo</Text>

                    <Spacer sm />

                    <Text b lg center mute>{Func.formatName(user)}</Text>

                    <Spacer />

                    <Button mode='outlined' icon='pencil' t='Edit Profile' onPress={this.handleEditProfile} />
                </View>

                <ScrollFix>
                    <Outline>
                        <Text sm mute>Username</Text>
                        <Text>{user.username}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Mobile No.</Text>
                        <Text>{Func.formatToPHMobileNumberFull(user.mobileno)}</Text>
                    </Outline>
                
                    <Outline>
                        <Text sm mute>Email address</Text>
                        <Text>{user.emailaddress}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Source of Income</Text>
                        <Text>{user.sourceofincome}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Nature of Work</Text>
                        <Text>{user.natureofwork}</Text>
                    </Outline>

                    <Outline>
                        <Text md>Birthday</Text>
                        <Row ar>
                            <View>
                                <Text sm mute>Month</Text>
                                <Text md>{moment(user.birthdate).format('MMMM')}</Text>
                            </View>
                            <View>
                                <Text sm mute>Day</Text>
                                <Text md>{moment(user.birthdate).format('DD')}</Text>
                            </View>
                            <View>
                                <Text sm mute>Year</Text>
                                <Text md>{moment(user.birthdate).format('YYYY')}</Text>
                            </View>
                        </Row>
                    </Outline>

                    <Outline>
                        <Text sm mute>Gender</Text>
                        <Text>{user.gender}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Nationality</Text>
                        <Text>{user.nationality}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>Country</Text>
                        <Text>{user.country}</Text>
                    </Outline>

                    {user.country === Consts.country.PH &&
                    <>
                        <Outline>
                            <Text sm mute>Province</Text>
                            <Text>{user.province}</Text>
                        </Outline>

                        <Outline>
                            <Text sm mute>City/Municipality</Text>
                            <Text>{user.city}</Text>
                        </Outline>

                        <Outline>
                            <Text sm mute>Barangay</Text>
                            <Text>{user.barangay}</Text>
                        </Outline>
                    </>
                    }

                    <Outline>
                        <Text sm mute>Street</Text>
                        <Text>{user.street}</Text>
                    </Outline>

                    <Outline>
                        <Text sm mute>House/Unit/Floor #, Bldg Name, Block or Lot #</Text>
                        <Text>{user.houseno}</Text>
                    </Outline>

                    {user.country === Consts.country.PH &&
                    <Outline>
                        <Text sm mute>Zip Code</Text>
                        <Text>{user.zipcode}</Text>
                    </Outline>
                    }
                </ScrollFix>
            </Screen>
        )
    }
}

const style = StyleSheet.create({
    topContainer: {
        alignItems:'center'
    }
})

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updateInfo: newInfo => dispatch(Creators.updateUserInfo(newInfo)),
    saveLocalPhoto: (walletno, file) => dispatch(Creators.saveLocalPhoto(walletno, file))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)