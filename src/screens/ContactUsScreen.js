import React from 'react'
import {StyleSheet, View, Linking} from 'react-native'
import {Text, Card, HR, Ripple, Spacer, Row, ScrollView, Icon} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {Portal, Modal} from 'react-native-paper'
import Comms from 'react-native-communications'
import Ionicon from 'react-native-vector-icons/Ionicons'

const RippleItem = props => (
    <Ripple onPress={() => props.onPress(props.value)} style={{...props.style}}>
        {props.children}
    </Ripple>
)

class ContactUsScreen extends React.Component {

    static navigationOptions = {
        title:'Contact Us'
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
                                            <Ionicon name='ios-call' color={Colors.brand} size={Metrics.icon.lg} />
                                            <Spacer xs />
                                            <Text center md>Call</Text>
                                        </>
                                    </RippleItem>
                                    <RippleItem onPress={this.handleText} value={contact} style={style.option}>
                                        <>
                                            <Ionicon name='ios-text' color={Colors.brand} size={Metrics.icon.lg} />
                                            <Spacer xs />
                                            <Text center md>SMS</Text>
                                        </>
                                    </RippleItem>
                                    <RippleItem onPress={this.handleChat}value={contact} style={style.option}>
                                        <>
                                            <Ionicon name='ios-chatbubbles' color={Colors.brand} size={Metrics.icon.lg} />
                                            <Spacer xs />
                                            <Text center md>Chat</Text>
                                        </>
                                    </RippleItem>
                                </Row>
                            </Card>
                        </View>
                    </Modal>
                </Portal>

                <Card style={style.card}>
                    <Text b lg>Toll Free</Text>
                    <Spacer sm />
                    <RippleItem onPress={this.handleCall} value={'1-800-1-0572-3252'} style={style.item}>
                        <Row>
                            <Icon name='phone' style={{width:25,height:25}} />
                            <Spacer h sm />
                            <Text md>1-800-1-0572-3252</Text>
                        </Row>
                    </RippleItem>
                </Card>

                <Card style={style.card}>
                    <Text b lg>Visayas and Mindanao</Text>
                    <Spacer sm />
                    <RippleItem onPress={this.handleCall} value={'1-800-1-0572-3252'} style={style.item}>
                        <Row>
                            <Icon name='phone' style={{width:25,height:25}} />
                            <Spacer h sm />
                            <Text md>(02) 830-2011</Text>
                        </Row>
                    </RippleItem>

                    <Spacer xs />

                    <RippleItem onPress={this.handleCall} value={'1-800-1-0572-3252'} style={style.item}>
                        <Row>
                            <Icon name='phone' style={{width:25,height:25}} />
                            <Spacer h sm />
                            <Text md>(02) 830-2011</Text>
                        </Row>
                    </RippleItem>
                </Card>

                {/*<Card style={style.card}>
                    <Text b lg>USA</Text>
                    <Spacer sm />
                    <RippleItem onPress={this.handleCall} value={'1-800-1-0572-3252'} style={style.item}>
                        <Row>
                            <Icon name='phone' style={{width:25,height:25}} />
                            <Spacer h sm />
                            <Text md>1-877-688-4588</Text>
                        </Row>
                    </RippleItem>
                </Card>*/}

                <Card style={style.card}>
                    <Text b lg>Email</Text>
                    <Spacer sm />
                    <RippleItem onPress={this.handleEmail} value={'1-800-1-0572-3252'} style={style.item}>
                        <Row>
                            <Icon name='mail' style={{width:25,height:25}} />
                            <Spacer h sm />
                            <Text md>customercare@mlhuillier.com</Text>
                        </Row>
                    </RippleItem>
                </Card>

                <Card style={style.card}>
                    <Text b lg>Facebook Page</Text>
                    <Spacer sm />
                    <RippleItem onPress={() => {}} value={'1-800-1-0572-3252'} style={style.item}>
                        <Row>
                            <Icon name='fb' style={{width:25,height:25}} />
                            <Spacer h sm />
                            <Text md>M Lhuillier Financial Services Inc.</Text>
                        </Row>
                    </RippleItem>
                </Card>

                {/*<Card>
                    <Text b lg brand>{_('33')}</Text>
                    <HR />
                    <RippleItem onPress={this.handleEmail} value={'customercare@mlhuillier1.com'} style={style.item}>
                        <Row bw>
                            <Text>customercare@mlhuillier1.com</Text>
                        </Row>
                    </RippleItem>

                    <RippleItem onPress={this.handleEmail} value={'mis.vismin@mlhuillier1.com'} style={style.item}>
                        <Row bw>
                            <Text>mis.vismin@mlhuillier1.com</Text>
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
                        </Row>
                    </RippleItem>
                    <RippleItem onPress={this.handleShowModal} value={'0917 871 2973'} style={style.item}>
                        <Row bw>
                            <Text>0917 871 2973</Text>
                        </Row>
                    </RippleItem>
                    
                    <View style={style.item}>
                        <Text b>{_('39')}:</Text>
                    </View>
                    <RippleItem onPress={this.handleShowModal} value={'0947 999 2754'} style={style.item}>
                        <Row bw>
                            <Text>0947 999 2754</Text>
                        </Row>
                    </RippleItem>
                    <RippleItem onPress={this.handleShowModal} value={'0947 999 2755'} style={style.item}>
                        <Row bw>
                            <Text>0947 999 2755</Text>
                        </Row>
                    </RippleItem>
                </Card>

                <Spacer />*/}
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.md,
        backgroundColor:Colors.lightgray
    },
    card: {
        padding:Metrics.md
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