import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {Screen, Text, Row, Spacer, FlatList, Bullet} from '../components'
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
                    feature:'Receive Money Limit',
                    semi_verified:{
                        value:'PHP 10,000'
                    },
                    verified:{
                        value:'PHP 200,000',
                    }
                },
                {
                    feature:'Pay Bills Limit',
                    semi_verified:{
                        value:'PHP 10,000'
                    },
                    verified:{
                        value:'PHP 200,000',
                        note:'25,000-50,000 limit per transaction'
                    }
                },
                {
                    feature:'Withdraw Cash Limit',
                    semi_verified:{
                        value:'PHP 10,000'
                    },
                    verified:{
                        value:'PHP 200,000',
                        note:'per day transaction'
                    }
                }, 
                {
                    feature:'Send Money',
                    semi_verified:{
                        value:false
                    },
                    verified:{
                        value:'PHP 200,000',
                        note:'50,000 limit per transaction'
                    }
                },
                {
                    feature:'Buy Load',
                    semi_verified:{
                        value:true
                    },
                    verified:{
                        value:true
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
        <Row ar style={style.item}>
            <View style={style.cell}>
                <Text center>{item.feature}</Text>
            </View>

            <View style={style.cell}>
                {typeof item.semi_verified.value === 'string' && <Text center>{item.semi_verified.value}</Text>}
                {item.semi_verified.value === true && <Icon name='ios-checkmark' size={Metrics.icon.md} color={Colors.mute} />}
                {item.semi_verified.value === false && <Icon name='ios-close' size={Metrics.icon.md} color={Colors.mute} />}
                {item.semi_verified.note && <Text sm center mute>{item.semi_verified.note}</Text>}
            </View>

            <View style={style.cell}>
                {typeof item.verified.value === 'string' && <Text center>{item.verified.value}</Text>}
                {item.verified.value === true && <Icon name='ios-checkmark' size={Metrics.icon.md} color={Colors.mute} />}
                {item.verified.value === false && <Icon name='ios-close' size={Metrics.icon.md} color={Colors.mute} />}
                {item.verified.note && <Text sm center mute>{item.verified.note}</Text>}
            </View>
        </Row>
    )

    render() {

        const {list, loading} = this.state

        return (
            <Screen ns>
                <View style={style.statusContainer}>
                    <Text center b md>You are semi-verified</Text>
                    <Text center>Visit the nearest MLhuillier branch to be fully verified.</Text>
                </View>

                <Spacer md />

                <Row ar style={style.tableHeader}>
                    <View style={[style.cell,{alignItems:'flex-start'}]}>
                        <Text center b>FEATURES</Text>
                    </View>

                    <View style={style.cell}>
                        <Icon name='ios-checkmark-circle' color={Colors.brand} size={Metrics.icon.sm} />
                        <Text center>Semi-Verified</Text>
                    </View>

                    <View style={style.cell}>
                        <Bullet size={9} />
                        <Text center>Verified</Text>
                    </View>
                </Row>

                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                    loading={loading}
                />
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

export default Scrn