import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from '../components'
import {Colors, Metrics} from '../themes'

class NotificationScreen extends React.Component {

    static navigationOptions = {
        title:'Notifications'
    }

    state = {
        list:[],
        loading:true,
        refreshing:false,
        error:false
    }

    componentDidMount = () => {

    }

    getData = async () => {
        try {

        }
        catch(err) {
            
        }
    }

    render() {

        const {list, loading, refreshing, error} = this.state

        return (
            <View style={style.container}>
                <Text>Notifications</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default NotificationScreen