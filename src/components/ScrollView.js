import React from 'react'
import {ScrollView as SV} from 'react-native'

export default props => (
    <SV
        {...props}
        showsVerticalScrollIndicator={false}
    />
)