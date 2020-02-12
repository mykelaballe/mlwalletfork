import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {Screen, Footer, FlatList, Initial, Text, Row, Button, Spacer, HR, Ripple} from '../components'
import {Metrics} from '../themes'
import {_} from '../utils'

const ItemUI = props => (
    <>
        <Ripple onPress={() => props.onPress(props.data)} style={style.item}>
            <Row>
                <Initial text={props.data.name} />
                <Spacer h sm />
                <View>
                    <Text b>{props.data.name}</Text>
                    <Text>{props.data.account_no}</Text>
                </View>
            </Row>
        </Ripple>

        <HR m={Metrics.sm} />
    </>
)

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Saved Bank Accounts'
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
                    name:'BDO',
                    account_name:'John Smith',
                    account_no:'1234567890'
                },
                {
                    name:'Chinabank RTA',
                    account_name:'John Smith',
                    account_no:'1234567890'
                }
            ]
        }
        catch(err) {

        }

        this.setState({
            list,
            loading:false
        })
    }

    handleAddNewBank = () => this.props.navigation.navigate('AddBankPartner')

    handleViewBank = bank => this.props.navigation.navigate('BankPartnerProfile',{bank})

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleViewBank} />

    render() {

        const {list, search, loading} = this.state

        return (
            <>
                <Screen ns>
                    <FlatList
                        data={list}
                        renderItem={this.renderItem}
                        loading={loading}
                        placeholder={{text:'No Saved Bank Accounts.\nAdd a new bank account to continue.'}}
                    />
                </Screen>

                <Footer>
                    <Button t='Add New Bank Account' onPress={this.handleAddNewBank} />
                </Footer>
            </>
        )
    }
}

const style = StyleSheet.create({
    item: {
        padding:Metrics.rg
    }
})

export default Scrn