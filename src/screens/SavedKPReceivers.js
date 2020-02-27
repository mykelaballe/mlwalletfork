import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Footer, FlatList, Initial, Text, Row, Button, Spacer, HR, Ripple, SearchInput} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

const ItemUI = props => (
    <>
        <Ripple onPress={() => props.onPress(props.data)} style={style.item}>
            <Row>
                <Initial text={props.data.firstname} />
                <Spacer h sm />
                <View>
                    <Text b>{props.data.firstname} {props.data.lastname}</Text>
                    <Text>{props.data.contact_no}</Text>
                </View>
            </Row>
        </Ripple>

        <HR m={Metrics.sm} />
    </>
)

class Scrn extends React.Component {

    static navigationOptions = {
        title:_('84')
    }

    state = {
        list:[],
        search:'',
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {wallet_no} = this.props.user
        let list = []

        try {
            list = await API.getKPReceivers({wallet_no})
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({
            list,
            loading:false
        })
    }

    handleAddNewReceiver = () => this.props.navigation.navigate('AddKPReceiver')

    handleViewReceiver = receiver => this.props.navigation.navigate('ReceiverKPProfile',{receiver})

    handleChangeSearch = search => this.setState({search})

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleViewReceiver} />

    render() {

        const {list, search, loading} = this.state

        return (
            <>
                <Screen ns>
                    <SearchInput
                        onChangeText={this.handleChangeSearch}
                        value={search}
                    />

                    <Spacer sm />

                    <FlatList
                        data={list}
                        renderItem={this.renderItem}
                        loading={loading}
                    />
                </Screen>

                <Footer>
                    <Button t={_('80')} onPress={this.handleAddNewReceiver} />
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
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)