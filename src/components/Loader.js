import React from 'react'
import {StyleSheet} from 'react-native'
import SkeletonContent from 'react-native-skeleton-content-nonexpo'

export default props => (
    <SkeletonContent
        containerStyle={{flex:1,...props.style}}
        isLoading={props.loading}
        layout={[...props.layout]}
    >
        {props.children}
    </SkeletonContent>
)

const style = StyleSheet.create({
    container: {
        flex:1
    }
})