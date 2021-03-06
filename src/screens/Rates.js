import React from 'react'
import {StyleSheet, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Text, Row, FlatList, Spacer, ScrollFix, RouteTitle} from '../components'
import {Metrics} from '../themes'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        //title:`${Consts.tcn.skp.short_desc} Rates`
        headerTitle:<RouteTitle t={`${Consts.tcn.skp.short_desc} Rates`} />
    }

    state = {
        list:[],
        loading:true,
        refreshing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let list = []

        try {
            list = await API.getRates()

            this.props.setRates(list)
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({
            list,
            loading:false,
            refreshing:false
        })
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderItems = ({item}) => (
        <ScrollFix>
            <Row style={style.item}>
                <Text center style={{flex:1}}>{Func.formatToRealCurrency(item.minAmount)} - {Func.formatToRealCurrency(item.maxAmount)}</Text>
                <Text center style={{flex:1}}>{Func.formatToRealCurrency(item.chargeValue)}</Text>
            </Row>
        </ScrollFix>
    )

    render() {

        const {list, loading, refreshing} = this.state

        return (
           <Screen ns>
                <Row>
                    <Text center b style={{flex:1}}>Amount</Text>
                    <Text center b style={{flex:1}}>Rates</Text>
                </Row>

                <Spacer sm />

                <FlatList
                    data={list}
                    renderItem={this.renderItems}
                    loading={loading}
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                    skeleton='b'
                />
            </Screen>
        )
    }
}

const style = StyleSheet.create({
    item: {
        paddingVertical:Metrics.sm
    }
})

const mapDispatchToProps = dispatch => ({
    setRates: rates => dispatch(Creators.setKPRates(rates))
})

export default connect(null, mapDispatchToProps)(Scrn)