import React from 'react'
import {StyleSheet, View, Image, Dimensions} from 'react-native'
import {Text, Button, Screen, Spacer, Footer} from '../components'
import {Colors, Metrics, Res} from '../themes'

const {width} = Dimensions.get('window')
const IMG_WIDTH = width / 2

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Live Photo',
        headerStyle:{
            backgroundColor:Colors.dark
        }
    }

    handleGo = () => {
        const {replace, state:{params}} = this.props.navigation
        replace('Camera',params)
    }

    render() {
        return (
            <>
            <Screen>
                <Text brand b u>When taking your live photo:</Text>
                
                <Spacer />

                <Text>Step 1: Make sure you're in a well-lighted area.</Text>
                <Text>Step 2: Position your face within the frame.</Text>

                <View style={style.imgWrapper}>
                    <Image source={Res.livephoto1} style={style.img} resizeMode='contain' />
                </View>

                <Text>Step 3: Blink both eyes to take a live photo.</Text>

                <View style={style.imgWrapper}>
                    <Image source={Res.livephoto2} style={style.img} resizeMode='contain' />
                </View>

                <Spacer />

                
            </Screen>
            <Footer>
                <Button t="Let's go!" onPress={this.handleGo} />
            </Footer>
            </>
        )
    }
}

const style = StyleSheet.create({
    imgWrapper: {
        alignItems:'center',
        marginVertical:Metrics.md
    },
    img: {
        height:IMG_WIDTH,
        width:IMG_WIDTH
    }
})