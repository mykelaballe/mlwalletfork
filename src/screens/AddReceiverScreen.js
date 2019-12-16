import React from 'react'
import {StyleSheet, View, Image, ScrollView, Picker, TouchableOpacity} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer, Row} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class AddReceiverScreen extends React.Component {

    static navigationOptions = {
        title:'My Receiver'
    }

    state = {
        wallet:'',
        firstname:'',
        middlename:'',
        lastname:'',
        relation:'',
        mobile_number:'',
        address:'',
        city:'',
        zip_code:'',
        default_amount:'',
        show_mobile_number:true,
        show_address:true,
        show_zip_code:true
    }

    handleSubmit = async () => {
        let {wallet, firstname, middlename, lastname, relation, mobile_number, address, city, zip_code, default_amount} = this.state

        try {
            wallet = wallet.trim()
            firstname = firstname.trim()
            middlename = middlename.trim()
            lastname = lastname.trim()
            relation = relation.trim()
            mobile_number = mobile_number.trim()
            address = address.trim()
            city = city.trim()
            zip_code = zip_code.trim()
            default_amount = default_amount.trim()

            if(wallet == '') Say.some(_('8'))
            else {
                Say.ok(_('14'))
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleChangeRelation = (itemValue, itemIndex) => this.setState({relation:itemValue})

    render() {

        const {wallet, firstname, middlename, lastname, relation, mobile_number, address, city, zip_code, default_amount, show_mobile_number, show_address, show_zip_code} = this.state

        return (
            <ScrollView contentContainerStyle={{padding:Metrics.xl}} showsVerticalScrollIndicator={false}>

                <View style={{alignItems:'center'}}>
                    <Image source={require('../res/avatar.jpg')} style={{width:200,height:200}} resizeMode='contain' />
                    <Text xs center>Tap to change photo</Text>
                </View>

                <Spacer sm />

                <TextInput
                    label={'Wallet Name / Wallet ID'}
                    value={wallet}
                    onChangeText={wallet => this.setState({wallet})}
                />

                <Spacer xs />

                <Text center sm>Add receiver using their Wallet ID, which can be found in Account under My Profile Menu.</Text>

                <Spacer xs />

                <TextInput
                    label={'Firt Name'}
                    value={firstname}
                    onChangeText={firstname => this.setState({firstname})}
                />

                <TextInput
                    label={'Middle Name'}
                    value={middlename}
                    onChangeText={middlename => this.setState({middlename})}
                />

                <Spacer xs />

                <TextInput
                    label={'Last Name'}
                    value={lastname}
                    onChangeText={lastname => this.setState({lastname})}
                />

                <Spacer xs />

                <Picker
                    selectedValue={relation}
                    style={{}}
                    onValueChange={this.handleChangeRelation}
                >
                    <Picker.Item key={0} label={'Select Relation'} value={''} />
                    <Picker.Item key={1} label={'Friend'} value={'Friend'} />
                    <Picker.Item key={2} label={'Family'} value={'Family'} />
                    <Picker.Item key={3} label={'Others'} value={'Others'} />
                </Picker>

                <Spacer xs />

                <Row bw>
                    <TextInput
                        style={{flex:1}}
                        label={'Mobile Number'}
                        value={mobile_number}
                        onChangeText={mobile_number => this.setState({mobile_number})}
                        keyboardType='numeric'
                        secureTextEntry={!show_mobile_number}
                    />
                    <TouchableOpacity onPress={() => this.setState({show_mobile_number:!show_mobile_number})}>
                        <Icon name={`ios-eye${show_mobile_number ? '' : '-off'}`} color={Colors.mute} size={Metrics.icon.rg} />
                    </TouchableOpacity>
                </Row>

                <Spacer xs />

                <Row bw>
                    <TextInput
                        style={{flex:1}}
                        label={'Brangay / Street / Subdivision'}
                        value={address}
                        onChangeText={address => this.setState({address})}
                        secureTextEntry={!show_address}
                    />
                    <TouchableOpacity onPress={() => this.setState({show_address:!show_address})}>
                        <Icon name={`ios-eye${show_address ? '' : '-off'}`} color={Colors.mute} size={Metrics.icon.rg} />
                    </TouchableOpacity>
                </Row>

                <Spacer xs />

                <TextInput
                    label={'Province / Municipality'}
                    value={city}
                    onChangeText={city => this.setState({city})}
                />

                <Spacer xs />

                <Row bw>
                    <TextInput
                        style={{flex:1}}
                        label={'Zip Code'}
                        value={zip_code}
                        onChangeText={zip_code => this.setState({zip_code})}
                        keyboardType='numeric'
                        secureTextEntry={!show_zip_code}
                    />
                    <TouchableOpacity onPress={() => this.setState({show_zip_code:!show_zip_code})}>
                        <Icon name={`ios-eye${show_zip_code ? '' : '-off'}`} color={Colors.mute} size={Metrics.icon.rg} />
                    </TouchableOpacity>
                </Row>

                <Spacer xs />

                <TextInput
                    label={'Default Amount'}
                    value={default_amount}
                    onChangeText={default_amount => this.setState({default_amount})}
                    keyboardType='numeric'
                />

                <Spacer sm />

                <Button t={_('9')} onPress={this.handleSubmit} />
            </ScrollView>
        )
    }
}

export default AddReceiverScreen