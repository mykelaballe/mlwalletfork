import React from 'react'
import {StyleSheet, View, Linking} from 'react-native'
import {Text, Card, Ripple, Spacer, Row, ScrollView, Icon} from '../components'
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

class Scrn extends React.Component {

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

    handleFB = () => Linking.openURL('https://www.facebook.com/mlhuillier.official')

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
                            <Icon name='phone' style={style.icon} />
                            <Spacer h sm />
                            <Text md>1-800-1-0572-3252</Text>
                        </Row>
                    </RippleItem>
                </Card>

                <Card style={style.card}>
                    <Text b lg>Trunk Line</Text>

                    <Spacer sm />

                    <RippleItem onPress={this.handleCall} value={'032-260-9290'} style={style.item}>
                        <Row>
                            <Icon name='phone' style={style.icon} />
                            <Spacer h sm />
                            <Text md>(032) 260-9290</Text>
                        </Row>
                    </RippleItem>
                </Card>

                <Card style={style.card}>
                    <Text b lg>Mobile No.</Text>

                    <Spacer sm />

                    <RippleItem onPress={this.handleCall} value={'0947-999-0337'} style={style.item}>
                        <Row>
                            <Icon name='phone' style={style.icon} />
                            <Spacer h sm />
                            <Text md>Smart: 0947-999-0337</Text>
                        </Row>
                    </RippleItem>

                    <RippleItem onPress={this.handleCall} value={'0917-871-2973'} style={style.item}>
                        <Row>
                            <Icon name='phone' style={style.icon} />
                            <Spacer h sm />
                            <Text md>Globe: 0917-871-2973</Text>
                        </Row>
                    </RippleItem>
                </Card>

                <Card style={style.card}>
                    <Text b lg>Email</Text>
                    <Spacer sm />
                    <RippleItem onPress={this.handleEmail} value={'customercare@mlhuillier.com'} style={style.item}>
                        <Row>
                            <Icon name='mail' style={style.icon} />
                            <Spacer h sm />
                            <Text md>customercare@mlhuillier.com</Text>
                        </Row>
                    </RippleItem>
                </Card>

                <Card style={style.card}>
                    <Text b lg>Facebook Page</Text>
                    <Spacer sm />
                    <RippleItem onPress={this.handleFB} value={'customercare@mlhuillier.com'} style={style.item}>
                        <Row>
                            <Icon name='fb' style={style.icon} />
                            <Spacer h sm />
                            <Text md>M Lhuillier Financial Services Inc.</Text>
                        </Row>
                    </RippleItem>
                </Card>
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
    },
    icon: {
        width:25,
        height:25
    }
})

export default Scrn