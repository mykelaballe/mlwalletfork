import React from 'react'
import {Hamburger} from '../components'
import {Colors} from '../themes'

export default () => ({
    headerStyle: {
        backgroundColor:Colors.brand
    },
    headerTitleStyle: {
        color:Colors.light
    },
    headerLeft: <Hamburger />
})