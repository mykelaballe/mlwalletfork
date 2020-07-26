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
        const type = this.state.list[selectedIDIndex].value
        
        if(type == 'student' || type == 'company') {
            Say.ask(
                'Choosing a non-government issued ID lowers your transaction limits. Continue?',
                'Hi there!',
                {
                    onConfirm:() => this.selectValidID(selectedIDIndex)
                }
            )
        }
        else {
            this.selectValidID(selectedIDIndex)
        }
    }

    selectValidID = selectedIDIndex => {
        this.setState({
            selectedIDIndex,
            for:'validID'
        },() => {
            this.props.navigation.navigate('Camera',{
                title:'Valid ID',
                sourceRoute:this.state.sourceRoute
            })
        })
    }

    takeLivePhoto = () => {
        const {sourceRoute} = this.state
        this.setState({for:'profilepic'})
        this.props.navigation.navigate('LivePhotoOnBoarding',{
            title:'Live Photo',
            sourceRoute,
        })
    }

    handleSubmit = async () => {
        const {isForceUpdate, user} = this.props
        const {password, pincode, firstname, middlename, lastname, suffix, source_of_income, natureofwork, bday_day, bday_month, bday_year} = this.props.navigation.state.params
        let {profilepic, validID, list, selectedIDIndex, processing} = this.state

        //check if id select is a government ID
        const isGovernmentID = list[selectedIDIndex].value != 'student' && list[selectedIDIndex].value != 'company'

        if(processing) return false

        try {

            this.setState({processing:true})

            //if user has not taken a live photo yet, this means the picture taken is an Identification Card
            if(!profilepic) {
                let res = {
                    valid:true,
                    first_name:true,
                    last_name:true,
                    birth_date:true,
                    birth_month:true,
                    birth_year:true
                }

                res = await API.validateID({
                    type:list[selectedIDIndex].value,
                    image:validID.base64,
                    first_name:firstname,
                    last_name:lastname,
                    birth_date:bday_day,
                    birth_month:bday_month,
                    birth_year:bday_year
                })

                //if this is not a government ID, bypass AI ID type validation
                if(!isGovernmentID) res.valid = true

                if(!res.valid) Say.warn('Type of ID submitted does not match with the selected ID type. Please try again or choose another ID.')
                else {

                    //if invalid firstname or lastname or if government ID and invalid birthdates
                    if(!res.first_name || !res.last_name || (isGovernmentID && (!res.birth_date || !res.birth_month || !res.birth_year))) {
                        Say.warn('Details from the ID submitted does not match with the registered ML Wallet information. Please try again or choose another ID.')
                    }
                    else this.takeLivePhoto()
                }
            }
            else {
                let res = await API.compareFace({
                    id:validID.base64,
                    face:profilepic.base64
                })
                if(res.match || res.valid) {
                    if(isForceUpdate) {
                        let updateRes = await API.reupdateProfile({
                            walletno:user.walletno,
                            password,
                            pincode,
                            fname:firstname,
                            mname:middlename,
                            lname:lastname,
                            suffix,
                            sourceOfIncome:source_of_income,
                            natureofwork,
                            idType:list[selectedIDIndex].value,
                            validID:validID.base64,
                            profilepic:profilepic.base64
                        })
                        
                        if(updateRes.error) Say.warn(updateRes.message)
                        else {
                            Say.ok(
                                `Thanks for updating your profile, ${firstname}!\n\nExplore the new ML Wallet now`,
                                null,
                                {
                                    onConfirm:() => {
                                        this.props.updateUserInfo(updateRes.data)
                                        this.props.setIsForceUpdate(false)
                                        this.props.login()
                                    }
                                }
                            )
                        }
                    }
                    else {
                        this.props.navigation.navigate('SignUpStep4',{
                            ...this.props.navigation.state.params,
                            idType:list[selectedIDIndex].value,
                            validID:validID.base64,
                            profilepic:profilepic.base64
                        })
                    }
                }
                else Say.warn('Photo from the ID submitted does not match with live photo taken. Please try again or choose another ID.')
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

        const {isForceUpdate} = this.props
        const {list, selectedIDIndex, validID, profilepic, processing} = this.state
        let ready = false

        if(validID) ready = true

        return (
            <>
                <Screen ns>
                    
                    {!isForceUpdate && <SignUpStepsTracker step={3} />}

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
    isForceUpdate: state.auth.isForceUpdate,
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    login:() => dispatch(Creators.login()),
    updateUserInfo:newInfo => dispatch(Creators.updateUserInfo(newInfo)),
    setIsForceUpdate:isForceUpdate => dispatch(Creators.setIsForceUpdate(isForceUpdate))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)