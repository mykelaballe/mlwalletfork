import {take, put, select} from 'redux-saga/effects'
import Types from '../actions/Types'
import Actions from '../actions/Creators'
import R from 'ramda'

// process STARTUP actions
export function * watchStartup() {
	
  yield take(Types.STARTUP)
  
}
