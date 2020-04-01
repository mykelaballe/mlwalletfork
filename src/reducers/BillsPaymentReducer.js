import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  newProp: null,
  refreshAllBillers: false,
  refreshFavorites: false,
  refreshRecent: false
})

const updateBiller = (state, action) => state.merge({ newProp:action.newProp })

const refreshBillersAll = (state, action) => state.merge({ refreshAllBillers:action.refresh })

const refreshBillersFavorites = (state, action) => state.merge({ refreshFavorites:action.refresh })

const refreshBillersRecent = (state, action) => state.merge({ refreshRecent:action.refresh })
  
const ACTION_HANDLERS = {
  [Types.UPDATE_BILLER]: updateBiller,
  [Types.REFRESH_BILLERS_ALL]: refreshBillersAll,
  [Types.REFRESH_BILLERS_FAVORITES]: refreshBillersFavorites,
  [Types.REFRESH_BILLERS_RECENT]: refreshBillersRecent,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)