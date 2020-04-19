import React from 'react'
import {Dimensions} from 'react-native'
import ContentLoader, {Rect, Circle} from 'react-content-loader/native'

const {width} = Dimensions.get('window')

export default props => {
    let template = (
        <>
            <Rect x="0" y="0" width={width} height="30" />
            <Rect x="0" y="47" width={width} height="1" />
            <Rect x="0" y="64" width={width} height="30" />
            <Rect x="0" y="111" width={width} height="1" />
            <Rect x="0" y="128" width={width} height="30" />
        </>
    )

    if(props.template == 'a') {
        template = (
            <>
                <Circle cx="31" cy="31" r="27" />
                <Rect x="64" y="15" width='170' height="15" /> 
                <Rect x="64" y="38" width='100' height="12" />
            
                <Rect x="0" y="63" width={width} height="1" /> 

                <Circle cx="31" cy="97" r="27" />
                <Rect x="64" y="81" width="170" height="15" /> 
                <Rect x="64" y="104" width="100" height="12" />

                <Rect x="0" y="130" width={width} height="1" />

                <Circle cx="31" cy="164" r="27" />
                <Rect x="64" y="148" width="170" height="15" /> 
                <Rect x="64" y="171" width="100" height="12" />
            </>
        )
    }

    else if(props.template == 'b') {
        template = (
            <>
                <Rect x="50" y="0" width={100} height="20" />
                <Rect x={width-150} y="0" width={50} height="20" />
                <Rect x="50" y="35" width={100} height="20" />
                <Rect x={width-150} y="35" width={50} height="20" />
                <Rect x="50" y="70" width={100} height="20" />
                <Rect x={width-150} y="70" width={50} height="20" />
            </>
        )
    }


    return (
        <ContentLoader height={200}>
            {template}
        </ContentLoader>
    )
}