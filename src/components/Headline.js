import React from 'react'
import {Text, Spacer} from './'

export default props => (
    <>
        {(props.title && props.title != '') &&
        <>
            <Text b xl center>{props.title}</Text>
            <Spacer />
        </>
        }
        
        {props.subtext !== '' && <Text md center mute>{props.subtext}</Text>}

        <Spacer />
    </>
)