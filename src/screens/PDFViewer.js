import React from 'react'
import {View, StyleSheet} from 'react-native'
import PDF from 'react-native-pdf'

export default class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title:params.title || 'PDF'
        }
    }

    render() {

        const {source} = this.props.navigation.state.params

        return (
            <View style={{flex:1}}>
                <PDF
                    source={{uri:source}}
                    style={[style.pdf,{width:'100%'}]}
                    cache={true}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    pdf: {
        height:'100%'
    }
})