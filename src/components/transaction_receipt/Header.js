import React from 'react'
import {StyleSheet, Clipboard, TouchableWithoutFeedback} from 'react-native'
import {View, Row, Text, Spacer} from '../'
import {Colors, Metrics} from '../../themes'
import {Func} from '../../utils'
import Icon from 'react-native-vector-icons/AntDesign'

export default props => {
    const {tcn, status, statusMessage} = props

    const handleCopyKPTN = () => Clipboard.setString(tcn)

    let statusIcon = 'clockcircleo',
        statusColor = Colors.gray,
        statusText = 'Transaction'

    if(status) {
        if(status === 'success') {
            statusIcon = 'check'
            statusColor = Colors.success
            statusText = `${statusText} Successful`
        }
        else if(status === 'cancelled') {
            statusIcon = 'close'
            statusColor = Colors.danger
            statusText = `${statusText} Cancelled`
        }
        else if(status === 'claimed') {
            statusIcon = 'check'
            statusColor = Colors.success
            statusText = `${statusText} Claimed`
        }
    }
    else {
        statusText = `${statusText} Pending`
    }

    if(statusMessage) statusText = statusMessage

    return (
        <>
            <Row style={[style.smallBanner,{backgroundColor:statusColor}]}>
                <Icon name={statusIcon} color={!status ? Colors.dark : Colors.light} size={Metrics.icon.sm} />
                <Spacer h xs />
                <Text center color={!status ? Colors.dark : Colors.light}>{statusText}</Text>
            </Row> 

            <View style={style.bigBanner}>
                <Text center light>Transaction No.</Text>
                <TouchableWithoutFeedback onPress={handleCopyKPTN}>
                    <Text b md center light>{Func.formatKPTN(tcn)}</Text>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    smallBanner: {
        backgroundColor:Colors.black,
        padding:Metrics.sm,
        justifyContent:'center'
    },
    bigBanner: {
        backgroundColor:Colors.dark,
        padding:Metrics.xl
    }
})