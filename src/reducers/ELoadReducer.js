import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  newReceiver: null,
  receiverIndex: null,
  newProp: null,
  deletedIndex: null
})

const addELoadReceiver = (state, action) => state.merge({ newReceiver:action.newReceiver })

const updateELoadReceiver = (state, action) => state.merge({ receiverIndex:action.receiverIndex, newProp:action.newProp })

const deleteELoadReceiver = (state, action) => state.merge({ deletedIndex:action.deletedIndex })
  
const ACTION_HANDLERS = {
  [Types.ADD_ELOAD_RECEIVER]: addELoadReceiver,
  [Types.UPDATE_ELOAD_RECEIVER]: updateELoadReceiver,
  [Types.DELETE_ELOAD_RECEIVER]: deleteELoadReceiver,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
