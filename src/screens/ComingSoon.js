import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {Text, Spacer} from '../components'
import {Metrics, Res} from '../themes'

class ComingSoon extends React.Component {

    static navigationOptions = {
        title:'Coming Soon'
    }

    render() {

        return (
            <View style={style.container}>
                <Image source={Res.coming_soon} resizeMode='contain' style={style.img} />

                <Spacer />

                <Text center b xl>COMING SOON!</Text>
                
                <Spacer sm />

                <Text center mute>We're working on our store.</Text>
                <Text center mute>Stay tuned for updates.</Text>
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

export default ComingSoon