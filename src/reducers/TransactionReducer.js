import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  isProcessing: false
})

const startTransaction = state => state.merge({ isProcessing: true })

const endTransaction = state => state.merge({ isProcessing: false })
  
const ACTION_HANDLERS = {
  [Types.START_TRANSACTION]: startTransaction,
  [Types.END_TRANSACTION]: endTransaction,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
