import React from 'react'
import {Text, Spacer} from './'
import {Metrics} from '../themes'

export default props => (
    <>
        {(props.title != '' && props.title) &&
        <>
            <Text b size={props.size || Metrics.font.xl} center>{props.title}</Text>
            <Spacer />
        </>
        }
        
        {props.subtext !== '' &&
        <>
            <Text md center mute>{props.subtext}</Text>
            <Spacer />
        </>
        }
    </>
)