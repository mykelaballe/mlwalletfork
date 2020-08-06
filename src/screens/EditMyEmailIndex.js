import React from 'react'
import {Screen, Footer, Headline, FlatList, Button, Checkbox, Spacer, Row, Radio} from '../components'
import {_, Say} from '../utils'
import {RadioButton} from 'react-native-paper'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Email Address'
    }

    state = {
        list:[
            {
                label:'I cannot open my email address',
                checked:false
            },
            {
                label:'I registered inactive/wrong email address',
                checked:false
            },
            {
                label:'I did not register an email address',
                checked:false
            }
        ],
        selected:null
    }

    handleProceed = async () => {
        try {
            let {selected} = this.state
            //let {list} = this.state
            let reasons = []

            if(selected) reasons.push(selected)

            /*list.map(l => {
                if(l.checked) reasons.push(l.label)
            })*/

            if(reasons.length > 0) this.props.navigation.navigate('EditMyEmail',{reasons})
        }
        catch(err) {
            Say.err(err)
        }
    }

    handleToggleItem = index => {
        let list = this.state.list.slice()
        list[index].checked = !list[index].checked
        this.setState({list})
    }

    handleSelectOption = selected => this.setState({selected})

    /*renderItem = ({item, index}) => (
        <>
            <Checkbox status={item.checked} onPress={() => this.handleToggleItem(index)} label={item.label} />
            <Spacer />
        </>
    )*/

    renderItem = ({item, index}) => (
        <>
            <Row>
                <Radio value={item.label} label={item.label} />
                <Spacer h lg />
            </Row>
            <Spacer />
        </>
    )

    render() {

        const {list, selected} = this.state
        let ready = selected || false

        /*list.map(i => {
            if(i.checked) ready = true
        })*/

        return (
            <>
                <Screen ns>

                    <Headline subtext='Please help us understand why you want to edit your registered email address' />
                    
                    <RadioButton.Group onValueChange={this.handleSelectOption} value={selected}>
                        <FlatList
                            data={list}
                            renderItem={this.renderItem}
                        />
                    </RadioButton.Group>
                </Screen>

                <Footer>
                    <Button disabled={!ready} t={_('22')} onPress={this.handleProceed} />
                </Footer>
            </>
        )
    }
}