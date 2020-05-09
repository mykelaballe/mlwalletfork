import React from 'react'
import {ScrollView, View, StyleSheet, FlatList as List, RefreshControl, Image} from 'react-native'
import {ActivityIndicator, Text, SkeletonLoader} from './'
import {Colors, Metrics, Res} from '../themes'

export default class FlatList extends React.Component {

    handleKeyExtractor = (item, index) => index.toString()

    handleRefresh = () => this.props.onRefresh()

    render() {

        const {data, loading, refreshing, onRefresh, placeholder, skeleton} = this.props
        const useRefresh = typeof onRefresh !== 'undefined'

        if(loading) {
            if(typeof skeleton !== 'undefined') return <SkeletonLoader template={skeleton} />
            return <ActivityIndicator />
        }

        if(data.length == 0) {
            let placeholderUI = null

            if(placeholder) {
                placeholderUI = (
                    <View style={style.placeholderWrapper}>
                        {placeholder.icon || <Image source={Res.placeholder.empty} resizeMode='contain' style={style.img} />}
                        <Text center md mute>{placeholder.text || 'No Data'}</Text>
                    </View>
                )
            }

            if(useRefresh) {
                return (
                    <ScrollView
                        contentContainerStyle={style.scrollContainer}
                        refreshControl={<RefreshControl colors={[Colors.brand]} refreshing={refreshing} onRefresh={this.handleRefresh} />}
                    >
                        {placeholderUI}
                    </ScrollView>
                )
            }
            else {
                return placeholderUI
            }
        }

        return (
            <List
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={this.handleKeyExtractor}
                refreshControl={useRefresh && <RefreshControl colors={[Colors.brand]} refreshing={refreshing} onRefresh={this.handleRefresh} />}
                {...this.props}
            />
        )
    }
}

const style = StyleSheet.create({
    scrollContainer: {
        //flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    placeholderWrapper: {
        alignItems:'center',
        padding:Metrics.xl
    },
    img: {
        width:100
    }
})