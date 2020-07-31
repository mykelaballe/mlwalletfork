import React from 'react'
import {Prompt} from './'
import {_, Consts} from '../utils'

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
            //message:`We are logging you out because you were idle for more than ${Consts.allowed_idle_time / 60000} minutes`,
            message:"You have been away for five minutes. Please re-login to your account",
            title:'Uh-oh!',
            options:{
                OkBtnLabel:'Back to Login'
            }
        })
    }
  
    showModal = options => {

        let message = options.message

        //catch technical errors coming from backend
        if(options.message) {
            let matches = options.message.match(/server error|mysql|table|function|column|sql|connection|procedure/gi)

            if(matches) message = _('500')
        }

        this.setState({
            visible:true,
            title:options.title,
            message,
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