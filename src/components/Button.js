import React from 'react'
import {Button as Btn} from 'react-native-paper'
import {Colors, Metrics} from '../themes'

export default class Button extends React.Component {

    state = {
        processing:false
    }

    handlePress = () => {
        const {processing} = this.state
        
        if(!processing) {
            this.setState({processing:true},async () => await this.props.onPress())
        }

        this.setState({processing:false})
    }

    render() {

        const {props} = this

        let customStyle = {
            backgroundColor:Colors.brand
        }
    
        let disabledStyle = {}, labelStyle = {}
    
        if(props.disabled) {
            disabledStyle.borderWidth = 0
            disabledStyle.opacity = .6
            disabledStyle.backgroundColor = Colors.brand
    
            labelStyle.color = Colors.light
        }
    
        //color theme
        if(props.success) customStyle.backgroundColor = Colors.success
        else if(props.info) customStyle.backgroundColor = Colors.info
        else if(props.warning) customStyle.backgroundColor = Colors.warning
        else if(props.danger) customStyle.backgroundColor = Colors.danger
        else if(props.dark) customStyle.backgroundColor = Colors.dark
        else if(props.light) customStyle.backgroundColor = Colors.light
        
        return (
            <Btn
                {...props}
                style={{
                    ...props.style,
                    borderColor:customStyle.backgroundColor,
                    ...disabledStyle
                }}
                labelStyle={{
                    ...labelStyle
                }}
                contentStyle={{
                    padding:Metrics.rg
                }}
                disabled={props.loading || props.disabled}
                mode={props.mode || 'contained'}
                color={customStyle.backgroundColor}
                onPress={this.handlePress}
                uppercase={false}
            >
                {props.t}
            </Btn>
        )
    }
}