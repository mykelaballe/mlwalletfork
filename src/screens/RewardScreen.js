import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {Text, TopBuffer, Doodle, Spacer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'

class RewardScreen extends React.Component {

    static navigationOptions = {
        title:`ML ${_('72')}`
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
                <TopBuffer />

                <Text center b xl>Points</Text>
                <Text center h1 brand b>50</Text>

                <Spacer />

                <Image source={require('../res/diamond_card.png')} style={{width:350,height:220}} resizeMode='contain' />
                <Doodle />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center'
    }
})

export default RewardScreen