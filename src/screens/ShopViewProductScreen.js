import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity, Dimensions, Image} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Text, Row, Spacer, HR, Card, HeaderRight, Cart, Pill, Button} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'

const {width} = Dimensions.get('window')

class ShopViewProductScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:navigation.state.params.product.store.name,
        headerRight: (
            <HeaderRight>
                <Cart />
            </HeaderRight>
        )
    })

    state = {
        ...this.props.navigation.state.params.product,
        quantity:1
    }

    handleAddToCart = () => {
        try {
            let {product} = this.props.navigation.state.params
            const {quantity} = this.state

            if(quantity > 0) {
                product.quantity = quantity

                this.props.addToCart(product)
                Say.some('Added to cart')
            }
            else {
                Say.some('Please add atleast 1 quantity')
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleAddQuantity = () => this.setState(prevState => ({quantity:prevState.quantity < prevState.stock ? prevState.quantity + 1 : prevState.quantity}))

    handleSubQuantity = () => this.setState(prevState => ({quantity:prevState.quantity > 0 ? prevState.quantity - 1 : prevState.quantity}))

    render() {

        const {name, description, photo, price_before, price_now, stock, quantity} = this.state

        return (
            <View style={style.container}>
                <Image
                    source={{uri:'https://d2cax41o7ahm5l.cloudfront.net/mi/upload-images/food-beverages-2020-6978.jpg'}}
                    style={{width,height:300}}
                    resizeMode='cover'
                />

                <Card style={style.card}>
                    <Row bw>
                        <View>
                            <Pill text='Fruits' />
                            <Spacer xs />
                            <Text b md>{name}</Text>
                        </View>
                        <Text b xl brand>PHP 9,800.00</Text>
                    </Row>
                    
                    <HR />

                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam ipsum at interdum ornare. Curabitur id dui enim. Vivamus id nisi eu libero gravida venenatis vitae at metus. Maecenas felis erat, volutpat vel neque non, placerat ultrices elit.</Text>

                    <Spacer />

                    <View>
                        <Text b>Stock: {stock}</Text>
                    </View>

                    <Spacer />

                    <Row>
                        <Button t='-' onPress={this.handleSubQuantity} />
                        <Spacer h sm />
                        <Text xl b brand>{quantity}</Text>
                        <Spacer h sm />
                        <Button t='+' onPress={this.handleAddQuantity} />
                    </Row>

                    <View style={{flex:1,justifyContent:'flex-end'}}>
                        <Button t={_('83')} onPress={this.handleAddToCart} />
                    </View>
                </Card>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        backgroundColor:Colors.gray
    },
    card: {
        flex:1,
        padding:Metrics.xl,
        width:width - (Metrics.lg * 2),
        marginTop:-(Metrics.xl)
    }
})

mapStateToProps = state => {
    return {
        cart: state.shop.cart
    }
}

mapDispatchToProps = dispatch => {
    return {
        addToCart:item => dispatch(Actions.addToCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopViewProductScreen)