import React from 'react'
import {Searchbar} from 'react-native-paper'
import {_} from '../utils'

export default props => (
    <Searchbar
        placeholder={props.placeholder || _('85')}
        onChangeText={props.onChangeText}
        value={props.value}
    />
)