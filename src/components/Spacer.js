import React from 'react'
import {View} from 'react-native'
import {Metrics} from '../themes'

export default props => {

    let style = {}, size = Metrics.rg

    if(props.xs) size = Metrics.xs
    else if(props.sm) size = Metrics.sm
    else if(props.md) size = Metrics.md
    else if(props.lg) size = Metrics.lg
    else if(props.xl) size = Metrics.xl

    if(props.h) style.marginHorizontal = size
    else style.marginVertical = size

    return (
        <View style={style} />
    )
}