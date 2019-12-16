import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Button, Spacer, TopBuffer, Lottie} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class TouchIDScreen extends React.Component {

    static navigationOptions = {
        title:_('57')
    }

    handleSubmit = async () => {
        try {
            Say.ok(_('14'))
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    render() {

        return (
            <View style={style.container}>

                <TopBuffer />

                {/*<View style={{alignItems:'center'}}>
                    <Icon name='ios-finger-print' color={Colors.brand} size={Metrics.icon.jumbo} />
                </View>*/}

                <Lottie
                    source={Res.animated.touch_id}
                    loop={true}
                />

                <Spacer />

                <Text lg b center>{_('60')}</Text>
                <Spacer />
                <Text center>{_('61')}</Text>

                <Spacer />

                <Button t={_('58')} onPress={this.handleSubmit} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.xl
    }
})

export default TouchIDScreen