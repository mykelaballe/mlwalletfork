import React from 'react'
import {StyleSheet, View, Linking} from 'react-native'
import {Text, Card, HR, Ripple, Spacer, Row, ScrollView} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import {Portal, Modal} from 'react-native-paper'
import Comms from 'react-native-communications'

const RippleItem = props => (
    <Ripple onPress={() => props.onPress(props.value)} style={{...props.style}}>
        {props.children}
    </Ripple>
)

class ContactUsScreen extends React.Component {

    static navigationOptions = {
        title:_('23')
    }

    state = {
        contact:'',
        showModal:false
    }

    handleCall = number => Comms.phonecall(number, false)

    handleEmail = email => Comms.email([email], null, null, null, null)

    handleText = number => Comms.textWithoutEncoding(number)

    handleChat = number => {
        const link = `whatsapp://send?phone=${number}`
        Linking.canOpenURL(link)
        .then(supported => {
            if(supported) Linking.openURL(link)
            else {
                Say.some('You do not have Whatsapp') 
            }
        })
    }

    handleShowModal = contact => this.setState({contact,showModal:true})

    handleCloseModal = () => this.setState({showModal:false})

    render() {

        const {contact, showModal} = this.state

        return (
            <ScrollView style={style.container}>
                <Portal>
                    <Modal visible={showModal} onDismiss={this.handleCloseModal}>
                        <View style={style.modalInnerContainer}>
                            <Card style={{width:300}}>
                                <Text center b lg>Select Option</Text>
                                <Row ar>
                                    <RippleItem onPress={this.handleCall} value={contact} style={style.option}>
                                        <>
                                            <Icon name='ios-call' color={Colors.brand} size={Metrics.icon.lg} />
                                            <Spacer xs />
                                            <Text center md>Call</Text>
                                        </>
                                    </RippleItem>
                                    <RippleItem onPress={this.handleText} value={contact} style={style.option}>
                                        <>
                                            <Icon name='ios-text' color={Colors.brand} size={Metrics.icon.lg} />
                                            <Spacer xs />
                                            <Text center md>SMS</Text>
                                        </>
                                    </RippleItem>
                                    <RippleItem onPress={this.handleChat}value={contact} style={style.option}>
                                        <>
                                            <Icon name='ios-chatbubbles' color={Colors.brand} size={Metrics.icon.lg} />
                                            <Spacer xs />
                                            <Text center md>Chat</Text>
                                        </>
                                    </RippleItem>
                                </Row>
                            </Card>
                        </View>
                    </Modal>
                </Portal>

                <Card>
                    <Text b lg brand>{_('32')}</Text>
                    <HR />
                    <RippleItem onPress={this.handleCall} value={'1-800-1-0572-3252'} style={style.item}>
                        <Row bw>
                            <View>
                                <Text b>{_('36')}:</Text>
                                <Text>1-800-1-0572-3252</Text>
                            </View>
                            <Icon name='ios-arrow-forward' color={Colors.mute} />
                        </Row>
                    </RippleItem>

                    <RippleItem onPress={this.handleCall} value={'1-800-1-0572-3252'} style={style.item}>
                        <Row bw>
                            <View>
                                <Text b>{_('37')}:</Text>
                                <Text>1-800-1-0572-3252</Text>
                            </View>
                            <Icon name='ios-arrow-forward' color={Colors.mute} />
                        </Row>
                    </RippleItem>
                </Card>

                <Card>
                    <Text b lg brand>{_('33')}</Text>
                    <HR />
                    <RippleItem onPress={this.handleEmail} value={'customercare@mlhuillier1.com'} style={style.item}>
                        <Row bw>
                            <Text>customercare@mlhuillier1.com</Text>
                            <Icon name='ios-arrow-forward' color={Colors.mute} />
                        </Row>
                    </RippleItem>

                    <RippleItem onPress={this.handleEmail} value={'mis.vismin@mlhuillier1.com'} style={style.item}>
                        <Row bw>
                            <Text>mis.vismin@mlhuillier1.com</Text>
                            <Icon name='ios-arrow-forward' color={Colors.mute} />
                        </Row>
                    </RippleItem>
                </Card>

                <Card>
                    <Text b lg brand>{_('32')}, {_('34')} & {_('35')}</Text>
                    <HR />
                    <View style={style.item}>
                        <Text b>{_('38')}:</Text>
                    </View>
                    <RippleItem onPress={this.handleShowModal} value={'0947 999 0337'} style={style.item}>
                        <Row bw>
                            <Text>0947 999 0337</Text>
                            <Icon name='ios-arrow-forward' color={Colors.mute} />
                        </Row>
                    </RippleItem>
                    <RippleItem onPress={this.handleShowModal} value={'0917 871 2973'} style={style.item}>
                        <Row bw>
                            <Text>0917 871 2973</Text>
                            <Icon name='ios-arrow-forward' color={Colors.mute} />
                        </Row>
                    </RippleItem>
                    
                    <View style={style.item}>
                        <Text b>{_('39')}:</Text>
                    </View>
                    <RippleItem onPress={this.handleShowModal} value={'0947 999 2754'} style={style.item}>
                        <Row bw>
                            <Text>0947 999 2754</Text>
                            <Icon name='ios-arrow-forward' color={Colors.mute} />
                        </Row>
                    </RippleItem>
                    <RippleItem onPress={this.handleShowModal} value={'0947 999 2755'} style={style.item}>
                        <Row bw>
                            <Text>0947 999 2755</Text>
                            <Icon name='ios-arrow-forward' color={Colors.mute} />
                        </Row>
                    </RippleItem>
                </Card>

                <Spacer />
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.rg,
        backgroundColor:Colors.gray
    },
    item: {
        paddingVertical:Metrics.sm,
        paddingRight:Metrics.rg
    },
    option: {
        paddingVertical:Metrics.md,
        paddingHorizontal:Metrics.xl
    },
    modalInnerContainer: {
        alignItems:'center',
        justifyContent:'center'
    }
})

export default ContactUsScreen