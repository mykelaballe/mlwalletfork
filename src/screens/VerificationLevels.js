import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Text, Row, Spacer, FlatList, Bullet, ScrollFix} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Verification Levels'
    }

    state = {
        list:[],
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let list = []
        
        try {
            list = [
                {
                    type:'INCOMING',
                    semi_verified:{value:null},
                    verified:{value:null},
                    sme:{value:''}
                },
                {
                    feature:'Add Money',
                    semi_verified:{
                        value:'PHP 40,000'
                    },
                    verified:{
                        value:'PHP 200,000',
                        note:'PHP 50,000 limit per transaction'
                    },
                    sme:{
                        value:''
                    }
                },
                {
                    feature:'Receive Money',
                    semi_verified:{
                        value:'PHP 40,000'
                    },
                    verified:{
                        value:'PHP 200,000',
                        note:'PHP 50,000 limit per transaction'
                    },
                    sme:{
                        value:''
                    }
                },

                {
                    type:'OUTGOING',
                    semi_verified:{value:null},
                    verified:{value:null},
                    sme:{value:''}
                },
                {
                    feature:'Send Money',
                    semi_verified:{
                        value:'PHP 10,000 Monthly'
                    },
                    verified:{
                        value:'PHP 200,000',
                        note:'PHP 50,000 limit per transaction'
                    },
                    sme:{
                        value:'Coming Soon'
                    }
                },
                {
                    feature:'Withdraw Money',
                    semi_verified:{
                        value:'PHP 5,000 per transaction, per day'
                    },
                    verified:{
                        value:'PHP 200,000',
                        note:'PHP 40,000 limit per transaction, per day'
                    },
                    sme:{
                        value:''
                    }
                }, 
                {
                    feature:'Pay Bills',
                    semi_verified:{
                        value:'PHP 10,000 Monthly'
                    },
                    verified:{
                        value:'PHP 200,000',
                        note:'PHP 50,000 limit per transaction'
                    },
                    sme:{
                        value:''
                    }
                },
                {
                    feature:'Buy eLoad',
                    semi_verified:{
                        value:'PHP 750 Monthly'
                    },
                    verified:{
                        value:'PHP 200,000',
                        note:'PHP 50,000 limit per transaction'
                    },
                    sme:{
                        value:''
                    }
                },
                {
                    feature:'Buy Items',
                    semi_verified:{
                        value:'PHP 10,000 Monthly'
                    },
                    verified:{
                        value:'PHP 200,000',
                        note:'Custom limit'
                    },
                    sme:{
                        value:''
                    }
                },
            ]
        }
        catch(err) {

        }

        this.setState({
            list,
            loading:false
        })
    }

    renderItem = ({item, index}) => (
        <ScrollFix>
            <Row ar style={style.item}>
                <View style={style.cell}>
                    {item.type ? <Text center sm b>{item.type}</Text> :  <Text center sm>{item.feature}</Text>}
                </View>

                <View style={style.cell}>
                    {typeof item.semi_verified.value === 'string' && <Text center sm>{item.semi_verified.value}</Text>}
                    {/*item.semi_verified.value === true && <Icon name='ios-checkmark' size={Metrics.icon.md} color={Colors.mute} />*/}
                    {/*item.semi_verified.value === false && <Icon name='ios-close' size={Metrics.icon.md} color={Colors.mute} />*/}
                    {item.semi_verified.note && <Text xs center mute>{item.semi_verified.note}</Text>}
                </View>

                <View style={style.cell}>
                    {typeof item.verified.value === 'string' && <Text center sm>{item.verified.value}</Text>}
                    {/*item.verified.value === true && <Icon name='ios-checkmark' size={Metrics.icon.md} color={Colors.mute} />*/}
                    {/*tem.verified.value === false && <Icon name='ios-close' size={Metrics.icon.md} color={Colors.mute} />*/}
                    {item.verified.note && <Text xs center mute>{item.verified.note}</Text>}
                </View>

                <View style={style.cell}>
                    <Text sm center mute>{item.sme.value}</Text>
                </View>
            </Row>
        </ScrollFix>
    )

    render() {

        const {status} = this.props.user
        const {list, loading} = this.state

        return (
            <Screen ns>
                {/*status == 0 &&
                <>
                    <View style={style.statusContainer}>
                        <Text center b md>You are semi-verified. To get more benefits, get fully-verified now! Here's how:</Text>

                        <Spacer />

                        <Text>Step 1. Visit the nearest M Lhuillier branch nationwide.</Text>
                        <Text>Step 2. Present your ML Wallet Account no. to the branch personnel.</Text>
                        <Text>Step 3. Add money on your account and get fully verified.</Text>
                    </View>

                    <Spacer sm />
                </>
                */}

                <Text><Text b>Tip: </Text> To start enjoying ML Wallet services, you can Add Money at any of the 2,500 M Lhuillier branches nationwide!</Text>

                <Spacer sm />

                <Row ar style={style.tableHeader}>
                    <View style={[style.cell,{alignItems:'flex-start'}]}>
                        <Text center b sm>FEATURES</Text>
                    </View>

                    <View style={style.cell}>
                        {status == 1 ? <Bullet size={9} /> : <Icon name='ios-checkmark-circle' color={Colors.brand} size={Metrics.icon.sm} />}
                        <Text center sm>{'Semi-\nVerified*'}</Text>
                    </View>

                    <View style={style.cell}>
                        {status == 0 ? <Bullet size={9} /> : <Icon name='ios-checkmark-circle' color={Colors.brand} size={Metrics.icon.sm} />}
                        <Text center sm>{'Fully-\nVerified'}</Text>
                    </View>

                    <View style={style.cell}>
                        <Bullet size={9} />
                        <Text center sm>SME</Text>
                    </View>
                </Row>

                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                    loading={loading}
                />

                <Spacer />
            </Screen>
        )
    }
}

const style = StyleSheet.create({
    tableHeader: {
        backgroundColor:Colors.lightgray,
        padding:Metrics.lg
    },
    statusContainer: {
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.brand,
        padding:Metrics.md,
        borderRadius:Metrics.sm
    },
    item: {
        paddingVertical:Metrics.rg
    },
    cell: {
        flex:1,
        alignItems:'center'
    }
})

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)