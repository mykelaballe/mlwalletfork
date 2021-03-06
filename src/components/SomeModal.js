import React from 'react'
import {Prompt} from './'
import {_} from '../utils'
import {connect} from 'react-redux'
import {Creators} from '../actions'

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

            let timeout_matches = options.message.match(/timeoutexception|timeout/gi)

            if(matches) message = _('500')
            else if(timeout_matches) message = 'Request time out'
        }

        this.setState({
            visible:true,
            title:options.title,
            message,
            moreOptions:options.options
        })
    }

    static forceLogout = () => SomeModal.__singletonRef.props.logout()

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

  const mapDispatchToProps = dispatch => ({
      logout:() => dispatch(Creators.logout())
  })

  export default connect(null, mapDispatchToProps)(SomeModal)