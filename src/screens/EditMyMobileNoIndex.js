import React from 'react'
import {Screen, Footer, Headline, FlatList, Button, Checkbox, Spacer} from '../components'
import {_, Say} from '../utils'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Mobile Number'
    }

    state = {
        list:[
            {
                label:'I lost my phone',
                checked:false
            },
            {
                label:'Expired sim card',
                checked:false
            },
            {
                label:'I changed my mobile no.',
                checked:false
            }
        ]
    }

    handleProceed = async () => {
        try {
            let {list} = this.state
            let reasons = []

            list.map(l => {
                if(l.checked) reasons.push(l.label)
            })

            if(reasons.length > 0) this.props.navigation.navigate('EditMyMobileNo',{reasons})
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    handleToggleItem = index => {
        let list = this.state.list.slice()
        list[index].checked = !list[index].checked
        this.setState({list})
    }

    renderItem = ({item, index}) => (
        <>
            <Checkbox status={item.checked} onPress={() => this.handleToggleItem(index)} label={item.label} />
            <Spacer />
        </>
    )

    render() {

        const {list} = this.state
        let ready = false

        list.map(i => {
            if(i.checked) ready = true
        })

        return (
            <>
                <Screen ns>

                    <Headline subtext='Please help us understand why you want to edit your registered mobile number' />
                    
                    <FlatList
                        data={list}
                        renderItem={this.renderItem}
                    />
                </Screen>

                <Footer>
                    <Button disabled={!ready} t='Proceed' onPress={this.handleProceed} />
                </Footer>
            </>
        )
    }
}