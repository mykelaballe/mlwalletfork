import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
//import {connect} from 'react-redux'
import {Screen, Headline, Footer, FlatList, Text, Button, HR, SignUpStepsTracker} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'

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
        sourceRoute:this.props.navigation.state.routeName,
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
        validID:'',
        profilepic:'',
        processing:false
    }

    static getDerivedStateFromProps = (props, state) => {
        const {params = {}} = props.navigation.state

        if(params.source) {
            if(!state.validID) {
                if(state.validID !== params.source) {
                    return {
                        validID:params.source
                    }
                }
            }
            else if(!state.profilepic) {
                if(state.profilepic !== params.source) {
                    props.navigation.navigate('SignUpStep4',{
                        ...props.navigation.state.params,
                        validID:state.validID,
                        profilepic:params.source
                    })
                    return {
                        profilepic:params.source
                    }
                }
            }
        }

        return null
    }

    /*componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state

        if(params.source) {
            this.props.navigation.setParams({source:null})
            if(!prevState.validID) {
                if(params.source !== prevState.validID) {
                    this.setState({
                        validID:params.source
                    })
                }
            }
            else if(!prevState.profilepic) {
                if(params.source !== prevState.profilepic) {
                    this.setState({
                        profilepic:params.source
                    })
                }
            }
        }
    }*/

    handleSelect = index => {
        let list = this.state.list.slice()

        list.map(l => l.selected = false)

        list[index].selected = !list[index].selected

        this.setState({list})

        this.props.navigation.navigate('Camera',{
            title:'Valid ID',
            sourceRoute:this.state.sourceRoute
        })
    }

    /*handleSelect1 = index => {
        let list = this.state.list.slice()
        let ids = []

        list.map(l => l.selected = false)

        list[index].selected = !list[index].selected

        list.map(l => {
            if(l.selected) ids.push(l.name)
        })

        this.props.navigation.navigate('Camera',{sourceRoute:this.props.navigation.state.routeName})

        this.setState({
            list,
            ids
        })
    }*/

    handleSubmit = async () => {
        let {sourceRoute, ids, profilepic, validID} = this.state

        try {
            if(!profilepic) {
                this.props.navigation.navigate('Camera',{
                    title:'Profile Picture',
                    sourceRoute
                })
            }
            else {
                this.props.navigation.navigate('SignUpStep4',{
                    ...this.props.navigation.state.params,
                    validID,
                    profilepic
                })
            }
            /*if(ids.length > 0) {
                this.props.navigation.navigate('SignUpStep4',{
                    ...this.props.navigation.state.params,
                    ids
                })
            }*/
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    renderItem = ({item, index}) => <ItemUI index={index} data={item} onPress={this.handleSelect} />

    render() {

        const {list, ids, validID, profilepic, processing} = this.state
        let ready = false

        if(validID) ready = true

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

/*const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Scrn)*/