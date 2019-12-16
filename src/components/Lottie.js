import React from 'react'
import LottieView from 'lottie-react-native'

export default props => (
    <LottieView
        source={props.source}
        autoPlay={props.autoPlay || true}
        style={{...props.style}}
        {...props}
    />
)