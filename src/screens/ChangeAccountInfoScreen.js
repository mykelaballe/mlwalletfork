import React from 'react'
import {StyleSheet, View, Image, Picker, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Text, Button, TextInput, Spacer, TopBuffer, Row, HR, BrowseMediaModal, ScrollView} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
import {RadioButton, Portal, Modal} from 'react-native-paper'

class ChangeAccountInfoScreen extends React.Component {

    static navigationOptions = {
        title:'Account Information'
    }

    state = {
        selfie:null,
        id1_front:null,
        id1_back:null,
        id2_front:null,
        id2_back:null,
        _for:null,
        showModal:false,
        country:'',
        province:'',
        city:'',
        barangay:'',
        zip_code:'',
        gender:'Male',
        mobile_number:'',
        work_nature:'',
        nationality:''
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

    handleAttachImage = _for => this.setState({_for,showModal:true})

    handleSave = () => {
        let {selfie, id1_front, id1_back, id2_front, id2_back, gender} = this.state

        try {

        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleClosePhotoModal = () => this.setState({showModal:false})

    handleChangeCountry = country => this.setState({country})

    handleChangeProvince = province => this.setState({province})

    handleChangeCity = city => this.setState({city})

    handleChangeBarangay = barangay => this.setState({barangay})

    handleChangeZipCode = zip_code => this.setState({zip_code})

    handleChangeMobileNumber = mobile_number => this.setState({mobile_number})

    handleChangeWorkNature = work_nature => this.setState({work_nature})

    handleChangeNationality = nationality => this.setState({nationality})

    render() {

        const {selfie, id1_front, id1_back, id2_front, id2_back, showModal, country, province, city, barangay, zip_code, gender, mobile_number, work_nature, nationality} = this.state

        return (
            <ScrollView contentContainerStyle={style.container}>

                <BrowseMediaModal
                    visible={showModal}
                    onDismiss={this.handleClosePhotoModal}
                />

                <Row>
                    <TouchableOpacity onPress={() => this.handleAttachImage('selfie')}>
                        <Image
                            source={{uri:'https://www.burges-salmon.com/-/media/images/profile-images/john-smith.jpg?h=250&la=en&mw=250&w=250&hash=0D9E913C3C069238FC61E93EDE573F9938F19527'}}
                            style={style.avatar}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <Spacer sm h />
                    <View style={{flex:1}}>
                        <Text lg b>John Smith</Text>
                        <Text md>09123456789</Text>
                        <Text>mykelaballe@gmail.com</Text>
                    </View>
                </Row>

                <Spacer />

                <Row ar>
                    <TouchableOpacity onPress={() => this.handleAttachImage('id1_front')}>
                        <Image source={id1_front ? {uri:id1_front.uri} : require('../res/avatar.jpg')} style={style.id} resizeMode='contain' />
                        <Text center xs>ID1 Front</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleAttachImage('id1_back')}>
                        <Image source={id1_back ? {uri:id1_back.uri} : require('../res/avatar.jpg')} style={style.id} resizeMode='contain' />
                        <Text center xs>ID1 Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleAttachImage('id2_front')}>
                        <Image source={id2_front ? {uri:id2_front.uri} : require('../res/avatar.jpg')} style={style.id} resizeMode='contain' />
                        <Text center xs>ID2 Front</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleAttachImage('id2_back')}>
                        <Image source={id2_back ? {uri:id2_back.uri} : require('../res/avatar.jpg')} style={style.id} resizeMode='contain' />
                        <Text center xs>ID2 Back</Text>
                    </TouchableOpacity>
                </Row>

                <Spacer sm />

                <HR />

                <Spacer />

                <View>
                    <Text md brand center>Profile</Text>

                    <Spacer sm />

                    <Row>
                        <Text md style={style.pickerLabel}>Country</Text>
                        <Spacer h />
                        <Picker
                            style={{flex:1}}
                            selectedValue={country}
                            onValueChange={this.handleChangeCountry}
                            prompt='Country'
                        >
                            <Picker.Item key={0} label='Philippines' value={'Philippines'} />
                            <Picker.Item key={1} label='Polan' value={'Polan'} />
                            <Picker.Item key={2} label='Portugal' value={'Portugal'} />
                            <Picker.Item key={3} label='Qatar' value={'Qatar'} />
                            <Picker.Item key={4} label='Romania' value={'Romania'} />
                            <Picker.Item key={5} label='Russia' value={'Russia'} />
                        </Picker>
                    </Row>

                    <Row>
                        <Text md style={style.pickerLabel}>Province</Text>
                        <Spacer h />
                        <Picker
                            style={{flex:1}}
                            selectedValue={province}
                            onValueChange={this.handleChangeProvince}
                            prompt='Province'
                        >
                            <Picker.Item key={0} label='Cebu' value={'Cebu'} />
                            <Picker.Item key={1} label='Cotabato' value={'Cotabato'} />
                        </Picker>
                    </Row>

                    <Row>
                        <Text md style={style.pickerLabel}>City</Text>
                        <Spacer h />
                        <Picker
                            style={{flex:1}}
                            selectedValue={city}
                            onValueChange={this.handleChangeCity}
                            prompt='City'
                        >
                            <Picker.Item key={0} label='Alcantara' value={'Alcantara'} />
                            <Picker.Item key={1} label='Alcoy' value={'Alcoy'} />
                            <Picker.Item key={2} label='Alegria' value={'Alegria'} />
                            <Picker.Item key={3} label='Aloguinsan' value={'Aloguinsan'} />
                            <Picker.Item key={4} label='Argao' value={'Argao'} />
                        </Picker>
                    </Row>

                    <TextInput
                        label='Barangay / Street'
                        value={barangay}
                        onChangeText={this.handleChangeBarangay}
                        autoCapitalize='words'
                    />

                    <TextInput
                        label='Zip Code'
                        value={zip_code}
                        onChangeText={this.handleChangeZipCode}
                        keyboardType='numeric'
                    />

                    <Spacer sm />

                    <Row>
                        <Text md style={style.pickerLabel}>Gender</Text>
                        <Spacer h />
                        <Row>
                            
                            <RadioButton.Group onValueChange={this.handleChangeGender} value={gender}>
                                <RadioButton value='Male' />
                                <Text md>Male</Text>

                                <RadioButton value='Female' />
                                <Text md>Female</Text>
                            </RadioButton.Group>
                        </Row>
                    </Row>

                    <TextInput
                        label='Mobile Number'
                        value={mobile_number}
                        onChangeText={this.handleChangeMobileNumber}
                        keyboardType='numeric'
                    />

                    <TextInput
                        label='Nature of Work'
                        value={work_nature}
                        onChangeText={this.handleChangeWorkNature}
                        autoCapitalize='words'
                    />

                    <Row>
                        <Text md style={style.pickerLabel}>Nationality</Text>
                        <Spacer h />
                        <Picker
                            style={{flex:1}}
                            selectedValue={nationality}
                            onValueChange={this.handleChangeNationality}
                            prompt='Nationality'
                        >
                            <Picker.Item key={0} label='Filipino' value={'Filipino'} />
                            <Picker.Item key={1} label='American' value={'American'} />
                            <Picker.Item key={2} label='Canadian' value={'Canadian'} />
                        </Picker>
                    </Row>
                </View>

                <Spacer />

                <Button t='Save' onPress={this.handleSave} />
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        padding:Metrics.xl
    },
    pickerLabel: {
        width:100,
        paddingLeft:Metrics.rg
    },
    avatar: {
        width:80,
        height:80,
        borderColor:Colors.gray,
        borderWidth:StyleSheet.hairlineWidth
    },
    id: {
        width:85,
        height:85,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAccountInfoScreen)