import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, FlatList, Initial, Text, Row, Button, Spacer, HR, Ripple} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

const ItemUI = props => (
    <>
        <Ripple onPress={() => props.onPress(props.index)} style={style.item}>
            <Row>
                <Initial text={props.data.bankname} />
                <Spacer h sm />
                <View>
                    <Text b>{props.data.bankname}</Text>
                    <Text>{props.data.old_account_no}</Text>
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
        loading:true,
        refreshing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    componentDidUpdate = (prevProps, prevState) => {
        const {newPartner, partnerIndex, newProp, deletedIndex, addPartner, updatePartner, deletePartner} = this.props
        if(newPartner) {
            addPartner(null)
            let list = prevState.list.slice()
            list.push(newPartner)
            this.setState({list})
        }

        if(partnerIndex !== null && newProp) {
            updatePartner(null, null)
            let list = this.state.list.slice()
            list[partnerIndex] = {
                ...list[partnerIndex],
                ...newProp
            }
            this.setState({list})
        }

        if(deletedIndex !== null) {
            deletePartner(null)
            let list = this.state.list.slice()
            list.splice(deletedIndex,1)
            this.setState({list})
        }
    }

    getData = async () => {
        const {walletno} = this.props.user
        let list = []

        try {
            list = await API.getBankPartners(walletno)
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({
            list,
            loading:false,
            refreshing:false
        })
    }

    handleAddNewBank = () => this.props.navigation.navigate('AddBankPartner')

    handleViewBank = index => {
        const {list} = this.state
        this.props.navigation.navigate('BankPartnerProfile',{index, bank:list[index]})
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderItem = ({item, index}) => <ItemUI index={index} data={item} onPress={this.handleViewBank} />

    render() {

        const {list, search, refreshing, loading} = this.state

        return (
            <>
                <Screen ns>
                    <FlatList
                        data={list}
                        renderItem={this.renderItem}
                        loading={loading}
                        refreshing={refreshing}
                        onRefresh={this.handleRefresh}
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

const mapStateToProps = state => ({
    user: state.user.data,
    ...state.bankTransfer
})

const mapDispatchToProps = dispatch => ({
    addPartner:newPartner => dispatch(Creators.addBankPartner(newPartner)),
    updatePartner:(partnerIndex, newProp) => dispatch(Creators.updateBankPartner(partnerIndex, newProp)),
    deletePartner:deletedIndex => dispatch(Creators.deleteBankPartner(deletedIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)