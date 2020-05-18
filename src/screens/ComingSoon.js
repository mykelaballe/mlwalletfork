import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {Text, Spacer} from '../components'
import {Metrics, Res} from '../themes'

export default class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state
        return {
            title:params.title || 'Coming Soon'
        }
    }

    render() {

        const {params = {}} = this.props.navigation.state

        return (
            <View style={style.container}>
                {!params.icon && <Image source={Res.coming_soon} resizeMode='contain' style={style.img} />}
                {params.icon || null}

                <Spacer />

                <Text center b xl>COMING SOON!</Text>
                
                {params.phrase &&
                <>
                    <Spacer sm />
                    <Text center mute>{params.phrase}</Text>
                </>
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:Metrics.md
    },
    img: {
        width:150,
        height:150
    }
})