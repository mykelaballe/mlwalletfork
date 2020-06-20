import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Headline, Footer, FlatList, Text, Button, ButtonText, HR, SignUpStepsTracker, Row, Outline} from '../components'
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
        sourceRoute:this.props.navigation.state.routeName,
        list:[
            {
                id:1,
                name:'SSS ID',
                value:'sss'
            },
            {
                id:2,
                name:'UMID',
                value:'umid'
            },
            {
                id:3,
                name:'Passport',
                value:'passport'
            },
            {
                id:4,
                name:"Driver's License",
                value:'license'
            },
            {
                id:5,
                name:'PhilHealth ID',
                value:'philhealth'
            },
            {
                id:6,
                name:'Postal ID',
                value:'postal'
            },
            {
                id:7,
                name:"Voter's ID",
                value:'voter'
            },
            {
                id:8,
                name:'PRC ID',
                value:'prc'
            },
            {
                id:9,
                name:"Senior Citizen's ID",
                value:'senior'
            },
            {
                id:10,
                name:"Student ID",
                value:'student'
            },
            {
                id:11,
                name:"Company ID",
                value:'company'
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
        const {user} = this.props
        let {profilepic, validID, list, selectedIDIndex, processing} = this.state

        if(processing) return false

        try {

            this.setState({processing:true})

            if(!profilepic) {
                let res = {valid:true}

                if(list[selectedIDIndex].value != 'student' && list[selectedIDIndex].value != 'company') {
                    res = await API.validateID({
                        type:list[selectedIDIndex].value,
                        image:validID.base64
                    })
                }

                if(res.valid) {
                    //Say.ok('VALID')
                    this.takeLivePhoto()
                }
                else Say.err('Type of ID submitted does not match with the selected ID type. Please try again or choose another ID.')
            }
            else {
                let res = await API.compareFace({
                    id:validID.base64,
                    face:profilepic.base64
                })
                //let res = {match:true}
                if(res.match) {
                   // Say.ok('MATCH')
                    if(user && user.is_force) {
                        /*await API.update({

                        })*/
                        this.props.updateUserInfo({is_force:false})
                        this.props.login()
                    }
                    else {
                        this.props.navigation.navigate('SignUpStep4',{
                            ...this.props.navigation.state.params,
                            validID:validID.base64,
                            profilepic:profilepic.base64
                        })
                    }
                }
                else Say.err('Photo from the ID submitted does not match with live photo taken. Please try again or choose another ID.')
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    handleChangeValidID = () => {
        if(this.state.processing) return false

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

const mapStateToProps = state => ({
    user:state.user.data
})

const mapDispatchToProps = dispatch => ({
    login:() => dispatch(Creators.login()),
    updateUserInfo:newInfo => dispatch(Creators.updateUserInfo(newInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)