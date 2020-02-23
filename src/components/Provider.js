import React from 'react'
import {Provider} from 'react-native-paper'

export default props => (
    <Provider>
        {props.children}
    </Provider>
)