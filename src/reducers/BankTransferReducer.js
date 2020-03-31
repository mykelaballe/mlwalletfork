import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  newPartner: null,
  partnerIndex: null,
  newProp: null,
  deletedIndex: null,
  refreshAllPartners: false,
  refreshFavorites: false
})

const addBankPartner = (state, action) => state.merge({ newPartner:action.newPartner })

const updateBankPartner = (state, action) => state.merge({ partnerIndex:action.partnerIndex, newProp:action.newProp })

const deleteBankPartner = (state, action) => state.merge({ deletedIndex:action.deletedIndex })

const refreshBankAllPartners = (state, action) => state.merge({ refreshAllPartners:action.refresh })

const refreshBankFavorites = (state, action) => state.merge({ refreshFavorites:action.refresh })
  
const ACTION_HANDLERS = {
  [Types.ADD_BANK_PARTNER]: addBankPartner,
  [Types.UPDATE_BANK_PARTNER]: updateBankPartner,
  [Types.DELETE_BANK_PARTNER]: deleteBankPartner,
  [Types.REFRESH_BANK_ALL_PARTNERS]: refreshBankAllPartners,
  [Types.REFRESH_BANK_FAVORITES]: refreshBankFavorites,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)