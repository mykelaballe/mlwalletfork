import React from 'react'
import {Prompt} from './'
import {Consts} from '../utils'

class SomeModal extends React.Component {
 
    state = {
        visible:false,
        title:'',
        message:'',
        moreOptions:{}
    }

    componentDidMount = () => {
        SomeModal.__singletonRef = this
    }

    static show(options) {
      SomeModal.__singletonRef.showModal(options)
    }
  
    static hide() {
      SomeModal.__singletonRef.hideModal()
    }

    static sayLogout() {
        SomeModal.__singletonRef.showModal({
           // message:`We are logging you out because you were idle for more than ${Consts.allowed_idle_time / 60000} minutes`,
           message:'Please re-login to your account.',
            title:'Session Expired'
        })
    }
  
    showModal = options => {
        this.setState({
            visible:true,
            title:options.title,
            message:options.message,
            moreOptions:options.options
        })
    }

    hideModal = () => this.setState({visible:false})

     render() {

        const {visible, title, message, moreOptions} = this.state

        return (
            <Prompt
                visible={visible}
                title={title}
                message={message}
                onDismiss={this.hideModal}
                {...moreOptions}
            />
        )
     }
  }

  export default SomeModal