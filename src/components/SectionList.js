import React from 'react'
import {ScrollView, StyleSheet, SectionList as List, RefreshControl} from 'react-native'
import {ActivityIndicator, Text} from './'
import {Colors, Metrics} from '../themes'

export default class SectionList extends React.Component {

    handleKeyExtractor = (item, index) => index.toString()

    handleRefresh = () => this.props.onRefresh()

    render() {

        const {sections, loading, refreshing, onRefresh, placeholder} = this.props
        const useRefresh = typeof onRefresh !== 'undefined'

        if(loading) return <ActivityIndicator />

        if(useRefresh && sections.length == 0) {
            return (
                <ScrollView
                    contentContainerStyle={style.scrollContainer}
                    refreshControl={<RefreshControl colors={[Colors.brand]} refreshing={refreshing} onRefresh={this.handleRefresh} />}
                >
                    {placeholder &&
                    <>
                        {placeholder.icon}
                        <Text center lg>{placeholder.text}</Text>
                    </>
                    }
                </ScrollView>
            )
        }

        return (
            <List
                keyExtractor={this.handleKeyExtractor}
                refreshControl={useRefresh && <RefreshControl colors={[Colors.brand]} refreshing={refreshing} onRefresh={this.handleRefresh} />}
                {...this.props}
                showsVerticalScrollIndicator={false}
            />
        )
    }
}

const style = StyleSheet.create({
    scrollContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})