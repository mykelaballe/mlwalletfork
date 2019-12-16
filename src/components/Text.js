import React from 'react'
import {Text as Txt} from 'react-native'
import {Colors, Metrics} from '../themes'

export default props => {

    let style = {
        fontSize:14,
        color:Colors.dark
    }

    if(props.b) style.fontWeight = 'bold'

    if(props.center) style.textAlign = 'center'
    else if(props.right) style.textAlign = 'right'

    //size
    if(props.xs) style.fontSize = Metrics.font.xs
    else if(props.sm) style.fontSize = Metrics.font.sm
    else if(props.md) style.fontSize = Metrics.font.md
    else if(props.lg) style.fontSize = Metrics.font.lg
    else if(props.xl) style.fontSize = Metrics.font.xl
    else if(props.h1) style.fontSize = Metrics.font.h1
    else if(props.h2) style.fontSize = Metrics.font.h2
    else if(props.h3) style.fontSize = Metrics.font.h3

    //color
    if(props.mute) style.color = Colors.mute
    else if(props.brand) style.color = Colors.brand
    else if(props.success) style.color = Colors.success
    else if(props.info) style.color = Colors.info
    else if(props.warning) style.color = Colors.warning
    else if(props.danger) style.color = Colors.danger
    else if(props.light) style.color = Colors.light

    return (
        <Txt {...props} style={{...style,...props.style}}>
            {props.children}
        </Txt>
    )
}