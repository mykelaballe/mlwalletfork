import React from 'react'
import {Prompt} from './'

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