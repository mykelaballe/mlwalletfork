import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Screen, Headline, Footer, FlatList, Text, Button, ButtonText, HR, SignUpStepsTracker, Row, Outline} from '../components'
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
                name:'SSS ID'
            },
            {
                id:2,
                name:'UMID'
            },
            {
                id:3,
                name:'Passport'
            },
            {
                id:4,
                name:"Driver's License"
            },
            {
                id:5,
                name:'PhilHealth ID'
            },
            {
                id:6,
                name:'Postal ID'
            },
            {
                id:7,
                name:"Voter's ID"
            },
            {
                id:8,
                name:'PRC ID'
            },
            {
                id:9,
                name:"Senior Citizen's ID"
            },
            {
                id:10,
                name:"Student ID"
            },
            {
                id:11,
                name:"Company ID"
            }
        ],
        for:'',
        selectedIDIndex:null,
        validID:null,
        profilepic:null,
        processing:false
    }

    static getDerivedStateFromProps = (props, state) => {
        const {params = {}} = props.navigation.state

        if(params.source) {
            if(state.for !== '' && state[state.for] !== params.source) {
                let list = state.list.slice()
                
                if(state.for == 'validID') {
                    if(state.selectedIDIndex !== null) {
                        list.map(l => l.selected = false)
                        list[state.selectedIDIndex].selected = !list[state.selectedIDIndex].selected
                    } 
                }

                props.navigation.setParams({source:null})

                return {
                    for:'',
                    [state.for]:params.source,
                    list
                }
            }
        }

        return null
    }

    handleSelectValidID = selectedIDIndex => {
        this.setState({
            selectedIDIndex,
            for:'validID'
        })
        this.props.navigation.navigate('Camera',{
            title:'Valid ID',
            sourceRoute:this.state.sourceRoute
        })
    }

    takeLivePhoto = () => {
        const {sourceRoute} = this.state
        this.setState({for:'profilepic'})
        this.props.navigation.navigate('Camera',{
            title:'Live Photo',
            sourceRoute,
        })
    }

    handleSubmit = async () => {
        let {profilepic, validID} = this.state

        try {
            if(!profilepic) this.takeLivePhoto()
            else {
                this.props.navigation.navigate('SignUpStep4',{
                    ...this.props.navigation.state.params,
                    validID,
                    profilepic
                })
            }
        }
        catch(err) {
            Say.err(err)
        }
    }

    handleChangeValidID = () => {
        let list = this.state.list.slice()
        list.map(l => l.selected = false)
        this.setState({
            validID:null,
            selectedIDIndex:null,
            list,
            for:''
        })
    }

    handleChangeProfilePic = () => this.takeLivePhoto()

    renderItem = ({item, index}) => <ItemUI index={index} data={item} onPress={this.handleSelectValidID} />

    render() {

        const {list, selectedIDIndex, validID, profilepic, processing} = this.state
        let ready = false

        if(validID) ready = true

        return (
            <>
                <Screen ns>
                    
                    <SignUpStepsTracker step={3} />

                    <Headline subtext='Choose a valid ID you can provide from the list below' />

                    {validID &&
                    <Outline>
                        <Row bw>
                            <Text b>{list[selectedIDIndex].name}</Text>
                            <ButtonText t='Change' onPress={this.handleChangeValidID} />
                        </Row>
                    </Outline>
                    }

                    {profilepic &&
                    <Outline>
                        <Row bw>
                            <Text b>Live Photo</Text>
                            <ButtonText t='Change' onPress={this.handleChangeProfilePic} />
                        </Row>
                    </Outline>
                    }

                    {!validID &&
                    <FlatList
                        data={list}
                        renderItem={this.renderItem}
                    />
                    }

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