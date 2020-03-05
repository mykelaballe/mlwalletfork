import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Screen, Headline, Footer, FlatList, Text, Button, HR, SignUpStepsTracker} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

const ItemUI = props => (
    <>
        <TouchableOpacity onPress={() => props.onPress(props.index)} style={[style.item,{backgroundColor:props.data.selected ? Colors.brand : Colors.light}]}>
            <Text md color={props.data.selected ? Colors.light : Colors.mute}>{props.data.name}</Text>
        </TouchableOpacity>

        <HR />
    </>
)

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Identification'
    }

    state = {
        list:[
            {
                id:1,
                name:'SSS UMID Card'
            },
            {
                id:2,
                name:'Passport'
            },
            {
                id:3,
                name:"Driver's License"
            },
            {
                id:4,
                name:'PhilHealth ID'
            },
            {
                id:5,
                name:'Postal ID'
            },
            {
                id:6,
                name:"Voter's ID"
            },
            {
                id:7,
                name:'PRC ID'
            },
            {
                id:8,
                name:"Senior Citizen's ID"
            }
        ],
        ids:[],
        processing:false
    }

    handleSelect = index => {
        let list = this.state.list.slice()
        let ids = []

        list.map(l => l.selected = false)

        list[index].selected = !list[index].selected

        list.map(l => {
            if(l.selected) ids.push(l.name)
        })

        //this.props.navigation.navigate('Camera',{sourceRoute:this.props.navigation.state.routeName})

        this.setState({
            list,
            ids
        })
    }

    handleSubmit = async () => {
        let {ids} = this.state

        try {
            if(ids.length > 0) {
                this.props.navigation.navigate('SignUpStep4',{
                    ...this.props.navigation.state.params,
                    ids
                })
            }
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    renderItem = ({item, index}) => <ItemUI index={index} data={item} onPress={this.handleSelect} />

    render() {

        const {list, ids, processing} = this.state
        let ready = false

        if(ids.length > 0) ready = true

        return (
            <>
                <Screen ns>
                    
                    <SignUpStepsTracker step={3} />

                    <Headline subtext='Choose a valid ID you can provide from the list below' />

                    <FlatList
                        data={list}
                        renderItem={this.renderItem}
                    />

                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t={_('62')} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const style = StyleSheet.create({
    item: {
        paddingVertical:Metrics.md,
        paddingHorizontal:Metrics.rg
    }
})