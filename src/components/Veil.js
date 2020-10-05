import React, {useState, useEffect} from 'react'
import {View, BackHandler} from 'react-native'
import {Creators} from '../actions'
import {connect} from 'react-redux'
import {Portal, Modal} from 'react-native-paper'
import Button from './Button'

const Veil = ({isProcessing, endTransaction}) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', checkIfProcessing)

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', checkIfProcessing)
        }
    },[])

    useEffect(() => {
        setVisible(isProcessing)
    },[isProcessing])

    const checkIfProcessing = () => visible

    return (
        <Portal>
            <Modal visible={visible} dismissable={false} />
        </Portal>
    )
}

const mapStateToProps = state => ({
    isProcessing: state.transaction.isProcessing
})

const mapDispatchToProps = dispatch => ({
    endTransaction:() => dispatch(Creators.endTransaction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Veil)