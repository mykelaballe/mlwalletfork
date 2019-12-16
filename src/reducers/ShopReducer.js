import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  cart: []
})

const updateCart = (state, action) => state.merge({ cart:action.items })

const addToCart = (state, action) => {
  return state.merge({
    cart:[
      ...state.cart,
      action.item
    ]
  })
}

const removeFromCart = (state, action) => {
  let cart = [...state.cart]
  cart.splice(1,action.index)
  return state.merge({ cart })
}

const clearCart = (state, action) => state.merge({ cart: [] })
  
const ACTION_HANDLERS = {
  [Types.UPDATE_CART]: updateCart,
  [Types.ADD_TO_CART]: addToCart,
  [Types.REMOVE_FROM_CART]: removeFromCart,
  [Types.CLEAR_CART]: clearCart,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
