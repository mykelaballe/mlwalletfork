import React from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {withNavigation} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import {Colors, Metrics} from '../themes'
import {Text, Row, Ripple} from './'

class Cart extends React.Component {

    state = {
        count:this.props.cart.length
    }

    static getDerivedStateFromProps = (props, state) => {
        if(props.cart.length !== state.count) {
            return {
                count:props.cart.length
            }
        }

        return null
    }

    handleViewCart = () => this.props.navigation.navigate('ShopViewCart')

    render() {

        const {count} = this.state

        return (
            <Ripple onPress={this.handleViewCart} style={{padding:Metrics.sm}}>
                <Row>
                    <Icon name='ios-cart' color={Colors.light} size={Metrics.icon.rg} />
                    {count > 0 &&
                    <View style={style.badge}>
                        <Text b light center>{count}</Text>
                    </View>
                    }
                </Row>
            </Ripple>
        )
    }
}

const style = StyleSheet.create({
    badge: {
        width:30,
        height:30,
        borderRadius:30,
        backgroundColor:Colors.black,
        justifyContent:'center',
        alignItems:'center'
    }
})

mapStateToProps = state => {
    return {
        cart: state.shop.cart
    }
}

export default withNavigation(connect(mapStateToProps)(Cart))