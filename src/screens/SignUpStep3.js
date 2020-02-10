import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Screen, Headline, Footer, FlatList, Text, Button, Spacer, Row, HR, SignUpStepsTracker} from '../components'
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

class Scrn extends React.Component {

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
        selected:[],
        processing:false
    }

    handleSelect = index => {
        let list = this.state.list.slice()
        let selected = []

        list[index].selected = !list[index].selected

        list.map(l => {
            if(l.selected) selected.push(l.id)
        })

        this.props.navigation.navigate('Camera')

        this.setState({
            list,
            selected
        })
    }

    handleSubmit = async () => {
        let {selected, processing} = this.state

        if(processing) return false

        try {
            this.props.navigation.navigate('SignUpStep4')
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    renderItem = ({item, index}) => <ItemUI index={index} data={item} onPress={this.handleSelect} />

    render() {

        const {list, selected, processing} = this.state
        let ready = false

        if(selected.length > 0) ready = true

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
                    <Button disabled={!ready} t='Next' onPress={this.handleSubmit} loading={processing} />
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

export default Scrn