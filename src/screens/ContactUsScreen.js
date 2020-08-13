import React from 'react'
import {StyleSheet, View, Linking, TouchableOpacity} from 'react-native'
import {Text, Card, Ripple, Spacer, Row, ScrollView, Icon, HR} from '../components'
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

    handleGovPrivacy = () => Linking.openURL('https://www.privacy.gov.ph')

    handleShowModal = contact => this.setState({contact,showModal:true})

    handleCloseModal = () => this.setState({showModal:false})

    render() {


        return (
            <ScrollView style={style.container}>
                <Card style={style.card}>
                    <Text b md>For concerns on our products and services:</Text>

                    <HR m={Metrics.rg} />

                    <Text>Call us at</Text>

                    <Spacer sm />

                    <RippleItem onPress={this.handleCall} value={'1800105723252'} style={style.item}>
                        <Text b>Customer Hotline Toll Free:</Text>
                        <Text>1 800 105 723 252</Text>
                    </RippleItem>

                    <Spacer />

                    <Text b>Telephone numbers:</Text>
                    <RippleItem onPress={this.handleCall} value={'+63 (32) 348-9400'} style={style.item}>
                        <Text>+63 32 348 9400</Text>
                    </RippleItem>
                    <RippleItem onPress={this.handleCall} value={'+63 (28) 898-1888'} style={style.item}>
                        <Text>+63 28 898 1888</Text>
                    </RippleItem>

                    <Spacer />

                    <Text b>Mobile numbers:</Text>
                    <RippleItem onPress={this.handleCall} value={'+639479990337'} style={style.item}>
                        <Text>+63 947 999 0337</Text>
                    </RippleItem>
                    <RippleItem onPress={this.handleCall} value={'+639178712973'} style={style.item}>
                        <Text>+63 917 871 2973</Text>
                    </RippleItem>

                    <RippleItem onPress={this.handleEmail} value={'customercare@mlhuillier.com'} style={style.item}>
                        <Text b>Email us at:</Text>
                        <Text>customercare@mlhuillier.com</Text>
                    </RippleItem>
                </Card>

                <Spacer />

                <Card style={style.card}>
                    <Text b md>For concerns on data privacy:</Text>

                    <HR m={Metrics.rg} />

                    <Text>Call us at</Text>

                    <Spacer sm />

                    <RippleItem onPress={this.handleCall} value={'+63 32 415 3977'} style={style.item}>
                        <Text b>Telephone number:</Text>
                        <Text>+63 32 415 3977</Text>
                    </RippleItem>

                    <RippleItem onPress={this.handleEmail} value={'mldpo@mlhuillier.com'} style={style.item}>
                        <Text b>Email us at:</Text>
                        <Text>mldpo@mlhuillier.com</Text>
                    </RippleItem>
                </Card>

                {/*<Spacer />

                <Text b lg>TO KNOW MORE ABOUT R.A. 10173 or DPA and its RIRR, please visit the website of the National Privacy Commission</Text>
                <TouchableOpacity onPress={this.handleGovPrivacy}>
                    <Text md>(https://www.privacy.gov.ph)</Text>
                </TouchableOpacity>*/}

                <Spacer xl />
            </ScrollView>
        )

        /*return (
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
        )*/
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